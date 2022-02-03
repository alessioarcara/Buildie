import { gql } from "graphql-request";

export const SIGNUP_MUTATION = gql`
  mutation ($input: SignupInput!) {
    signup(input: $input) {
      data {
        accessToken
        refreshToken
        userId
      }
      problem
    }
  }
`;

export const SIGNIN_MUTATION = gql`
  mutation ($input: SigninInput!) {
    signin(input: $input) {
      data {
        accessToken
        refreshToken
        userId
      }
      problem
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation ($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      userId
      refreshToken
      accessToken
    }
  }
`;
