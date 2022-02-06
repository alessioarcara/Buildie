export type ScoreData = {
  _id: string;
  username: string;
  score: number;
};

export type ScoreResponse = {
  data: ScoreData;
  problem: string;
};
