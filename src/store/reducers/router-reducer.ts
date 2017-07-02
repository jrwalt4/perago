import { RouterState } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

export const history = createBrowserHistory();

export type PgRouterState = RouterState;

export * from 'react-router-redux';