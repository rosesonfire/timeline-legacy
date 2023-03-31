import { useCallback } from 'react';
import { PressableProps } from 'react-native';

import { EntityToEntityRelationshipPostFields } from 'api/entityToEntityRelationship/types';

import { Props } from './types';

export const useHandleSave = (
  onSave: Props['onSave'],
  formData: EntityToEntityRelationshipPostFields,
) => {
  return useCallback<NonNullable<PressableProps['onPress']>>(
    (e) => {
      e.stopPropagation();

      onSave(formData);
    },
    [onSave, formData],
  );
};
