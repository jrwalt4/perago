import { PgModelAction } from './model-actions';
import { PgViewAction } from './view-actions';
export * from './model-actions';
export * from './view-actions';

export type PgAction = PgModelAction | PgViewAction;