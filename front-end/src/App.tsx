import React from 'react';
import {
  Center,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Fab,
  FlatList,
  Spinner,
  Icon,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { useEntities, useRenderEntity } from './hooks';

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  const { entities, addNewEntity, getMoreEntities, isFetching, removeAllEntities } = useEntities();
  const renderEntity = useRenderEntity();

  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'blueGray.50' }}
        px={4}
        flex={1}
        safeArea
      >
        <VStack space={5} alignItems="center">
          <Fab
            renderInPortal={false}
            size="sm"
            onPress={removeAllEntities}
            color="red"
            style={{
              backgroundColor: 'red',
            }}
            icon={<Icon as={Feather} name="minus" />}
          />

          <FlatList
            data={entities}
            renderItem={renderEntity}
            onEndReachedThreshold={0.2}
            onEndReached={getMoreEntities}
          ></FlatList>

          {isFetching && <Spinner />}
        </VStack>

        <Fab
          renderInPortal={true}
          size="sm"
          onPress={addNewEntity}
          icon={<Icon as={Feather} name="plus" />}
        />
      </Center>
    </NativeBaseProvider>
  );
}
