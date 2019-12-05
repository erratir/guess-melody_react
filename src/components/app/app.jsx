import React, {Component} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistGameScreen from "../artist-game-screen/artist-game-screen.jsx";
import GenreGameScreen from "../genre-game-screen/genre-game-screen.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";


class App extends Component {

  render() {
    const {questions, step, onUserAnswer} = this.props;

    return this._getScreen(questions[step], onUserAnswer);
  }

  _getScreen(question, onAnswer) {
    if (!question) {
      const {maxTime, maxMistakes, onWelcomeScreenClick} = this.props;
      return <WelcomeScreen
        maxTime={maxTime}
        maxMistakes={maxMistakes}
        onClick={onWelcomeScreenClick}
      />;
    }
    switch (question.type) {
      case `genre`: return <GenreGameScreen
        answers = {question.answers}
        genre ={question.genre}
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

    onWelcomeScreenClick: () => dispatch({
      type: `INCREMENT_STEP`,
      payload: 1,
    }),

    onUserAnswer: () => {
      dispatch({
        type: `INCREMENT_STEP`,
        payload: 1,
      });
      // todo: тут dispatch c Action для проверки ответа пользователя и соответсвенно изменение mistakes в state Redux
    }
  };
};

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
