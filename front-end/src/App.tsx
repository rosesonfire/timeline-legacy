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
  Actionsheet,
  useDisclose,
  Button,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import RelationshipModal from 'components/RelationshipModal';

import { useEntities, useRelationship, useRenderEntity } from './hooks';

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
  const { entity1, entity2, onPressEntity, addNewRelationship } = useRelationship();
  const {
    isOpen: isOpenActionSheet,
    onOpen: onOpenActionSheet,
    onClose: onCloseActionSheet,
  } = useDisclose();

  const {
    isOpen: isOpenRelationshipModal,
    onOpen: onOpenRelationshipModal,
    onClose: onCloseRelationshipModal,
  } = useDisclose();
  const renderEntity = useRenderEntity(onPressEntity, entity1, entity2);

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
            keyExtractor={(entity) => `${entity.id}`}
          ></FlatList>

          <Button onPress={onOpenActionSheet}>Show Actions</Button>

          {isFetching && <Spinner />}
        </VStack>

        <Fab
          renderInPortal={true}
          size="sm"
          color="green"
          style={{
            backgroundColor: 'green',
          }}
          onPress={addNewEntity}
          icon={<Icon as={Feather} name="plus" />}
        />

        <Actionsheet isOpen={isOpenActionSheet} onClose={onCloseActionSheet}>
          <Actionsheet.Content>
            {entity1 && entity2 && (
              <Actionsheet.Item onPress={onOpenRelationshipModal}>
                Add relationship
              </Actionsheet.Item>
            )}
          </Actionsheet.Content>
        </Actionsheet>
      </Center>

      <RelationshipModal
        isOpen={isOpenRelationshipModal}
        onClose={onCloseRelationshipModal}
        onSave={addNewRelationship}
      />
    </NativeBaseProvider>
  );
}
