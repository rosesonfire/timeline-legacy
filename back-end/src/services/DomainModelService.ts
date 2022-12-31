import { RecordOf } from 'immutable';

import { DM, IRepository } from 'domainModels/types';

abstract class DomainModelService<T extends DM, R extends IRepository<T>> {
  protected _db!: R;

  constructor(db: R) {
    this._db = db;
  }

  create(domainModel: RecordOf<T>): Promise<RecordOf<T>> {
    return this._db.create(domainModel);
  }

  find(id: T['id']): Promise<RecordOf<T> | null> {
    return this._db.find(id);
  }

  update(id: T['id'], domainModel: RecordOf<Partial<T>>): Promise<RecordOf<T> | null> {
    return this._db.update(id, domainModel);
  }

  delete(id: T['id']): Promise<RecordOf<T> | null> {
    return this._db.delete(id);
  }
}

export default DomainModelService;
