import React from 'react';
import renderer from 'react-test-renderer';

import '@common/mocks';

import App from '../App';

describe('App', () => {
  it('should match snapshot', () => {
    const actual = renderer.create(<App />);

    expect(actual).toMatchSnapshot();
  });
});
