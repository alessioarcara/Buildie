import type { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { request, ClientError } from "graphql-request";
import { graphqlRequestBaseQueryArgs } from "./graphqlBaseQueryTypes";
import { authenticate, invalidate } from "@store/authThunks";
import { RootState } from "@store/index";
import { REFRESH_TOKEN_MUTATION } from "./gqlConfig";

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
