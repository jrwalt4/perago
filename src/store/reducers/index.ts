import { modelReducer, PgModelState as PgModelStateImport } from './model-reducer';
import { viewReducer, PgViewState as PgViewStateImport } from './view-reducer';
import { 
  history as routerHistory, 
  routerMiddleware as routerMiddlewareImport, 
  routerReducer, 
  PgRouterState 
} from './router-reducer';

export const reducers = {
  model: modelReducer,
  view: viewReducer,
  router: routerReducer
};

export type PgModelState = PgModelStateImport;
export type PgViewState = PgViewStateImport;
export type PgRouterState = PgRouterState;
export const history = routerHistory;
export const routerMiddleware = routerMiddlewareImport;;
