import { PgModel, PgEntry, PgProject, PgTask } from 'store/models';
import { initialModel } from 'store/test/initial-model';
import { PgEntryRecord } from 'store/models/pg-entry';
import { PgTaskRecord } from 'store/models/pg-task';
import { PgProjectRecord } from 'store/models/pg-project';

export function loadModelFromStore(): Promise<PgModel> {
  return deleteDb('perago').then(() => {
    return openDb('perago');
  }).then(populateDb).then(readDb);
}

function openDb(dbName: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    let dbRequest = indexedDB.open(dbName);
    dbRequest.addEventListener('success', (ev) => {
      resolve(dbRequest.result as IDBDatabase);
    });
    dbRequest.addEventListener('upgradeneeded', (ev) => {
      let db = dbRequest.result as IDBDatabase;
      db.createObjectStore('entries', {
        keyPath: '_id'
      });
      db.createObjectStore('tasks', {
        keyPath: '_id'
      });
      db.createObjectStore('projects', {
        keyPath: '_id'
      });
    });
  });
}

function deleteDb(dbName: string): Promise<void> {
  return new Promise<void>((res, rej) => {
    let deleteRequest = indexedDB.deleteDatabase(dbName);
    deleteRequest.addEventListener('success', (ev) => {
      res();
    });
    deleteRequest.addEventListener('error', (ev) => {
      rej(ev);
    });
  });
}

function populateDb(db: IDBDatabase): Promise<IDBDatabase> {
  return new Promise<IDBDatabase>((res, rej) => {
    let writeTransaction = db.transaction(['entries', 'tasks', 'projects'], 'readwrite');
    let entriesStore = writeTransaction.objectStore('entries');
    initialModel.entries.forEach((entry) => {
      entriesStore.add((entry as PgEntryRecord).toJS());
    });
    let tasksStore = writeTransaction.objectStore('tasks');
    initialModel.tasks.forEach((task) => {
      tasksStore.add((task as PgTaskRecord).toJS());
    });
    let projectsStore = writeTransaction.objectStore('projects');
    initialModel.projects.forEach((project) => {
      projectsStore.add((project as PgProjectRecord).toJS());
    });
    writeTransaction.addEventListener('complete', (ev) => {
      res(db);
    });
    writeTransaction.addEventListener('error', (ev) => {
      rej(ev);
    });
  });
}

function readDb(db: IDBDatabase): Promise<PgModel> {
  let readTransaction = db.transaction(['entries', 'projects', 'tasks'], 'readonly');
  let readOperations = [
    readTransaction.objectStore('entries'),
    readTransaction.objectStore('projects'),
    readTransaction.objectStore('tasks')
  ].map((objectStore) => {
    return new Promise<(PgEntry | PgProject | PgTask)[]>((res, rej) => {
      let data: (PgEntry | PgProject | PgTask)[] = [];
      let cursorRequest = objectStore.openCursor();
      cursorRequest.addEventListener('success', (ev) => {
        let cursor: IDBCursorWithValue = cursorRequest.result;
        if (cursor && cursor.value) {
          data.push(cursor.value);
          cursor.continue();
        } else {
          res(data);
        }
      });
      cursorRequest.addEventListener('error', (ev) => {
        rej(ev);
      });
    });
  });
  return Promise.all(readOperations).then(([entries, projects, tasks]: [PgEntry[], PgProject[], PgTask[]]) => {
    return PgModel.from({ entries, projects, tasks });
  });
}
