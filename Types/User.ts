export type SigninRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  username: string;
} & SigninRequest;

export type AuthData = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export type AuthResponse = {
  data?: AuthData;
  problem?: string;
};
