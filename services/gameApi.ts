import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { request, ClientError } from "graphql-request";
import { createClient } from "graphql-ws";
import { graphqlRequestBaseQueryArgs } from "./graphqlBaseQueryTypes";
import * as SecureStore from "expo-secure-store";
import {
  CREATE_GAME_MUTATION,
  GAME_QUERY,
  INVALIDATE_REFRESH_TOKEN_MUTATION,
  SCORES_QUERY,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  SUBMIT_SCORE_MUTATION,
  UPDATE_GAME_MUTATION,
  REFRESH_TOKEN_MUTATION,
} from "./gqlConfig";
import { AuthResponse, SigninRequest, SignupRequest } from "../types/User";
import { ScoreData, ScoreResponse } from "types/Score";
import { GameData, GameRequest, GameResponse } from "types/Game";
import { authenticate } from "@store/authThunks";
import { AppThunk, RootState } from "@store/index";
import { logout } from "@store/auth";
import { USER_DATA } from "@constants/PersistedData";

export const invalidate = (): AppThunk => (dispatch, getState) => {
  const refreshToken = (getState() as RootState).auth.refreshToken;
  SecureStore.deleteItemAsync(USER_DATA);
  dispatch(gameApi.endpoints.logout.initiate(refreshToken!));
  dispatch(logout());
};

export const graphqlBaseQueryWithReauth =
  ({
    baseUrl,
    prepareHeaders = (headers) => headers,
  }: graphqlRequestBaseQueryArgs): BaseQueryFn<
    { body: string; variables?: any },
    unknown,
    Pick<ClientError, "name" | "message" | "stack">
  > =>
  async ({ body, variables }, { getState, dispatch }) => {
    function headers() {
      return prepareHeaders(new Headers(), {
        getState,
        dispatch,
      });
    }
    try {
      return { data: await request(baseUrl, body, variables, await headers()) };
    } catch (error) {
      if (error instanceof ClientError) {
        if (
          error.response.errors?.some(
            (e) => e.extensions?.code === "UNAUTHENTICATED"
          )
        ) {
          try {
            const refreshToken = (getState() as RootState).auth.refreshToken;
            const refreshResult = await request(
              baseUrl,
              REFRESH_TOKEN_MUTATION,
              {
                refreshToken,
              }
            );
            dispatch(authenticate(refreshResult.refreshToken));
            return {
              data: await request(baseUrl, body, variables, await headers()),
            };
          } catch (error) {
            dispatch(invalidate());
            return {
              error: {
                name: "REFRESH_TOKEN",
                message: "Invalid or expired refresh token",
              },
            };
          }
        }
        const { name, message, stack } = error;
        return { error: { name, message, stack } };
      }
      if (error instanceof Error) {
        return { error: { name: "Error", message: error.message } };
      }
      throw error;
    }
  };

const client = createClient({
  url: "ws://192.168.178.90:4000/graphql",
});

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: graphqlBaseQueryWithReauth({
    baseUrl: "http:/192.168.178.90:4000/graphql",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Scores", "Game"],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (user) => ({
        body: SIGNUP_MUTATION,
        variables: { input: user },
      }),
      transformResponse: (response: { signup: AuthResponse }) =>
        response.signup,
    }),
    signin: builder.mutation<AuthResponse, SigninRequest>({
      query: (user) => ({
        body: SIGNIN_MUTATION,
        variables: { input: user },
      }),
      transformResponse: (response: { signin: AuthResponse }) =>
        response.signin,
    }),
    logout: builder.mutation<boolean, string>({
      query: (refreshToken) => ({
        body: INVALIDATE_REFRESH_TOKEN_MUTATION,
        variables: { refreshToken },
      }),
    }),
    scores: builder.query<ScoreData[], void>({
      query: () => ({
        body: SCORES_QUERY,
      }),
      transformResponse: (response: { scores: ScoreData[] }) => response.scores,
      providesTags: () => ["Scores"],
    }),
    submitScore: builder.mutation<ScoreResponse, number>({
      query: (score) => ({
        body: SUBMIT_SCORE_MUTATION,
        variables: { score },
      }),
      transformResponse: (response: { submitScore: ScoreResponse }) =>
        response.submitScore,
      invalidatesTags: ["Scores"],
    }),
    createGame: builder.mutation({
      query: (username) => ({
        body: CREATE_GAME_MUTATION,
        variables: { username },
      }),
      transformResponse: (response: { createGame: GameResponse }) =>
        response.createGame,
    }),
    game: builder.query<GameData, string>({
      query: (gameId) => ({
        body: GAME_QUERY,
        variables: { gameId },
      }),
      transformResponse: (response: { game: GameData }) => response.game,
      async onCacheEntryAdded(
        gameId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
        } catch {}
        (async () => {
          const onNext = (payload: any) => {
            updateCachedData(() => {
              return payload.data.gameUpdate;
            });
          };

          let unsubscribe = () => {
            console.log("UNSUBSCRIBE");
          };

          await new Promise((resolve, reject) => {
            unsubscribe = client.subscribe(
              {
                query: `subscription { gameUpdate(gameId: "${gameId}") { gameStatus winner players { user board } } }`,
              },
              {
                next: onNext,
                error: reject,
                complete: () => resolve,
              }
            );
          });
        })();
      },
    }),
    updateGame: builder.mutation<GameResponse, GameRequest>({
      query: (game) => ({
        body: UPDATE_GAME_MUTATION,
        variables: {
          gameId: game.gameId,
          gameOver: game.gameOver,
          playerBoard: game.playerBoard,
        },
      }),
      transformResponse: (response: { updateGame: GameResponse }) =>
        response.updateGame,
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useScoresQuery,
  useCreateGameMutation,
  useGameQuery,
  useUpdateGameMutation,
} = gameApi;
