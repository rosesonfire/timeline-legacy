import React, { useEffect, useState } from 'react';
import {
  Text,
  Link,
  HStack,
  Center,
  ScrollView,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
} from 'native-base';

import { createEntity, getEntities } from 'api/entity';

import NativeBaseIcon from 'components/NativeBaseIcon';

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
  const [response, setResponse] = useState('');

  useEffect(() => {
    createEntity({
      name: 'some name',
    });

    getEntities()
      .then((res) => {
        setResponse(JSON.stringify(res.data));
      })
      .catch((error) => {
        setResponse(JSON.stringify(error, null, 2));
      });
  }, []);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center _dark={{ bg: 'blueGray.900' }} _light={{ bg: 'blueGray.50' }} px={4} flex={1}>
          <VStack space={5} alignItems="center">
            <NativeBaseIcon />
            <Heading size="lg">Welcome to NativeBase</Heading>
            <Heading size="md">{response}</Heading>
            <HStack space={2} alignItems="center">
              <Text>Edit</Text>
              <Box
                _web={{
                  _text: {
                    fontFamily: 'monospace',
                    fontSize: 'sm',
                  },
                }}
                px={2}
                py={1}
                _dark={{ bg: 'blueGray.800' }}
                _light={{ bg: 'blueGray.200' }}
              >
                App.js
              </Box>
              <Text>and save to reload.</Text>
            </HStack>
            <Link href="https://docs.nativebase.io" isExternal>
              <Text color="primary.500" underline fontSize={'xl'}>
                Learn NativeBase
              </Text>
            </Link>
            <ToggleDarkMode />
          </VStack>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === 'light'}
        onToggle={toggleColorMode}
        aria-label={colorMode === 'light' ? 'switch to dark mode' : 'switch to light mode'}
      />
      <Text>Light</Text>
    </HStack>
  );
}
