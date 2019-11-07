import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`App correctly renders`, () => {
  const tree = renderer
    .create(
        <App
          maxTime={995}
          maxMistakes={133}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
