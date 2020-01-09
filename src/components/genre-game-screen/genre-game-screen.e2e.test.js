import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GenreGameScreen from "./genre-game-screen.jsx";


Enzyme.configure({adapter: new Adapter()});

const mock = {
  question:
    {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: ``,
          genre: `jazz`,
        },
        {
          src: ``,
          genre: `pop`,
        },
        {
          src: ``,
          genre: `rock`,
        },
        {
          src: ``,
          genre: `jazz`,
        },
      ],
    },
};

describe(`GenreGameScreen`, () => {

  it(`The form is not sent, when user answer`, () => {
    const {question} = mock;
    const onAnswer = jest.fn();

    const genreGameScreen = shallow(<GenreGameScreen
      activePlayer = {-1}
      onPlayButtonClick = {jest.fn()}
      onAnswer={onAnswer}
      question={question}
    />);

    const form = genreGameScreen.find(`form`);
    const formPreventDefault = jest.fn();

    form.simulate(`submit`, {
      preventDefault: formPreventDefault,
    });

    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(formPreventDefault).toHaveBeenCalledTimes(1);
  });

  it(`Rendered checkboxes are synchronized with state`, () => {
    const {question} = mock;
    const onAnswer = jest.fn();

    const genreGameScreen = shallow(<GenreGameScreen
      activePlayer = {-1}
      onPlayButtonClick = {jest.fn()}
      onAnswer={onAnswer}
      question={question}
    />);

    expect(genreGameScreen.state(`userAnswer`)).toEqual([false, false, false, false]);

    const inputs = genreGameScreen.find(`input`);

    inputs.at(0).simulate(`change`);
    expect(genreGameScreen.state(`userAnswer`)).toEqual([true, false, false, false]);

    inputs.at(0).simulate(`change`);
    expect(genreGameScreen.state(`userAnswer`)).toEqual([false, false, false, false]);

    inputs.at(2).simulate(`change`);
    expect(genreGameScreen.state(`userAnswer`)).toEqual([false, false, true, false]);
  });

});
