import * as firestore from "@google-cloud/firestore";
import * as admin from "firebase-admin";
import { nanoid } from "nanoid";
import Database, { Table } from ".";

export default class Firestore extends Database {
  private database: firestore.Firestore;

  constructor() {
    super();
    admin.initializeApp();
    this.database = admin.firestore();
  }

  async create<T>(table: Table, data: T & { id: string }) {
    const id = nanoid();
    await this.database
      .collection(table)
      .doc(id)
      .create({ ...data, id });
    return id;
  }

  async delete(table: Table, id: string) {
    const document = this.database.collection(table).doc(id);
    await document.delete();
  }

  async read<T>(table: Table, id: string): Promise<T> {
    const document = this.database.collection(table).doc(id);
    const result = await document.get();
    return result.data() as T;
  }

  async update<T>(table: Table, id: string, data: T) {
    const document = this.database.collection(table).doc(id);
    await document.update(data);
    return id;
  }
}
