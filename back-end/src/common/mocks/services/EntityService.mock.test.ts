import EntityService from 'services/EntityService';

import { entityRepositoryMock } from 'common/mocks/repositories/EntityRepository.mock.test';

export const domainModelService = new EntityService(entityRepositoryMock);
