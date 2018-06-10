import { ModelStore, IteratorCallback, StoreName, StoreSchema } from './ModelStore';
import { PgObject, isRecord, RecordType } from 'store/models';

let idb: IDBFactory;
if (typeof indexedDB !== 'undefined') {
  idb = indexedDB;
}

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
    if (IDBObjectStore.prototype.getAll) {
      return this._getDb().then<PgObject[]>((db) => {
        return new Promise((getAllResolve, getAllReject) => {
          let objectStore = db.transaction(store, 'readonly').objectStore(store);
          let getAllRequest = (objectStore.getAll as () => IDBRequest)();
          getAllRequest.onsuccess = (ev) => {
            getAllResolve(getAllRequest.result);
          };
          getAllRequest.onerror = (ev) => {
            getAllReject(getAllRequest.error);
          };
        });
      });
    }
    let items: StoreSchema[S][] = [];
    return this.iterate(store, (item, id, count) => {
      items.push(item);
    }).then((count) => {
      return items;
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
    return this._getDb().then<PgObject>((db) => {
      return new Promise<PgObject>((putResolve, putReject) => {
        let jsValue = IdbModelStore._sanitize(value);
        let putRequest = db.transaction(store, 'readwrite').objectStore(store).put(jsValue);
        putRequest.onsuccess = (ev) => {
          putResolve(jsValue);
        };
        putRequest.onerror = (ev) => {
          putReject(putRequest.error);
        };
      });
    });
  }

  removeItem<S extends StoreName>(store: S, id: string): Promise<string> {
    return this._getDb().then<string>((db) => {
      return new Promise<string>((putResolve, putReject) => {
        let deleteRequest = db.transaction(store, 'readwrite').objectStore(store).delete(id);
        deleteRequest.onsuccess = (ev) => {
          putResolve(id);
        };
        deleteRequest.onerror = (ev) => {
          putReject(deleteRequest.error);
        };
      });
    });
  }

  clear<S extends StoreName>(store: S): Promise<void> {
    throw new Error('not implemented');
  }

  clearAll(): Promise<void> {
    return new Promise((clearResolve, clearReject) => {
      let deleteRequest = idb.deleteDatabase(this._dbName);
      deleteRequest.onsuccess = (ev) => {
        clearResolve();
      };
      deleteRequest.onerror = (ev) => {
        clearReject(deleteRequest.error);
      };
    });
  }

  getKeys<S extends StoreName>(store: S): Promise<string[]> {
    return this._getDb().then<string[]>((db) => {
      return new Promise((getKeysResolve, getKeysReject) => {
        let keys: string[] = [];
        this.iterate(store, (val, id, count) => {
          keys.push(id);
        }).then((count) => {
          return keys;
        });
      });
    });
  }

  count<S extends StoreName>(store: S): Promise<number> {
    return this._getDb().then<number>((db) => {
      return new Promise((countResolve, countReject) => {
        let countRequest = db.transaction(store, 'readonly').objectStore(store).count();
        countRequest.onsuccess = (ev) => {
          countResolve(countRequest.result);
        };
        countRequest.onerror = (ev) => {
          countReject(countRequest.error);
        };
      });
    });
  }

  iterate<S extends StoreName>(
    store: S,
    callback: IteratorCallback<StoreSchema[S]>,
    withMutations: boolean = false
  ): Promise<number> {
    return this._getDb().then<number>((db) => {
      return new Promise<number>((iterateResolve, iterateReject) => {
        let iterationCount = 0;
        let mode: IDBTransactionMode = withMutations ? 'readwrite' : 'readonly';
        let cursorRequest = db.transaction(store, mode).objectStore(store).openCursor();
        cursorRequest.onsuccess = (ev) => {
          let cursor: IDBCursorWithValue = cursorRequest.result;
          if (cursor && cursor.value) {
            callback(cursor.value, cursor.primaryKey, iterationCount++);
          } else {
            iterateResolve(iterationCount);
          }
        };
        cursorRequest.onerror = (ev) => {
          iterateReject(cursorRequest.error);
        };
      });
    });
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
      keyPath: '_id',
    }).createIndex('taskIndex', 'taskId');
    db.createObjectStore('tasks', {
      keyPath: '_id'
    });
    db.createObjectStore('projects', {
      keyPath: '_id'
    });
  }

}
