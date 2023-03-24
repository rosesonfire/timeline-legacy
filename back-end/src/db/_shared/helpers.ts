import { Op, FindOptions, Attributes, Model } from 'sequelize';
import { RecordOf } from 'immutable';

import { DM, Pagination, Sorting } from 'domainModels/types';

export const getFilterLogic = <
  T extends DM,
  ModelAttrs extends T,
  ModelCreationAttrs extends Omit<T, 'id'>,
  M extends Model<ModelAttrs, ModelCreationAttrs>,
>({
  name,
  sorting,
  pagination,
}: {
  name?: string;
  sorting?: RecordOf<Sorting<T>>;
  pagination?: RecordOf<Pagination>;
}): FindOptions<Attributes<M>> => {
  return {
    //@ts-ignore
    where: {
      name: {
        [Op.like]: name ? `%${name}%` : '%',
      },
    },
    offset: pagination?.offset,
    limit: pagination?.pageSize,
    order: sorting ? [[sorting.sortBy, sorting.order]] : undefined,
    include: {
      all: true,
    } as {
      all: true;
    },
  };
};
