import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";

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
    {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `muzlo.mp3`,
      },
      answers: [
        {
          pic: `avatar.jpg`,
          artist: `John Snow`,
        },
        {
          pic: `avatar.jpg`,
          artist: `Jack Daniels`,
        },
        {
          pic: `avatar.jpg`,
          artist: `Jim Beam`,
        },
      ],
    }
  ],
};

describe(`App correctly renders`, () => {

  const {questions} = mock;

  it(`welcome screen`, () => {

    const app = renderer.create(<App
      maxTime={995}
      maxMistakes={133}
      questions ={questions}
      mistakes={1}
      step={-1}
      onUserAnswer={jest.fn()}
      onWelcomeScreenClick={jest.fn()}
    />).toJSON();

    expect(app).toMatchSnapshot();
  });

  it(`genre screen`, () => {

    const app = renderer.create(<App
      maxTime={995}
      maxMistakes={133}
      questions ={questions}
      mistakes={1}
      step={0}
      onUserAnswer={jest.fn()}
      onWelcomeScreenClick={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(app).toMatchSnapshot();
  });

  it(`artist screen`, () => {

    const app = renderer.create(<App
      maxTime={995}
      maxMistakes={133}
      questions ={questions}
      mistakes={1}
      step={1}
      onUserAnswer={jest.fn()}
      onWelcomeScreenClick={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(app).toMatchSnapshot();
  });
});
