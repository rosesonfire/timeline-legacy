import { List, RecordOf } from 'immutable';

import { KeyOf } from 'common/types/type';

export interface DM {
  id: number;
  name: string;
}

export type SortOrder = 'DESC' | 'ASC';

export interface Pagination {
  offset: number;
  pageSize: number;
}

export interface Sorting<T extends DM> {
  sortBy: KeyOf<T>;
  order: SortOrder;
}

export interface IRepository<T extends DM> {
  find(id: T['id']): Promise<RecordOf<T> | null>;
  create(domainModel: RecordOf<Omit<T, 'id'>>): Promise<RecordOf<T>>;
  update(id: T['id'], domainModel: RecordOf<Partial<T>>): Promise<RecordOf<T> | null>;
  delete(id: T['id']): Promise<RecordOf<T> | null>;
  filter(
    domainModel: RecordOf<Partial<T>>,
    options?: {
      sorting?: RecordOf<Sorting<T>>;
      pagination?: RecordOf<Pagination>;
    },
  ): Promise<List<RecordOf<T>>>;
}
