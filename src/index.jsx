import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import {maxTime, maxMistakes, questions} from "./mocks/game.js";

const init = (gameQuestions) => {
  ReactDOM.render(<App
      maxTime={maxTime}
      maxMistakes={maxMistakes}
      questions = {gameQuestions}
    />,
    document.querySelector(`.main`),
  );
};

init(questions);
