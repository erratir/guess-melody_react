import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from "./app";

Enzyme.configure({adapter: new Adapter()});

const mock = {
  questions: [
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
  ],
};

it(`On click on WelcomeScreen App switches to the first Game`, () => {
  const {questions} = mock;

  const app = mount(<App
    maxMistakes={0}
    maxTime={0}
    questions ={questions}
  />);

  const button = app.find(`.welcome__button`);
  expect(button).toHaveLength(1);

  button.simulate(`click`);
  app.update();

  // Клик по батанну внутри WelcomScreen действительно двигает state вперед
  expect(app.state(`currentGameCount`)).toEqual(0);

  // после клика по кнопке welcome__button у нас должен появится GenreGameScreen, а у него есть <h2 className="game__title"></h2>
  const title = app.find(`.game__title`);
  expect(title).toHaveLength(1); // проверем что есть такой
  expect(title.text().indexOf(`rock`)).toBeGreaterThanOrEqual(0); // indexOf(`rock`) вернет индекс первого вхождения в строке или -1 если не найдет

});


