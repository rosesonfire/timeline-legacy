import { AxiosResponse } from 'axios';

import { api } from 'api/base';

import { Entity } from './types';

export const getEntities = () => api.get('/entity');

export const createEntity = (entity: Entity) =>
  api.post<Entity, AxiosResponse<Entity>, Entity>('/entity', entity);
