import React from 'react';
import renderer from 'react-test-renderer';

import 'common/mocks/index.mock.test';

import App from '../App';

jest.mock('../hooks', () => ({
  useEntities: jest.fn(() => ({
    response: 'response',
  })),
}));

describe('App', () => {
  it('should match snapshot', () => {
    const actual = renderer.create(<App />);

    expect(actual).toMatchSnapshot();
  });
});
