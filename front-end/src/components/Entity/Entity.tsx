import { FC } from 'react';
import { Button, Flex, Box, Divider } from 'native-base';

import { Props } from './types';

const Entity: FC<Props> = (props) => {
  const { entity, index } = props;
  const isEven = index % 2 === 0;

  return (
    <Flex direction="row" alignItems="center">
      <Button
        marginTop="-3"
        marginBottom="-3"
        style={
          isEven && {
            opacity: 0,
          }
        }
      >
        {entity.id} {entity.name}
      </Button>

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

      <Button
        marginTop="-3"
        marginBottom="-3"
        style={
          !isEven && {
            opacity: 0,
          }
        }
      >
        {entity.id} {entity.name}
      </Button>

      {/* {
        <>
          <Box width="10">
            <Divider orientation="horizontal" />
          </Box>

          <Divider orientation="vertical" />
        </>
      } */}
    </Flex>
  );
};

export default Entity;
