import { ModelStore, IteratorCallback, StoreName, StoreSchema } from './ModelStore';
import { PgObject, isRecord, RecordType } from 'store/models';

const idb: IDBFactory = indexedDB;

export class IdbModelStore implements ModelStore {

  private _dbName: string;
  private _dbVersion: number;
  private _dbCache: IDBDatabase | undefined;

  private static _sanitize(obj: PgObject): PgObject {
    if (isRecord(obj)) {
      return (obj as RecordType<PgObject>).toJS();
    }
    return obj;
  }

  constructor(version: number = 1) {
    this._dbName = 'perago';
    this._dbVersion = version;
  }

  getItem<S extends StoreName>(store: S, id: string): Promise<StoreSchema[S]> {
    return this._getDb().then((db) => {
      return new Promise<StoreSchema[S]>((getResolve, getReject) => {
        let getRequest = db.transaction(store, 'readonly').objectStore(store).get(id);
        getRequest.onsuccess = (ev) => {
          getResolve(getRequest.result);
        };
        getRequest.onerror = (ev) => {
          getReject(getRequest.error);
        };
      });
    });
  }

  getAll<S extends StoreName>(store: S): Promise<StoreSchema[S][]> {
    return this._getDb().then<PgObject[]>((db) => {
      let objectStore = db.transaction(store, 'readonly').objectStore(store);
      if (objectStore.getAll) {
        return new Promise((getAllResolve, getAllReject) => {
          let getAllRequest = (objectStore.getAll as () => IDBRequest)();
          getAllRequest.onsuccess = (ev) => {
            getAllResolve(getAllRequest.result);
          };
          getAllRequest.onerror = (ev) => {
            getAllReject(getAllRequest.error);
          };
        });
      }
      return new Promise((getAllResolve, getAllReject) => {
        let results: StoreSchema[S][] = [];
        let cursorRequest = objectStore.openCursor();
        cursorRequest.onsuccess = (ev) => {
          let cursor: IDBCursorWithValue = cursorRequest.result;
          if (cursor && cursor.value) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            getAllResolve(results);
          }
        };
        cursorRequest.onerror = (ev) => {
          getAllReject(cursorRequest.error);
        };
      });
    });
  }

  addItem<S extends StoreName>(store: S, value: StoreSchema[S]): Promise<StoreSchema[S]> {
    return this._getDb().then<PgObject>((db) => {
      return new Promise<PgObject>((addResolve, addReject) => {
        let jsValue = IdbModelStore._sanitize(value);
        let addRequest = db.transaction(store, 'readwrite').objectStore(store).add(jsValue);
        addRequest.onsuccess = (ev) => {
          addResolve(jsValue);
        };
        addRequest.onerror = (ev) => {
          addReject(addRequest.error);
        };
      });
    });
  }

  updateItem<S extends StoreName>(store: S, value: StoreSchema[S]): Promise<StoreSchema[S]> {
    throw new Error('not implemented');
  }

  removeItem<S extends StoreName>(store: S, id: string): Promise<string> {
    throw new Error('not implemented');
  }

  clear<S extends StoreName>(store: S): Promise<void> {
    throw new Error('not implemented');
  }

  getKeys<S extends StoreName>(store: S): Promise<string[]> {
    throw new Error('not implemented');
  }

  count<S extends StoreName>(store: S): Promise<number> {
    throw new Error('not implemented');
  }

  iterate<S extends StoreName>(store: S, callback: IteratorCallback<StoreSchema[S]>): Promise<number> {
    throw new Error('not implemented');
  }

  private _getDb(): Promise<IDBDatabase> {
    if (this._dbCache) {
      return Promise.resolve(this._dbCache);
    }
    return new Promise((openResolve, openReject) => {
      let openRequest = idb.open(this._dbName, this._dbVersion);
      openRequest.onupgradeneeded = (ev) => {
        this._upgradeDb(openRequest.result);
      };
      openRequest.onsuccess = (ev) => {
        openResolve(openRequest.result);
      };
      openRequest.onerror = (ev) => {
        openReject(openRequest.error);
      };
    });
  }

  private _upgradeDb(db: IDBDatabase): void {
    db.createObjectStore('entries', {
      keyPath: '_id'
    }).createIndex('taskIndex', 'taskId');
    db.createObjectStore('tasks', {
      keyPath: '_id'
    });
    db.createObjectStore('projects', {
      keyPath: '_id'
    });
  }

}
