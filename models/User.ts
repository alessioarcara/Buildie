export type AuthRequest = {
  email: string;
  password: string;
};

export type AuthData = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  expires: number;
};

export type AuthResponse = {
  data?: AuthData;
  problem?: string;
};
