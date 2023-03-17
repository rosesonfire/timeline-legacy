export interface EntityToEntityRelationship {
  id: number;
  name: string;
  type: string;
  relationshipOfId: number;
  relationshipWithId: number;
}

export type EntityToEntityRelationshipPostFields = Omit<EntityToEntityRelationship, 'id'>;
