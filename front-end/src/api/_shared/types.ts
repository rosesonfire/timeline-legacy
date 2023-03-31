export interface Pagination {
  offset: number;
  pageSize: number;
}

export type SortOrder = 'DESC' | 'ASC';

export interface Relationship {
  id: number;
  name: string;
  type: string;
  relationshipOfId: number;
  relationshipWithId: number;
}

export type RelationshipPostFields<T extends Relationship> = Omit<T, 'id'>;
