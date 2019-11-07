import React from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import PropTypes from "prop-types";

const App = (props) => {
  const {maxTime, maxMistakes} = props;
  return <WelcomeScreen maxTime={maxTime} maxMistakes={maxMistakes} />;
};

App.propTypes = {
  maxTime: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
};


export default App;
