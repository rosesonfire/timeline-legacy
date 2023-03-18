import { Op } from 'sequelize';
import { Pagination } from 'domainModels/types';

export const getFilterLogic = ({
  name,
  pagination,
}: {
  name?: string;
  pagination?: Pagination;
}) => {
  return {
    where: {
      name: {
        [Op.like]: name ? `%${name}%` : '%',
      },
    },
    offset: pagination?.offset,
    limit: pagination?.pageSize,
    include: {
      all: true,
    } as {
      all: true;
    },
  };
};
