import React from "react";
import {withScreenSwitch} from "./with-screen-switch";
import Enzyme, {mount} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

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
    },
  ],
};
const mockProps = {
  maxTime: 5,
  maxMistakes: 3,
  mistakes: 1,
  step: -1,
  onUserAnswer: jest.fn(),
  onWelcomeScreenClick: jest.fn(),
  resetGame: jest.fn(),
};
const {questions} = mock;

const MockComponent = () => <div/>;
const MockComponentWrapped = withScreenSwitch(MockComponent);

const wrapper = mount(<MockComponentWrapped
  {...mockProps}
  questions={questions}
/>);

describe(`Should render correctly screen`, () => {

  it(`welcome screen`, () => {

    expect(wrapper.instance()._getScreen(null).type.name).toEqual(`WelcomeScreen`);

  });

  it(`genre screen`, () => {

    expect(wrapper.instance()._getScreen(questions[0]).props.gameType).toEqual(`genre`);

  });

  it(`artist screen`, () => {

    expect(wrapper.instance()._getScreen(questions[1]).props.gameType).toEqual(`artist`);

  });
});
