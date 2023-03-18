export interface Event {
  id: number;
  name: string;
  startedAt: Date;
  endedAt?: Date;
}

export interface ImmutableEvent extends Event {}

export type EventPostFields = Omit<Event, 'id'>;
