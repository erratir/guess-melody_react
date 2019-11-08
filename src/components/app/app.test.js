import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const mock = {
  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          src: ``,
          genre: `jaz`,
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
          genre: `jaz`,
        },
      ],
    },
  ],
};

it(`App correctly renders`, () => {

  const {questions} = mock;

  const tree = renderer
    .create(
        <App
          maxTime={995}
          maxMistakes={133}
          questions ={questions}
        />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
