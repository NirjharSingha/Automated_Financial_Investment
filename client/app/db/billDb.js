import * as idb from "idb";

export const Bill_STORE = "bills";
export const Bill_DB_NAME = "bill_db";
export const Bill_DB_VERSION = 1;

export const TXN_WRITE = "readwrite";

class BillDB {
  static openDB() {
    return idb.openDB(Bill_DB_NAME, Bill_DB_VERSION, {
      upgrade(db) {
        const store = db.createObjectStore(Bill_STORE, {
          keyPath: "billId",
        });
        store.transaction.oncomplete = () => {
          console.log(`Store ${Bill_STORE} has been created`);
        };
      },
    });
  }
}

export { BillDB };
