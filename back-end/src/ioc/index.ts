import db from 'db';
import { EntityRepository } from 'db/models/Entity';
import { PersonRepository } from 'db/models/Person';

import EntityService from 'services/EntityService';
import PersonService from 'services/PersonService';

db.authenticate();

export const entityRepository = new EntityRepository();
export const entityService = new EntityService(entityRepository);

export const personRepository = new PersonRepository();
export const personService = new PersonService(personRepository);
