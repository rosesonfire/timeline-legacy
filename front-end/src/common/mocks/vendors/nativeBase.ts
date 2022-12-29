jest.mock('native-base', () => ({
  Text: 'Text',
  Link: 'Link',
  HStack: 'HStack',
  Center: 'Center',
  ScrollView: 'ScrollView',
  Heading: 'Heading',
  Switch: 'Switch',
  useColorMode: jest.fn(() => ({ colorMode: 'light', toggleColorMode: jest.fn() })),
  NativeBaseProvider: 'NativeBaseProvider3',
  extendTheme: jest.fn(),
  VStack: 'VStack',
  Box: 'Box',
}));
