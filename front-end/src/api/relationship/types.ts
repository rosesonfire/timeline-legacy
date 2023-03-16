export interface EntityToEntityRelationship {
  id: number;
  type: string;
}

export type EntityToEntityRelationshipPostFields = Omit<EntityToEntityRelationship, 'id'>;
