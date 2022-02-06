import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { request, ClientError } from "graphql-request";
import { AuthenticatePayload } from "server/resolvers/user/userTypes";
import {
  REFRESH_TOKEN_MUTATION,
  SCORES_QUERY,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  SUBMIT_SCORE_MUTATION,
} from "./gqlConfig";
import { SigninRequest, SignupRequest } from "../types/User";
import { RootState } from "@store/index";
import { graphqlRequestBaseQueryArgs } from "./graphqlBaseQueryTypes";
import { authenticate, invalidate } from "@store/authThunks";
import { ScoreData, ScoreResponse } from "types/Score";

const graphqlBaseQueryWithReauth =
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
        console.log(error);
        if (
          error.response.errors?.some(
            (e) => e.extensions?.code === "UNAUTHENTICATED"
          )
        ) {
          const refreshToken = (getState() as RootState).auth.refreshToken;
          const refreshResult = await request(baseUrl, REFRESH_TOKEN_MUTATION, {
            refreshToken,
          });
          if (refreshResult.refreshToken) {
            dispatch(authenticate(refreshResult.refreshToken));
            return {
              data: await request(baseUrl, body, variables, await headers()),
            };
          } else {
            dispatch(invalidate());
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
  tagTypes: ["Score"],
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
    scores: builder.query<ScoreData[], void>({
      query: () => ({
        body: SCORES_QUERY,
      }),
      transformResponse: (response: { scores: ScoreData[] }) => response.scores,
      providesTags: () => ["Score"],
    }),
    submitScore: builder.mutation<ScoreResponse, number>({
      query: (score) => ({
        body: SUBMIT_SCORE_MUTATION,
        variables: { score },
      }),
      transformResponse: (response: { submitScore: ScoreResponse }) =>
        response.submitScore,
      invalidatesTags: ["Score"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useScoresQuery,
  useSubmitScoreMutation,
} = gameApi;
