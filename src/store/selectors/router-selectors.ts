import { createSelector } from 'reselect';

import { PgAppState, PgRouterState } from 'store';

function routerSelector(state: PgAppState) {
  return state.router;
}

export const pathSelector = createSelector(
  routerSelector,
  (router: PgRouterState) => router.location.pathname
);
