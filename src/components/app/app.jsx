import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import {maxTime, maxMistakes} from "../../mocks/game.js";

const App = () => {

  return <WelcomeScreen maxTime={maxTime} maxMistakes={maxMistakes} />;
};

export default App;
