import { FC, useState } from 'react';
import { Button, FormControl, Input, Modal } from 'native-base';

import { EntityToEntityRelationshipPostFields } from 'api/relationship/types';

import { useHandleSave } from './hooks';

import { Props } from './types';

const RelationshipModal: FC<Props> = (props) => {
  const { isOpen, onClose, onSave } = props;

  const [formData, setFormData] = useState<EntityToEntityRelationshipPostFields>({
    type: '',
  });

  const handleSave = useHandleSave(onSave, formData);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />

        <Modal.Header>Create new Relationship</Modal.Header>

        <Modal.Body>
          <FormControl>
            <FormControl.Label>Type</FormControl.Label>

            <Input
              onChangeText={(value) => {
                setFormData((formData) => ({ ...formData, type: value }));
              }}
            />
          </FormControl>
        </Modal.Body>

        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>

            <Button onPress={handleSave}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default RelationshipModal;
