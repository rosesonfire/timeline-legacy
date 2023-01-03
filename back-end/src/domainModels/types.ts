import { List, RecordOf } from 'immutable';

export interface DM {
  id: number;
  name: string;
}

export interface IRepository<T extends DM> {
  find(id: T['id']): Promise<RecordOf<T> | null>;
  create(domainModel: RecordOf<T>): Promise<RecordOf<T>>;
  update(id: T['id'], domainModel: RecordOf<Partial<T>>): Promise<RecordOf<T> | null>;
  delete(id: T['id']): Promise<RecordOf<T> | null>;
  filter(domainModel: RecordOf<Partial<T>>): Promise<List<RecordOf<T>>>;
}
