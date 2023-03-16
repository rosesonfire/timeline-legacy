import { EntityToEntityRelationshipPostFields } from 'api/relationship/types';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formValue: EntityToEntityRelationshipPostFields) => void;
}
