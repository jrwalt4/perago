import { PgEntry, PgTask, PgProject } from 'store/models';

export interface ModelStore {
  getItem<S extends StoreName>(store: S, id: string): Promise<StoreSchema[S]>;

  getAll<S extends StoreName>(store: S): Promise<StoreSchema[S][]>;

  addItem<S extends StoreName>(store: S, value: StoreSchema[S]): Promise<StoreSchema[S]>;

  updateItem<S extends StoreName>(store: S, value: StoreSchema[S]): Promise<StoreSchema[S]>;

  removeItem<S extends StoreName>(store: S, id: string): Promise<string>;

  clear<S extends StoreName>(store: S): Promise<void>;

  getKeys<S extends StoreName>(store: S): Promise<string[]>;

  count<S extends StoreName>(store: S): Promise<number>;

  iterate<S extends StoreName>(store: S, callback: IteratorCallback<StoreSchema[S]>): Promise<number>;
}

export interface StoreSchema {
  entries: PgEntry;
  tasks: PgTask;
  projects: PgProject;
}

export type StoreName = keyof StoreSchema;

export interface IteratorCallback<T> {
  (value: T, key: string, index: number): undefined | {};
}
