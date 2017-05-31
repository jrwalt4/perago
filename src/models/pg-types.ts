import { Map } from 'immutable';

export interface PgBase {
  _id: string;
}

export interface ItemConstructor<T> {
  from(item: Partial<T>): RecordType<T>;
}

// tslint:disable-next-line:no-any
export interface Record<RType> extends Map<string, any> {
  get<K extends keyof RType>(key: K): RType[K];
  set<K extends keyof RType>(key: K, val: RType[K]): this;
};

export type RecordType<RType> = Readonly<RType> & Record<RType>;

export interface RecordTypeConstructor<RType> {
  new (props?: Partial<RType>): RecordType<RType>;
  (props?: Partial<RType>): RecordType<RType>;
}

export interface PropertyMap<RType, XTypes> {
  name: keyof RType | XTypes;
  alias?: string;
  render?: (obj: RType) => JSX.Element;
}