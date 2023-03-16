export interface Entity {
  id: number;
  name: string;
}

export type EntityPostFields = Omit<Entity, 'id'>;
