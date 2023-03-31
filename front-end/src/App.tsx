import React from 'react';
import {
  Center,
  NativeBaseProvider,
  extendTheme,
  FlatList,
  Spinner,
  Icon,
  useDisclose,
  Menu,
  Divider,
  Pressable,
  HamburgerIcon as MenuIcon,
  HStack,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

import { useEvents, useRenderEvent, useEventToEntityRelationship } from './hooks';

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
  // const { entities, addNewEntity, getMoreEntities, isFetching, removeAllEntities } = useEntities();
  const { events, addNewEvent, getMoreEvents, isFetching, removeAllEvents } = useEvents();
  // const { entity1, entity2, onPressEntity, addNewRelationship } = useRelationship();
  const eventToEntityRelationship = useEventToEntityRelationship();
  // const {
  //   isOpen: isOpenActionSheet,
  //   onOpen: onOpenActionSheet,
  //   onClose: onCloseActionSheet,
  // } = useDisclose();

  const { isOpen: isOpenMenu, onOpen: onOpenMenu, onClose: onCloseMenu } = useDisclose();

  // const {
  //   isOpen: isOpenRelationshipModal,
  //   onOpen: onOpenRelationshipModal,
  //   onClose: onCloseRelationshipModal,
  // } = useDisclose();
  // const renderEntity = useRenderEntity(onPressEntity, entity1, entity2);
  const renderEvent = useRenderEvent(eventToEntityRelationship.onPressEvent);

  return (
    <NativeBaseProvider>
      <Center
        _dark={{ bg: 'blueGray.900' }}
        _light={{ bg: 'blueGray.50' }}
        px={4}
        flex={1}
        safeArea
        marginTop="50px"
      >
        <HStack justifyContent="space-between" alignItems="center" bg="blue.100">
          <HStack flex={1}>
            <Menu
              isOpen={isOpenMenu}
              onClose={onCloseMenu}
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                    onPress={onOpenMenu}
                  >
                    <MenuIcon size="48px" />
                  </Pressable>
                );
              }}
            >
              <Menu.Item>Create new entity</Menu.Item>
              <Menu.Item>Create new event</Menu.Item>
              <Divider></Divider>
              {eventToEntityRelationship.event && <Menu.Item>Associate entity</Menu.Item>}
            </Menu>
          </HStack>

          <HStack space="48px">
            <Pressable
              onPress={removeAllEvents}
              color="red"
              style={{
                backgroundColor: 'red',
              }}
            >
              <Icon size="48px" as={Feather} name="minus" />
            </Pressable>

            <Pressable
              onPress={addNewEvent}
              color="green"
              style={{
                backgroundColor: 'green',
              }}
            >
              <Icon size="48px" as={Feather} name="plus" />
            </Pressable>
          </HStack>
        </HStack>

        {/* <FlatList
            data={entities}
            renderItem={renderEntity}
            onEndReachedThreshold={0.2}
            onEndReached={getMoreEntities}
            keyExtractor={(entity) => `${entity.id}`}
          ></FlatList> */}

        <FlatList
          data={events}
          renderItem={renderEvent}
          onEndReachedThreshold={0.2}
          onEndReached={getMoreEvents}
          keyExtractor={(event) => `${event.id}`}
        ></FlatList>

        {/* <Button onPress={onOpenActionSheet}>Show Actions</Button> */}

        {isFetching && <Spinner />}

        {/* <Actionsheet isOpen={isOpenActionSheet} onClose={onCloseActionSheet}> */}
        {/* <Actionsheet.Content> */}
        {/* {entity1 && entity2 && (
              <Actionsheet.Item onPress={onOpenRelationshipModal}>
                Add relationship
              </Actionsheet.Item>
            )} */}
        {/* </Actionsheet.Content> */}
        {/* </Actionsheet> */}
      </Center>

      {/* {entity1 && entity2 && (
        <RelationshipModal
          isOpen={isOpenRelationshipModal}
          onClose={onCloseRelationshipModal}
          onSave={addNewRelationship}
          relationshipOf={entity1}
          relationshipWith={entity2}
        />
      )} */}
    </NativeBaseProvider>
  );
}
