jest.mock('api/entity', () => ({
  createEntity: jest.fn(),
  getEntities: () => Promise.resolve({ data: 'data' }),
}));
