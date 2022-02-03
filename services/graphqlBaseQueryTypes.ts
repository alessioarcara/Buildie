import type { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";

export type graphqlRequestBaseQueryArgs = {
  baseUrl: string;
  prepareHeaders?: (
    headers: Headers,
    api: Pick<BaseQueryApi, "getState" | "dispatch">
  ) => MaybePromise<Headers>;
};
