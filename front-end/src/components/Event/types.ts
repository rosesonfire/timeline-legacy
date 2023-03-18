import { RecordOf } from 'immutable';

import { ImmutableEvent } from 'api/event/types';
import { EventRelationshipSelectionState } from 'components/_shared/types';

export interface Props {
  event: RecordOf<ImmutableEvent>;
  // onPress: () => void;
  selectionState: EventRelationshipSelectionState;
}
