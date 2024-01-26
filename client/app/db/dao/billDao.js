import { BillDB as DB, Bill_STORE, TXN_WRITE } from "../billDb";

class BillDao {
  async add(bill) {
    const db = await DB.openDB();
    await db.add(Bill_STORE, bill);
    return db.get(Bill_STORE, bill.BillId);
  }

  async getAll() {
    const db = await DB.openDB();
    const store = db.transaction([Bill_STORE]).objectStore(Bill_STORE);
    return store.getAll();
  }

  async get(key) {
    const db = await DB.openDB();
    const store = db.transaction([Bill_STORE]).objectStore(Bill_STORE);
    return store.get(key);
  }

  async delete(id) {
    const db = await DB.openDB();
    return db.delete(Bill_STORE, id);
  }

  async update(bill) {
    const db = await DB.openDB();
    const store = db
      .transaction([Bill_STORE], TXN_WRITE)
      .objectStore(Bill_STORE);
    return store.put(bill);
  }
}

const billDao = new BillDao();

export default billDao;
