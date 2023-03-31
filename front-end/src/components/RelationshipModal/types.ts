import { RecordOf } from 'immutable';

import { ImmutableEntity } from 'api/entity/types';
import { EntityToEntityRelationshipPostFields } from 'api/entityToEntityRelationship/types';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formValue: EntityToEntityRelationshipPostFields) => void;
  relationshipOf: RecordOf<ImmutableEntity>;
  relationshipWith: RecordOf<ImmutableEntity>;
}
