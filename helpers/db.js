import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL, lng REAL);",
        [],
        () => {
          //Function if SQL query succeeds
          resolve();
        },
        (_, error) => {
          //Function if SQL query fails
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
            [title, imageUri, address, lat, lng],
            (_, result) => {
              //Function if SQL query succeeds
              resolve(result);
            },
            (_, error) => {
              //Function if SQL query fails
              reject(error);
            }
          );
        });
      });
    
      return promise;
};

export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM places",
            [],
            (_, result) => {
              //Function if SQL query succeeds
              resolve(result);
            },
            (_, error) => {
              //Function if SQL query fails
              reject(error);
            }
          );
        });
      });
    
      return promise;
}