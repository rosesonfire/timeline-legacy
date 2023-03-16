import Person, { IPersonRepository } from 'domainModels/Person';

import DomainModelService from './DomainModelService';

class PersonService extends DomainModelService<Person, IPersonRepository> {}

export default PersonService;
