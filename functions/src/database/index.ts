const tables = ["response", "survey"] as const;
export type Table = typeof tables[number];

export default class Database {
  async create<T>(_table: Table, _data: T): Promise<string> {
    throw new Error("Miss implementation");
  }

  async delete(_table: Table, _id: string) {
    throw new Error("Miss implementation");
  }

  async read<T>(_table: Table, _id: string): Promise<T> {
    throw new Error("Miss implementation");
  }

  async update<T>(_table: Table, _id: string, _data: T): Promise<string> {
    throw new Error("Miss implementation");
  }
}
