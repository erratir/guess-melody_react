import React from "react";
import renderer from "react-test-renderer";
import ArtistGameScreen from "./artist-game-screen";

const mock = {
  type: `artist`,
  song: {
    src: ``,
    artist: `Jon Snow`,
  },
  answers: [
    {
      pic: ``,
      artist: `Mr Putin`,
    },
    {
      pic: ``,
      artist: `Jon Snow`,
    },
    {
      pic: ``,
      artist: `Mr. Bim`,
    },
  ],
};

it(`ArtistGameScreen is rendered correctly`, () => {
  const {song, answers} = mock;

  const createNodeMock = (element) => {
    if (element.type === `audio`) {
      return {
        src: ``
      };
    }
    return null;
  };

  const tree = renderer.create(<ArtistGameScreen
    renderPlayer = {jest.fn()}
    onAnswer = {jest.fn()}
    song={song}
    answers={answers}/>, {createNodeMock}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
