import Entity, { IEntityRepository } from './Entity';

export type Gender = 'male' | 'female';

interface Person extends Entity {
  gender: Gender;
}

export interface IPersonRepository extends IEntityRepository<Person> {}

export default Person;
