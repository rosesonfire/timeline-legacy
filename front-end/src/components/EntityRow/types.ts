import { RecordOf } from 'immutable';

import { ImmutableEntity } from 'api/entity/types';
import { EntityRelationshipSelectionState } from 'components/_shared/types';

export interface Props {
  entity: RecordOf<ImmutableEntity>;
  index: number;
  onPress: () => void;
  selectionState: EntityRelationshipSelectionState;
}
