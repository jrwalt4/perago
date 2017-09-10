export interface PgBase {
  _id: string;
}

export interface ItemConstructor<T> {
  from(item: Partial<T>): RecordType<T>;
}

// Override Immutable.Record until v4 type definitions are released
export interface RecordInstance<RType> {
  get<K extends keyof RType>(key: K): RType[K];
  set<K extends keyof RType>(key: K, val: RType[K]): this;
  // tslint:disable-next-line:no-any
  setIn(path: string[], value: any): this;
  setIn<V>(path: string[], value: V): this;
  getIn<V>(path: string[]): V;
  deleteIn(path: string[]): this;
  // tslint:disable-next-line:no-any
  withMutations(mutator: (p: this) => any): this;
  asMutable(): this;
  asImmutable(): this;
}

export type RecordType<RType> = Readonly<RType> & RecordInstance<RType>;

export interface RecordTypeConstructor<RType> {
  new(props?: Partial<RType>): RecordType<RType>;
  (props?: Partial<RType>): RecordType<RType>;
}

export interface PropertyMap<RType, XTypes> {
  name: keyof RType | XTypes;
  alias?: string;
  render?: (obj: RType) => JSX.Element;
}