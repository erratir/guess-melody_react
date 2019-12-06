import React, {Component} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistGameScreen from "../artist-game-screen/artist-game-screen.jsx";
import GenreGameScreen from "../genre-game-screen/genre-game-screen.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer";
import HeaderWrapper from "../header-wrapper/header-wrapper.jsx";


class App extends Component {

  /**
   * Render app screen
   * @return {*}
   */
  render() {
    const {questions, step} = this.props;

    return this._getScreen(questions[step]);
  }

  /**
   * Check what screen should be rendered
   * @param {Object} question
   * @return {*}
   * @private
   */
  _getScreen(question) {
    const {onUserAnswer, mistakes, maxMistakes, onWelcomeScreenClick, maxTime} = this.props;

    /* если нет вопроса, рендерим вэлком скрин */
    if (!question) {
      return <WelcomeScreen
        maxTime={maxTime}
        maxMistakes={maxMistakes}
        onClick={onWelcomeScreenClick}
      />;
    }

    /* иначе рендерим хеадер-обертку и в нем экран с игрой*/
    const onAnswer = (userAnswer) => onUserAnswer(question, userAnswer, mistakes, maxMistakes);

    return <HeaderWrapper
      game={this._getGameScreen(question, onAnswer)}
      gameType={question.type}
      mistakes={mistakes}
    />;
  }

  /**
   * Check what type of game should be rendered
   * @param {Object} question
   * @param {Function} onAnswer
   * @return {*}
   * @private
   */
  _getGameScreen(question, onAnswer) {
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
