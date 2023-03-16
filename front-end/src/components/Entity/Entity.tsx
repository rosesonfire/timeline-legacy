import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'native-base';

import { Props } from './types';

const Entity: FC<Props> = (props) => {
  const { entity, onPress, selectionState } = props;

  const style: StyleProp<ViewStyle> = {};

  if (selectionState === 'RELATIONSHIP_OF') {
    style.backgroundColor = 'red';
  }

  if (selectionState === 'UNSELECTED') {
    style.opacity = 0.1;
  }

  return (
    <Button marginTop="-3" marginBottom="-3" style={style} onPress={onPress}>
      {entity.id} {entity.name}
    </Button>
  );
};

export default Entity;
