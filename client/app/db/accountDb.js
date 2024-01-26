import * as idb from "idb";

export const ACCOUNT_STORE = "accounts";
export const Account_DB_NAME = "account_db";
export const Account_DB_VERSION = 1;

export const TXN_WRITE = "readwrite";

class AccountDB {
  static openDB() {
    return idb.openDB(Account_DB_NAME, Account_DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(ACCOUNT_STORE, {
          keyPath: "accountId",
        });
        store.transaction.oncomplete = () => {
          console.log(`Store ${ACCOUNT_STORE} has been created`);
        };
      },
    });
  }
}

export { AccountDB };
