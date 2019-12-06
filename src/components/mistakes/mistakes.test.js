import React from 'react';
import renderer from 'react-test-renderer';

import Mistakes from './mistakes.jsx';


const mock = 7;

it(`Mistakes is rendered correctly`, () => {
  const mistakes = renderer
    .create(<Mistakes
      mistakes={mock}
    />)
    .toJSON();

  expect(mistakes).toMatchSnapshot();
});
