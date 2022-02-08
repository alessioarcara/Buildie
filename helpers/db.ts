import * as SQLite from "expo-sqlite";
import { ScoreData } from "types/Score";

const db = SQLite.openDatabase("buildie.db");

export const init = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "\
            CREATE TABLE IF NOT EXISTS scores (\
                _id INTEGER PRIMARY KEY, \
                username TEXT NOT NULL, \
                score INTEGER NOT NULL \
            );",
        [],
        () => {
          resolve(true);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

export const fetchLocalScores = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM scores WHERE score > 0 ORDER BY score DESC",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

export const submitLocalScore = (newScore: Omit<ScoreData, "_id">) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO scores (username, score) VALUES (?, ?);",
        [newScore.username, newScore.score],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

export const clearLocalScores = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM scores",
        [],
        () => {
          resolve(true);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
