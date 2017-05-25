export interface Record<RType> {
  get<K extends keyof RType>(key: K): RType[K];
  set<K extends keyof RType>(key: K, val: RType[K]): this;
};

export type RecordType<RType> = Readonly<RType> & Record<RType>;

export interface RecordTypeConstructor<RType> {
  new (props?: Partial<RType>): RecordType<RType>;
  (props?: Partial<RType>): RecordType<RType>;
}