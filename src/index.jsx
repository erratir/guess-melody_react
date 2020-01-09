import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import App from "./components/app/app.jsx";
import {maxTime, maxMistakes, questions} from "./mocks/game.js";

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const init = (gameQuestions) => {
  ReactDOM.render(<Provider store={store}><App
    maxTime={maxTime}
    maxMistakes={maxMistakes}
    questions = {gameQuestions}
  />
  </Provider>,
  document.querySelector(`.main`)
  );
};

init(questions);
