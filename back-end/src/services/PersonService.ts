import { List, RecordOf } from 'immutable';

import Person, { IPersonRepository } from 'domainModels/Person';

import DomainModelService from './DomainModelService';

class PersonService extends DomainModelService<Person, IPersonRepository> {
  filter(domainModel: RecordOf<Partial<Person>>): Promise<List<RecordOf<Person>>> {
    return this._db.filter(domainModel);
  }
}

export default PersonService;
