import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthenticatePayload } from "server/resolvers/user/userTypes";
import {
  CREATE_GAME_MUTATION,
  GAME_QUERY,
  INVALIDATE_REFRESH_TOKEN_MUTATION,
  SCORES_QUERY,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  SUBMIT_SCORE_MUTATION,
  UPDATE_GAME_MUTATION,
} from "./gqlConfig";
import { SigninRequest, SignupRequest } from "../types/User";
import { RootState } from "@store/index";
import { ScoreData, ScoreResponse } from "types/Score";
import { graphqlBaseQueryWithReauth } from "./graphqlBaseQuery";
import { GameData, GameRequest, GameResponse } from "types/Game";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: graphqlBaseQueryWithReauth({
    baseUrl: "http://192.168.178.90:4000/graphql",
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Scores"],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthenticatePayload, SignupRequest>({
      query: (user) => ({
        body: SIGNUP_MUTATION,
        variables: { input: user },
      }),
      transformResponse: (response: { signup: AuthenticatePayload }) =>
        response.signup,
    }),
    signin: builder.mutation<AuthenticatePayload, SigninRequest>({
      query: (user) => ({
        body: SIGNIN_MUTATION,
        variables: { input: user },
      }),
      transformResponse: (response: { signin: AuthenticatePayload }) =>
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
      transformResponse: (response: { updateGameState: GameResponse }) =>
        response.updateGameState,
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
