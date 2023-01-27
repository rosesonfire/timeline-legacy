import { useCallback, useEffect, useMemo, useState } from 'react';
import { List, RecordOf } from 'immutable';
import { ListRenderItem } from 'react-native';

import EntityElement from 'components/Entity';

import { createEntity, deleteAllEntities, getEntities } from 'api/entity';

import { Entity } from 'api/entity/types';

import { DEFAULT_PAGE_SIZE } from './constants';

export const useEntities = () => {
  const [offset, setOffset] = useState(0);
  const [entities, setEntities] = useState<List<RecordOf<Entity>>>(List([]));
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
    await createEntity({
      name: 'some name',
    });

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

export const useRenderEntity = () => {
  return useCallback<ListRenderItem<Entity>>(({ item: entity, index }) => {
    return <EntityElement entity={entity} index={index} />;
  }, []);
};
