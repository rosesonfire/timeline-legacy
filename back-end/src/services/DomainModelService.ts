import { RecordOf } from 'immutable';

import { Repository } from 'domainModels/types';

abstract class DomainModelService<DM extends {}> {
  _db!: Repository<DM>;

  constructor(db: Repository<DM>) {
    this._db = db;
  }

  create(domainModel: RecordOf<DM>) {
    return this._db.create(domainModel);
  }

  filter(domainModel: RecordOf<Partial<DM>>) {
    return this._db.filter(domainModel);
  }
}

export default DomainModelService;
