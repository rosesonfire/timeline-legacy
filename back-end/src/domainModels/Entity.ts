import { DM, IRepository } from './types';

interface Entity extends DM {}

export interface IEntityRepository<T extends Entity = Entity> extends IRepository<T> {}

export default Entity;
