/**
 * main sagas for redux-saga
 */

import { all, call, put, take } from 'redux-saga/effects';
import { 
  createEntry, createEntryError, createEntrySuccess,
  loadModelBegin, loadModelError, loadModelSuccess
} from 'store/actions';
import { loadModelFromStore, addEntryToStore } from 'store/data';

function* watchNewEntries() {
  while (true) {
    const action: createEntry = yield take(createEntry.type);
    try {
      const entry = yield call(addEntryToStore, action.payload);
      yield put(createEntrySuccess(entry));
    } catch (err) {
      yield put(createEntryError(err));
    }
  }
}

function* start() {
  yield put(loadModelBegin());
  try {
    const model = yield call(loadModelFromStore);
    yield put(loadModelSuccess(model));
  } catch (err) {
    yield put(loadModelError(err));
  }
}

export default function* pgMain() {
  yield all([
    start(),
    watchNewEntries()
  ]);
}
