import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GenreGameScreen from "./genre-game-screen.jsx";
import withUserAnswer from '../../hocs/with-user-answer/with-user-answer';


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
      onChange = {jest.fn()}
      userAnswer={[]}
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

  it(`Rendered checkboxes are synchronized with prop "userAnswer"`, () => {
    const GenreGameScreenWrapped = withUserAnswer(GenreGameScreen);
    const {question} = mock;
    const onAnswer = jest.fn();

    const genreGameScreen = shallow(<GenreGameScreenWrapped
      activePlayer = {-1}
      answers={question.answers}
      onPlayButtonClick = {jest.fn()}
      onAnswer={onAnswer}
      question={question}
    />);

    const render = genreGameScreen.dive();
    const inputs = render.find(`input`);

    inputs.at(0).simulate(`change`);
    expect(genreGameScreen.prop(`userAnswer`)).toEqual([true, false, false, false]);

    inputs.at(0).simulate(`change`);
    expect(genreGameScreen.prop(`userAnswer`)).toEqual([false, false, false, false]);

    inputs.at(2).simulate(`change`);
    expect(genreGameScreen.prop(`userAnswer`)).toEqual([false, false, true, false]);
  });

  it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
    const {question} = mock;
    const onAnswer = jest.fn();
    const onChange = jest.fn();
    const onPlayButtonClick = jest.fn();
    const userAnswer = [false, true, false, false];

    const genreQuestion = shallow(<GenreGameScreen
      activePlayer = {-1}
      onAnswer={onAnswer}
      onChange={onChange}
      onPlayButtonClick={onPlayButtonClick}
      question={question}
      userAnswer={userAnswer}
    />);

    const form = genreQuestion.find(`form`);
    const inputTwo = genreQuestion.find(`input`).at(1);
    inputTwo.simulate(`change`);
    form.simulate(`submit`, {preventDefault() {}});

    expect(genreQuestion.find(`input`).map((it) => it.prop(`checked`))).toEqual(userAnswer);
    expect(onAnswer).toHaveBeenCalledTimes(1);
  });

});
