import { PgModel } from 'store/models/pg-model';
import { initialModel } from 'store/test/initial-model';

export function loadModelFromStore(): Promise<PgModel> {
  return Promise.resolve(initialModel);
}
