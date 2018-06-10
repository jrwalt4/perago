import { PgModel, PgEntry, PgProject, PgTask } from 'store/models';
import { IdbModelStore } from './IdbModelStore';
import { ModelStore } from './ModelStore';
import { initialModel } from '../test/initial-model';

const _store: ModelStore = new IdbModelStore();
let _storeIsInitialized = false;

function getStore(): Promise<ModelStore> {
  if (_storeIsInitialized) {
    return Promise.resolve(_store);
  }
  return _store.clearAll().then(() => {
    return Promise.all(
      [
        initialModel.entries.reduce<Promise<void | PgEntry>>(
          (promise, val: PgEntry) => {
            if (promise) {
              return promise.then(() => _store.addItem('entries', val));
            }
            return _store.addItem('entries', val);
          },
          Promise.resolve()
        ),
        initialModel.tasks.reduce<Promise<void | PgTask>>(
          (promise, val: PgTask) => {
            if (promise) {
              return promise.then(() => _store.addItem('tasks', val));
            }
            return _store.addItem('tasks', val);
          },
          Promise.resolve()
        ),
        initialModel.projects.reduce<Promise<void | PgProject>>(
          (promise, val: PgProject) => {
            if (promise) {
              return promise.then(() => _store.addItem('projects', val));
            }
            return _store.addItem('projects', val);
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
    return Promise.all<PgEntry[], PgTask[], PgProject[]>(
      [
        store.getAll('entries'),
        store.getAll('tasks'),
        store.getAll('projects')
      ]
    );
  }).then(([entries, tasks, projects]) => {
    return PgModel.from({ entries, tasks, projects });
  });
}

export function addEntryToStore(entry: Partial<PgEntry>): Promise<PgEntry> {
  return getStore().then((store) => {
    return store.addItem('entries', PgEntry.from(entry));
  });
}
