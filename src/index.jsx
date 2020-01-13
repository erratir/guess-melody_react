import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./reducer.js";
import App from "./components/app/app.jsx";
import {maxTime, maxMistakes, questions} from "./mocks/game.js";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const AppWrapped = withScreenSwitch(App);

const init = (gameQuestions) => {
  ReactDOM.render(<Provider store={store}><AppWrapped
    maxTime={maxTime}
    maxMistakes={maxMistakes}
    questions = {gameQuestions}
  />
  </Provider>,
  document.querySelector(`.main`)
  );
};

init(questions);
