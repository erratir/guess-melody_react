import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AudioPlayer from './audio-player';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/5/52/Anthem_of_Buryatia_%28Buryat_and_Russian_version%29.oga`,
};

describe(`AudioPlayer: Change state correctly when click on the button (play/pause):`, () => {
  let player;
  let button;
  let buttonClickHandler;
  let isPlaying = false;
  const event = {preventDefault: () => {}};

  beforeEach(() => {

    buttonClickHandler = jest.fn();

    player = mount(
        <AudioPlayer
          isLoading = {false}
          renderAudio = {jest.fn()}
          isPlaying={isPlaying}
          onPlayButtonClick={buttonClickHandler}
          src={mock.src}
        />
    );

    button = player.find(`.track__button`);

  });

  describe(`before click on button`, () => {
    it(`handler shouldn't be called`, () => {
      expect(buttonClickHandler).toBeCalledTimes(0);
    });
  });

  describe(`click on button`, () => {
    beforeEach(() => {
      button.simulate(`click`, event);
    });

    it(`handler should be called once`, () => {
      expect(buttonClickHandler).toBeCalledTimes(1);
    });

    describe(`click on button again`, () => {
      beforeEach(() => {
        button.simulate(`click`, event);
      });
      it(`handler should be called twice`, () => {
        expect(buttonClickHandler).toBeCalledTimes(2);
      });
    });
  });

});
