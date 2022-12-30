import { Record } from 'immutable';

import { entityRepositoryMock } from 'common/mocks/index.mock.test';

import EntityService from '../EntityService';

describe('EntityService', () => {
  it('create', () => {
    const entity = Record({ name: 'hello' })();

    new EntityService(entityRepositoryMock).create(entity);

    expect(entityRepositoryMock.create).toHaveBeenCalledWith(entity);
  });

  it('create', () => {
    const entity = Record({ name: 'hello' })();

    new EntityService(entityRepositoryMock).create(entity);

    expect(entityRepositoryMock.create).toHaveBeenCalledWith(entity);
  });
});
