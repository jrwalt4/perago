import { modelReducer } from './model-reducer';
import { viewReducer } from './view-reducer';

export const reducers = {
  model: modelReducer,
  view: viewReducer
};

export { PgModelState } from './model-reducer';
export { PgViewState } from './view-reducer';
export { PgRouterState, history, routerMiddleware } from './router-reducer';