import { PgModel, from as modelFrom } from 'store/models/pg-model';
import { PgEntry, from as entryFrom } from 'store/models/pg-entry';
import { PgTask } from 'store/models/pg-task';
import { IdbModelStore } from './IdbModelStore';
import { ModelStore } from './ModelStore';
import { initialModel } from 'store/test/initial-model';

const _store: ModelStore = new IdbModelStore();
let _storeIsInitialized = false;

function getStore(): Promise<ModelStore> {
  if (_storeIsInitialized) {
    return Promise.resolve(_store);
  }
  return _store.clearAll().then(() => {
    return Promise.all(
      [
        Array.from(initialModel.entries.values()).reduce<Promise<void | PgEntry>>(
          (promise, val: PgEntry) => {
            if (promise) {
              return promise.then(() => _store.addItem('entries', val));
            }
            return _store.addItem('entries', val);
          },
          Promise.resolve()
        ),
        Array.from(initialModel.tasks.values()).reduce<Promise<void | PgTask>>(
          (promise, val: PgTask) => {
            if (promise) {
              return promise.then(() => _store.addItem('tasks', val));
            }
            return _store.addItem('tasks', val);
          },
          Promise.resolve()
        )
      ]
    );
  }).then(() => {
    _storeIsInitialized = true;
    return _store;
  });
}

export function loadModelFromStore(): Promise<PgModel> {
  return getStore().then((store) => {
    return Promise.all<PgEntry[], PgTask[]>(
      [
        store.getAll('entries'),
        store.getAll('tasks'),
      ]
    );
  }).then(([entries, tasks]) => {
    return modelFrom({ entries, tasks});
  });
}

export function addEntryToStore(entry: Partial<PgEntry>): Promise<PgEntry> {
  return getStore().then((store) => {
    return store.addItem('entries', entryFrom(entry));
  });
}
