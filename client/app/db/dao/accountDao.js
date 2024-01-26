import { AccountDB as DB, ACCOUNT_STORE, TXN_WRITE } from "../accountDb";

class AccountDao {
  async add(account) {
    const db = await DB.openDB();
    await db.add(ACCOUNT_STORE, account);
    return db.get(ACCOUNT_STORE, account.accountId);
  }

  async getAll() {
    const db = await DB.openDB();
    const store = db.transaction([ACCOUNT_STORE]).objectStore(ACCOUNT_STORE);
    return store.getAll();
  }

  async get(key) {
    const db = await DB.openDB();
    const store = db.transaction([ACCOUNT_STORE]).objectStore(ACCOUNT_STORE);
    return store.get(key);
  }

  async delete(id) {
    const db = await DB.openDB();
    return db.delete(ACCOUNT_STORE, id);
  }

  async update(account) {
    const db = await DB.openDB();
    const store = db
      .transaction([ACCOUNT_STORE], TXN_WRITE)
      .objectStore(ACCOUNT_STORE);
    return store.put(account);
  }
}

const accountDao = new AccountDao();

export default accountDao;
