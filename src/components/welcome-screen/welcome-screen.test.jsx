import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen.jsx";

it(`WelcomeScreen correctly renders`, () => {
  const tree = renderer
    .create(
        <WelcomeScreen
          maxTime={99}
          maxMistakes={33}
          onAnswer={jest.fn()}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
