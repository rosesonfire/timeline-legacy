import db from 'db';
import { EntityRepository } from 'db/models/Entity';

import EntityService from 'services/EntityService';

db.authenticate();

export const entityRepository = new EntityRepository();
export const entityService = new EntityService(entityRepository);
