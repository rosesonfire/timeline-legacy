import { useEffect, useState } from 'react';

import { createEntity, getEntities } from 'api/entity';

export const useEntities = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    createEntity({
      name: 'some name',
    });

    getEntities()
      .then((res) => {
        setResponse(JSON.stringify(res.data));
      })
      .catch((error) => {
        setResponse(JSON.stringify(error, null, 2));
      });
  }, []);

  return {
    response,
  };
};
