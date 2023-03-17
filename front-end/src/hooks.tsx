import { useCallback, useEffect, useMemo, useState } from 'react';
import { List, Record, RecordOf } from 'immutable';
import { ListRenderItem } from 'react-native';

import EntityRow from 'components/EntityRow';

import { createEntity, deleteAllEntities, getEntities } from 'api/entity';
import { createEntityToEntityRelationship } from 'api/relationship';

import { ImmutableEntity } from 'api/entity/types';
import { EntityToEntityRelationshipPostFields } from 'api/relationship/types';
import { EntityRelationshipSelectionState } from 'components/_shared/types';

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
