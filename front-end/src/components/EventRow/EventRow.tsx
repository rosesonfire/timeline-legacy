import { FC } from 'react';
import { Flex, Box, Divider } from 'native-base';

import Event from 'components/Event/Event';

import { Props } from './types';

const EventRow: FC<Props> = (props) => {
  const { event, index, selectionState } = props;
  const isEven = index % 2 === 0;

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent={isEven ? 'flex-end' : 'flex-start'}
      width={259.5}
    >
      {!isEven && <Event selectionState={selectionState} event={event} />}

      {
        <>
          <Box
            width="10"
            style={
              isEven && {
                opacity: 0,
              }
            }
          >
            <Divider orientation="horizontal" />
          </Box>

          <Divider orientation="vertical" />

          <Box
            width="10"
            style={
              !isEven && {
                opacity: 0,
              }
            }
          >
            <Divider orientation="horizontal" />
          </Box>
        </>
      }

      {isEven && <Event selectionState={selectionState} event={event} />}
    </Flex>
  );
};

export default EventRow;
