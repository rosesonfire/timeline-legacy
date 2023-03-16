import { Entity } from 'api/entity/types';
import { EntityRelationshipSelectionState } from 'components/_shared/types';

export interface Props {
  entity: Entity;
  index: number;
  onPress: () => void;
  selectionState: EntityRelationshipSelectionState;
}
