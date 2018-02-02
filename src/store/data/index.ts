import { PgModel } from 'store/models';
import { initialModel } from 'store/test/initial-model';

export function loadModelFromStore(): Promise<PgModel> {
  return Promise.resolve(initialModel);
}