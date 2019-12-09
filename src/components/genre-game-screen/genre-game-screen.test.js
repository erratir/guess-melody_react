import React from "react";
import renderer from "react-test-renderer";
import GenreGameScreen from "./genre-game-screen";

const mock = {
  genre: `rock`,
  answers: [
    {
      src: ``,
      genre: `rock`
    },
    {
      src: ``,
      genre: `pop`
    },
    {
      src: ``,
      genre: `jazz`
    },
    {
      src: ``,
      genre: `rock`
    }
  ]
};

it(`GenreGameScreen is rendered correctly`, () => {

  const createNodeMock = (element) => {
    if (element.type === `audio`) {
      return {
        src: ``
      };
    }
    return null;
  };

  const tree = renderer.create(<GenreGameScreen
    onAnswer = {jest.fn()}
    question = {mock}/>, {createNodeMock}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

