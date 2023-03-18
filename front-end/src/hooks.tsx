import { useCallback, useEffect, useMemo, useState } from 'react';
import { List, Record, RecordOf } from 'immutable';
import { ListRenderItem } from 'react-native';

import EntityRow from 'components/EntityRow';
import EventRow from 'components/EventRow';

import { createEntity, deleteAllEntities, getEntities } from 'api/entity';
import { createEvent, deleteAllEvents, getEvents } from 'api/event';
import { createEntityToEntityRelationship } from 'api/relationship';
import { ImmutableEntity } from 'api/entity/types';
import { ImmutableEvent } from 'api/event/types';
import { EntityToEntityRelationshipPostFields } from 'api/relationship/types';

import {
  EntityRelationshipSelectionState,
  EventRelationshipSelectionState,
} from 'components/_shared/types';

import { DEFAULT_PAGE_SIZE } from './constants';

export const useEntities = () => {
  const [offset, setOffset] = useState(0);
  const [entities, setEntities] = useState<List<RecordOf<ImmutableEntity>>>(List([]));
  const [isFetching, setIsFetching] = useState(false);

  const getMoreEntities = useCallback(() => {
    setIsFetching(true);

    getEntities({ offset, pageSize: DEFAULT_PAGE_SIZE })
      .then((moreEntities) => {
        const newOffset = offset + moreEntities.size;

        setIsFetching(false);
        setOffset(newOffset);
        setEntities(entities.concat(moreEntities));

        return moreEntities;
      })
      .catch(() => {});
  }, [offset, entities]);

  useEffect(() => {
    getMoreEntities();
  }, []);

  const addNewEntity = useCallback(async () => {
    await createEntity(
      Record({
        name: 'some name',
      })(),
    );

    getMoreEntities();
  }, [getMoreEntities]);

  const removeAllEntities = useCallback(async () => {
    await deleteAllEntities();

    setOffset(0);
    getMoreEntities();
  }, []);

  return useMemo(
    () => ({
      entities: entities.toArray(),
      addNewEntity,
      getMoreEntities,
      isFetching,
      removeAllEntities,
    }),
    [entities, addNewEntity, getMoreEntities, isFetching, removeAllEntities],
  );
};

export const useEvents = () => {
  const [offset, setOffset] = useState(0);
  const [events, setEvents] = useState<List<RecordOf<ImmutableEvent>>>(List([]));
  const [isFetching, setIsFetching] = useState(false);

  const getMoreEvents = useCallback(() => {
    setIsFetching(true);

    getEvents({ offset, pageSize: DEFAULT_PAGE_SIZE }).then((moreEvents) => {
      const newOffset = offset + moreEvents.size;

      setIsFetching(false);
      setOffset(newOffset);
      setEvents(events.concat(moreEvents));

      return moreEvents;
    });
  }, [offset, events]);

  useEffect(() => {
    getMoreEvents();
  }, []);

  const addNewEvent = useCallback(async () => {
    await createEvent(
      Record({
        name: 'some name',
        startedAt: new Date(),
      })(),
    );

    getMoreEvents();
  }, [getMoreEvents]);

  const removeAllEvents = useCallback(async () => {
    await deleteAllEvents();

    setOffset(0);
    getMoreEvents();
  }, []);

  return useMemo(
    () => ({
      events: events.toArray(),
      addNewEvent,
      getMoreEvents,
      isFetching,
      removeAllEvents,
    }),
    [events, addNewEvent, getMoreEvents, isFetching, removeAllEvents],
  );
};

export const useRelationship = () => {
  const [entity1, setEntity1] = useState<RecordOf<ImmutableEntity>>();
  const [entity2, setEntity2] = useState<RecordOf<ImmutableEntity>>();

  const onPressEntity = useCallback(
    (entity: RecordOf<ImmutableEntity>) => () => {
      if (entity.id === entity1?.id) {
        setEntity1(undefined);
        setEntity2(undefined);
      } else if (entity.id === entity2?.id) {
        setEntity2(undefined);
      } else if (entity1) {
        setEntity2(entity);
      } else {
        setEntity1(entity);
      }
    },
    [entity1, entity2],
  );

  const addNewRelationship = useCallback((formData: EntityToEntityRelationshipPostFields) => {
    createEntityToEntityRelationship(Record(formData)());
  }, []);

  return useMemo(
    () => ({
      entity1,
      entity2,
      onPressEntity,
      addNewRelationship,
    }),
    [onPressEntity, entity1, entity2, addNewRelationship],
  );
};

export const useRenderEntity = (
  onPress: (entity: RecordOf<ImmutableEntity>) => () => void,
  selectedEntity1?: RecordOf<ImmutableEntity>,
  selectedEntity2?: RecordOf<ImmutableEntity>,
) => {
  return useCallback<ListRenderItem<RecordOf<ImmutableEntity>>>(
    ({ item: entity, index }) => {
      let selectionState: EntityRelationshipSelectionState = 'DEFAULT';

      if (selectedEntity1 || selectedEntity2) {
        if (entity.id === selectedEntity1?.id) {
          selectionState = 'RELATIONSHIP_OF';
        } else if (entity.id === selectedEntity2?.id) {
          selectionState = 'NEW_RELATIONSHIP_WITH';
        } else if (
          selectedEntity1?.id &&
          (entity.relatedEntities1.find(({ id }) => id === selectedEntity1.id) ??
            entity.relatedEntities2.find(({ id }) => id === selectedEntity1.id))
        ) {
          selectionState = 'RELATIONSHIP_WITH';
        } else {
          selectionState = 'UNSELECTED';
        }
      }

      return (
        <EntityRow
          selectionState={selectionState}
          entity={entity}
          index={index}
          onPress={onPress(entity)}
        />
      );
    },
    [onPress, selectedEntity1, selectedEntity2],
  );
};

export const useRenderEvent = () =>
  // onPress: (event: RecordOf<ImmutableEvent>) => () => void,
  // selectedEvent1?: RecordOf<ImmutableEvent>,
  // selectedEvent2?: RecordOf<ImmutableEvent>,
  {
    return useCallback<ListRenderItem<RecordOf<ImmutableEvent>>>(
      ({ item: event, index }) => {
        const selectionState: EventRelationshipSelectionState = 'DEFAULT';

        // if (selectedEvent1 || selectedEvent2) {
        //   if (event.id === selectedEvent1?.id) {
        //     selectionState = 'RELATIONSHIP_OF';
        //   } else if (event.id === selectedEvent2?.id) {
        //     selectionState = 'NEW_RELATIONSHIP_WITH';
        //   }
        //   // else if (
        //   //   selectedEvent1?.id &&
        //   //   (event.relatedEntities1.find(({ id }) => id === selectedEvent1.id) ??
        //   //     event.relatedEntities2.find(({ id }) => id === selectedEvent1.id))
        //   // ) {
        //   //   selectionState = 'RELATIONSHIP_WITH';
        //   // }
        //   else {
        //     selectionState = 'UNSELECTED';
        //   }
        // }

        return (
          <EventRow
            selectionState={selectionState}
            event={event}
            index={index}
            // onPress={onPress(event)}
          />
        );
      },
      [
        // onPress, selectedEvent1, selectedEvent2
      ],
    );
  };
