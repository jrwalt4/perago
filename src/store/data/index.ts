import { PgModel, PgEntry, PgProject, PgTask } from 'store/models';
import { IdbModelStore } from './IdbModelStore';
import { ModelStore } from './ModelStore';
import { initialModel } from '../test/initial-model';

let store: ModelStore = new IdbModelStore();

let storeSetup = store.clearAll().then(() => {
  return Promise.all(
    [
      initialModel.entries.reduce<Promise<void | PgEntry>>(
        (promise, val: PgEntry) => {
          if (promise) {
            return promise.then(() => store.addItem('entries', val));
          }
          return store.addItem('entries', val);
        },
        Promise.resolve()
      ),
      initialModel.tasks.reduce<Promise<void | PgTask>>(
        (promise, val: PgTask) => {
          if (promise) {
            return promise.then(() => store.addItem('tasks', val));
          }
          return store.addItem('tasks', val);
        },
        Promise.resolve()
      ),
      initialModel.projects.reduce<Promise<void | PgProject>>(
        (promise, val: PgProject) => {
          if (promise) {
            return promise.then(() => store.addItem('projects', val));
          }
          return store.addItem('projects', val);
        },
        Promise.resolve()
      )
    ]
  );
});

export function loadModelFromStore(): Promise<PgModel> {
  return storeSetup.then(() => {
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
