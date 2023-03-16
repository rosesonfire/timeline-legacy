import { List, RecordOf } from 'immutable';

export interface DM {
  id: number;
  name: string;
}

export interface Pagination {
  offset?: number;
  pageSize?: number;
}

export interface IRepository<T extends DM> {
  find(id: T['id']): Promise<RecordOf<T> | null>;
  create(domainModel: RecordOf<Omit<T, 'id'>>): Promise<RecordOf<T>>;
  update(id: T['id'], domainModel: RecordOf<Partial<T>>): Promise<RecordOf<T> | null>;
  delete(id: T['id']): Promise<RecordOf<T> | null>;
  filter(
    domainModel: RecordOf<Partial<T>>,
    pagination?: RecordOf<Pagination>,
  ): Promise<List<RecordOf<T>>>;
}
