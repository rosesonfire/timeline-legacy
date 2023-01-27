import { List, RecordOf } from 'immutable';

import Person, { IPersonRepository } from 'domainModels/Person';
import { Pagination } from 'domainModels/types';

import DomainModelService from './DomainModelService';

class PersonService extends DomainModelService<Person, IPersonRepository> {
  filter(
    domainModel: RecordOf<Partial<Person>>,
    pagination?: RecordOf<Pagination>,
  ): Promise<List<RecordOf<Person>>> {
    return this._db.filter(domainModel, pagination);
  }
}

export default PersonService;
