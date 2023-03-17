import { List, RecordOf } from 'immutable';

import { DM, IRepository, Pagination } from 'domainModels/types';

abstract class DomainModelService<T extends DM, R extends IRepository<T>> {
  protected _repository!: R;

  constructor(repository: R) {
    this._repository = repository;
  }

  create(domainModel: RecordOf<Omit<T, 'id'>>): Promise<RecordOf<T>> {
    return this._repository.create(domainModel);
  }

  find(id: T['id']): Promise<RecordOf<T> | null> {
    return this._repository.find(id);
  }

  filter(
    entity: RecordOf<Partial<T>>,
    pagination?: RecordOf<Pagination>,
  ): Promise<List<RecordOf<T>>> {
    return this._repository.filter(entity, pagination);
  }

  update(id: T['id'], domainModel: RecordOf<Partial<T>>): Promise<RecordOf<T> | null> {
    return this._repository.update(id, domainModel);
  }

  delete(id: T['id']): Promise<RecordOf<T> | null> {
    return this._repository.delete(id);
  }
}

export default DomainModelService;
