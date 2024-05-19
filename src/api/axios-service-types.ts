export type PostAuth = {
  email: string;
  password: string;
};

export type LoginReponse = {
  accessToken: string;
  refreshToken: string;
};

type UserGameData = {
  currentlyGamesPlaying: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
};

export type User = {
  id: string;
  email: string;
};

export type UserResponse = UserGameData & { user: User };
