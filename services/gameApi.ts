import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthenticatePayload } from "server/resolvers/user/userTypes";
import {
  SCORES_QUERY,
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
  SUBMIT_SCORE_MUTATION,
} from "./gqlConfig";
import { SigninRequest, SignupRequest } from "../types/User";
import { RootState } from "@store/index";
import { ScoreData, ScoreResponse } from "types/Score";
import { graphqlBaseQueryWithReauth } from "./graphqlBaseQuery";

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

export const { useSignupMutation, useSigninMutation, useScoresQuery } = gameApi;
