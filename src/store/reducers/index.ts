import { modelReducer } from './model-reducer';
import { viewReducer } from './view-reducer';

export let reducers = {
  model: modelReducer,
  view: viewReducer
};

export { PgModelState } from './model-reducer';
export { PgViewState } from './view-reducer';