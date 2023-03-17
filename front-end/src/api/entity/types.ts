import { List, RecordOf } from 'immutable';

export interface Entity {
  id: number;
  name: string;
  relatedEntities1?: Entity[];
  relatedEntities2?: Entity[];
}

export interface ImmutableEntity extends Omit<Entity, 'relatedEntities1' | 'relatedEntities2'> {
  relatedEntities1: List<RecordOf<Entity>>;
  relatedEntities2: List<RecordOf<Entity>>;
}

export type EntityPostFields = Omit<Entity, 'id'>;
