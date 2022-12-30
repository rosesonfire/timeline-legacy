import { EntityRepository } from 'db/models/Entity';

jest.mock('sequelize', () => ({
  Op: {
    like: 'like',
  },
}));

jest.mock('sequelize-typescript', () => ({
  Table: jest.fn(() =>
    jest.fn((target, propertyName: string, propertyDescriptor?: PropertyDescriptor) => {
      if (propertyDescriptor) {
        propertyDescriptor.kind = 'method';
      }
    }),
  ),
  Column: jest.fn((target, propertyName: string, propertyDescriptor?: PropertyDescriptor) => {
    if (propertyDescriptor) {
      propertyDescriptor.kind = 'field';
    }
  }),
  Model: jest.fn(),
}));

jest.mock('db/models/Entity');

export const entityRepositoryMock = new EntityRepository();
