import { FC } from 'react';
import { Flex, Box, Divider } from 'native-base';

import Entity from 'components/Entity/Entity';

import { Props } from './types';

const EntityRow: FC<Props> = (props) => {
  const { entity, index, onPress, selectionState } = props;
  const isEven = index % 2 === 0;

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent={isEven ? 'flex-end' : 'flex-start'}
      width={259.5}
    >
      {!isEven && <Entity selectionState={selectionState} entity={entity} onPress={onPress} />}

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

      {isEven && <Entity selectionState={selectionState} entity={entity} onPress={onPress} />}
    </Flex>
  );
};

export default EntityRow;
