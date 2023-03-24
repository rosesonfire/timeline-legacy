import { List, Record, RecordOf } from 'immutable';

import { api } from 'api/base';

import { Pagination } from 'api/_shared/types';

import { Event, EventSorting, EventPostFields, EventResponse, ImmutableEvent } from './types';

let prevGetEventsController: AbortController | null = null;

export const getEvents = (sorting: EventSorting, pagination: Pagination) => {
  prevGetEventsController?.abort();

  const getEventsController = new AbortController();

  prevGetEventsController = getEventsController;

  return api
    .get<EventResponse[]>('/event', {
      params: {
        ...sorting,
        ...pagination,
      },
      signal: getEventsController.signal,
    })
    .then(({ data: events }) => {
      return List<RecordOf<ImmutableEvent>>(
        events.map((event) =>
          Record({
            ...event,
            startedAt: new Date(event.startedAt),
            endedAt: event.endedAt ? new Date(event.endedAt) : undefined,
          })(),
        ),
      );
    });
};

export const createEvent = (event: RecordOf<EventPostFields>) =>
  api.post<Event>('/event', event.toJSON()).then(({ data: event }) => Record(event)());

export const deleteAllEvents = () => api.delete<void>('/event');
