import { Record } from 'immutable';
import * as cuid from 'cuid';
import { PgBase, RecordTypeConstructor, RecordType } from './pg-types';

export interface PgProject extends PgBase {
  name: string;
  number: string;
  description: string;
}

export const defaultProject: PgProject = {
  _id: '',
  name: '',
  number: '',
  description: ''
};

// tslint:disable-next-line:no-any
let PgProjectConstructor: RecordTypeConstructor<PgProject> = Record(defaultProject, 'PgProject') as any;
export type PgProjectRecord = RecordType<PgProject>;

export namespace PgProject {
  export function create(): PgProjectRecord {
    return new PgProjectConstructor({
      _id: cuid()
    });
  }
  export function from(props: Partial<PgProject>): PgProjectRecord {
    let _id = props._id || cuid();
    return new PgProjectConstructor({
      ...props,
      _id
    });
  }
}