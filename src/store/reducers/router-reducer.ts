import { connectRouter, RouterState } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

export type PgRouterState = RouterState;

export const routerReducer = connectRouter(history);

export { routerMiddleware } from 'connected-react-router';
