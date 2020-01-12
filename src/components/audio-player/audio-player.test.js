import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player';


const mock = {
  isPlaying: false,
  onPlayButtonClick: jest.fn(),
  src: ``,
};

it(`AudioPlayer correctly renders`, () => {
  const createNodeMock = (element) => {
    if (element.type === `audio`) {
      return {
        src: ``
      };
    }
    return null;
  };

  const player = renderer
    .create(<AudioPlayer
      isLoading={true}
      renderAudio={jest.fn()}
      isPlaying={mock.isPlaying}
      onPlayButtonClick={mock.onPlayButtonClick}
      src={mock.src}
    />, {createNodeMock})
    .toJSON();

  expect(player).toMatchSnapshot();
});
