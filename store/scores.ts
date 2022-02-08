import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SQLError, SQLResultSet } from "expo-sqlite";
import { fetchLocalScores, submitLocalScore } from "../helpers/db";
import { gameApi } from "../services/gameApi";
import { ScoreData } from "types/Score";
import { resetGameState } from "./gameState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GAME_STATE } from "@constants/PersistedData";

type ScoresState = {
  localScores: ScoreData[];
};

const initialState: ScoresState = {
  localScores: [],
};

export const loadScores = createAsyncThunk(
  "scores/loadScores",
  async (_, { rejectWithValue }) => {
    try {
      const dbResult = (await fetchLocalScores()) as SQLResultSet;
      return dbResult.rows._array as ScoreData[];
    } catch (err) {
      return rejectWithValue(err as SQLError);
    }
  }
);

export const submitScore = createAsyncThunk(
  "scores/submitScore",
  async (newScore: Omit<ScoreData, "_id">, { dispatch, rejectWithValue }) => {
    dispatch(gameApi.endpoints.submitScore.initiate(newScore.score));
    try {
      const dbResult = (await submitLocalScore(newScore)) as SQLResultSet;
      return {
        _id: dbResult.insertId!.toString(),
        score: newScore.score,
        username: newScore.username,
      };
    } catch (err) {
      return rejectWithValue(err as SQLError);
    } finally {
      AsyncStorage.removeItem(GAME_STATE);
      dispatch(resetGameState());
    }
  }
);

const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitScore.fulfilled, (state, { payload }) => {
      state.localScores = state.localScores.concat(payload);
    }),
      builder.addCase(loadScores.fulfilled, (state, { payload }) => {
        state.localScores = payload;
      });
  },
});

export default scoresSlice.reducer;
