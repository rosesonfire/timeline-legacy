import db from 'db';
import { EntityRepository } from 'db/models/Entity';
import { PersonRepository } from 'db/models/Person';
import { EventRepository } from 'db/models/Event';
import { EntityToEntityRelationshipRepository } from 'db/models/EntityToEntityRelationship';

import EntityService from 'services/EntityService';
import PersonService from 'services/PersonService';
import EventService from 'services/EventService';
import EntityToEntityRelationshipService from 'services/EntityToEntityRelationshipService';

db.authenticate();

export const entityRepository = new EntityRepository();
export const entityService = new EntityService(entityRepository);

export const personRepository = new PersonRepository();
export const personService = new PersonService(personRepository);

export const eventRepository = new EventRepository();
export const eventService = new EventService(eventRepository);

export const entityToEntityRelationshipRepository = new EntityToEntityRelationshipRepository(
  entityRepository,
);
export const entityToEntityRelationshipService = new EntityToEntityRelationshipService(
  entityToEntityRelationshipRepository,
);
