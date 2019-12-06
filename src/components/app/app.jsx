import React, {Component} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistGameScreen from "../artist-game-screen/artist-game-screen.jsx";
import GenreGameScreen from "../genre-game-screen/genre-game-screen.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";


class App extends Component {

  render() {
    const {questions, step} = this.props;

    return this._getScreen(questions[step]);
  }

  _getScreen(question) {
    const {onUserAnswer, mistakes, maxMistakes, onWelcomeScreenClick, maxTime} = this.props;

    if (!question) {
      return <WelcomeScreen
        maxTime={maxTime}
        maxMistakes={maxMistakes}
        onClick={onWelcomeScreenClick}
      />;
    }

    const onAnswer = (userAnswer) => onUserAnswer(question, userAnswer, mistakes, maxMistakes);

    switch (question.type) {
      case `genre`: return <GenreGameScreen
        question = {question}
        onAnswer = {onAnswer}/>;
      case `artist`: return <ArtistGameScreen
        song = {question.song}
        answers = {question.answers}
        onAnswer = {onAnswer}/>;
    }

    return null;
  }
}

App.propTypes = {
  maxTime: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => {
  return {

    onWelcomeScreenClick: () => dispatch(ActionCreator[`INCREMENT_STEP`]()),

    onUserAnswer: (question, userAnswer, mistakes, maxMistakes) => {
      dispatch(ActionCreator[`INCREMENT_STEP`]());
      dispatch(ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer, mistakes, maxMistakes));
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
