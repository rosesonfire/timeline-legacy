import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'native-base';
import moment from 'moment';

import { Props } from './types';

const Event: FC<Props> = (props) => {
  const { event, selectionState, onPress } = props;

  const style: StyleProp<ViewStyle> = {};

  if (selectionState === 'RELATIONSHIP_OF') {
    style.backgroundColor = 'red';
  }

  if (selectionState === 'RELATIONSHIP_WITH') {
    style.backgroundColor = 'orange';
  }

  if (selectionState === 'UNSELECTED') {
    style.opacity = 0.1;
  }

  return (
    <Button marginTop="-3" marginBottom="-3" style={style} onPress={onPress}>
      {event.id} {event.name} {moment(event.startedAt).format('YYYY')} {event.endedAt}
    </Button>
  );
};

export default Event;
