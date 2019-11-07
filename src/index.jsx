import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {maxTime, maxMistakes} from "./mocks/game.js";

const init = () => {
  ReactDOM.render(
      <App maxTime={maxTime} maxMistakes={maxMistakes}/>,
      document.querySelector(`.main`)
  );
};

init();
