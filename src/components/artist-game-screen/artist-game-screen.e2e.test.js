import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistGameScreen from "./artist-game-screen.jsx";

Enzyme.configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `artist`,
    song: {
      src: ``,
      artist: `Jon Snow`,
    },
    answers: [
      {
        pic: `putin.jpg`,
        artist: `Mr Putin`,
      },
      {
        pic: `snow.jpg`,
        artist: `Jon Snow`,
      },
      {
        pic: `bin.jpg`,
        artist: `Mr. Bin`,
      },
    ],
  }
};

it(`The callback function onAnswer() was called with the correct parameters, when user clicked on the answer`, () => {
  const {song, answers} = mock.question;

  const onAnswer = jest.fn();

  const screen = shallow(<ArtistGameScreen
    onAnswer={onAnswer}
    song={song}
    answers={answers}
  />);

  const answerInputs = screen.find(`input`);

  answerInputs.at(0).simulate(`click`, onAnswer);
  answerInputs.at(1).simulate(`click`, onAnswer);
  answerInputs.at(2).simulate(`click`, onAnswer);

  expect(onAnswer).toHaveBeenCalledTimes(3);

  expect(onAnswer).toHaveBeenNthCalledWith(1, {
    pic: `putin.jpg`,
    artist: `Mr Putin`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(2, {
    pic: `snow.jpg`,
    artist: `Jon Snow`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(3, {
    pic: `bin.jpg`,
    artist: `Mr. Bin`,
  });
});
