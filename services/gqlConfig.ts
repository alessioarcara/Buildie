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

export const INVALIDATE_REFRESH_TOKEN_MUTATION = gql`
  mutation ($refreshToken: String!) {
    invalidateRefreshToken(refreshToken: $refreshToken)
  }
`;

export const SCORES_QUERY = gql`
  query {
    scores {
      _id
      score
      username
    }
  }
`;

export const SUBMIT_SCORE_MUTATION = gql`
  mutation ($score: Int!) {
    submitScore(score: $score) {
      data {
        _id
        score
        username
      }
      problem
    }
  }
`;

export const CREATE_GAME_MUTATION = gql`
  mutation ($username: String!) {
    createGame(username: $username) {
      data {
        gameId
      }
      problem
    }
  }
`;
