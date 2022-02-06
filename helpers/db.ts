import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("buildie.db");

export const init = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "\
            CREATE TABLE IF NOT EXISTS scores (\
                id INTEGER PRIMARY KEY, \
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

export const fetchScores = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM scores",
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

export const submitScore = (newScore: any) =>
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

export const clearScores = () =>
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
