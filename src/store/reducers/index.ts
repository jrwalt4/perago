import { modelReducer } from './model-reducer';
import { viewReducer } from './view-reducer';
import { routerReducer } from './router-reducer';

export const reducers = {
  model: modelReducer,
  view: viewReducer,
  router: routerReducer
};

export { PgModelState } from './model-reducer';
export { PgViewState } from './view-reducer';
export { PgRouterState, history, routerMiddleware } from './router-reducer';