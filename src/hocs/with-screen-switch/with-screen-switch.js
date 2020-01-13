import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "recompose";

import ArtistGameScreen from "../../components/artist-game-screen/artist-game-screen.jsx";
import GenreGameScreen from "../../components/genre-game-screen/genre-game-screen.jsx";
import WelcomeScreen from "../../components/welcome-screen/welcome-screen.jsx";
import HeaderWrapper from "../../components/header-wrapper/header-wrapper.jsx";

import withActivePlayer from "../with-active-player/with-active-player";
import withTransformProps from "../with-transform-props/with-transform-props";
import withUserAnswer from "../with-user-answer/with-user-answer";
import {ActionCreator} from "../../reducer";


/**
 * Transform old props to the new (for GenreGameScreen)
 * Эту ф-ю далее передаем в HOC withTransformProps
 * withTransformProps(transformPlayerToAnswer) - вернет HOC, который вернет переданный в него компонент с новыми пропсами
 * @param {any} props
 * @return {any}
 */
const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};

/**
 * Transform old props to the new (for ArtistGameScreen)
 * @param {any} props
 * @return {any}
 */
const transformPlayerToQuestion = (props) => {
  const newProps = Object.assign({}, props, {
    renderQuestion: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};

/* декорируем GenreGameScreen дважды (оборачиваем 2мя HOC'ами):
0 - трансформируем пропсы (см HOC withTransformProps)
1 - оборачиваем HOC'ом withActivePlayer и теперь новый компонент может вкл\выкл плеер
2 - оборачиваем HOC'ом withUserAnswer и теперь он может собирать ответы пользователя
  и дальше уже используем компонент GenreGameScreenWrapped */
const GenreGameScreenWrapped = withUserAnswer(
    withActivePlayer(withTransformProps(transformPlayerToAnswer)(GenreGameScreen))
);

const ArtistGameScreenWrapped = withActivePlayer(
    withTransformProps(transformPlayerToQuestion)(ArtistGameScreen)
);

const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        renderScreen={this._getScreen}
      />;
    }

    /**
     * Check what screen should be rendered
     * @param {Object} question
     * @return {*}
     * @private
     */
    _getScreen(question) {
      const {onUserAnswer, mistakes, maxMistakes, resetGame, onWelcomeScreenClick, maxTime} = this.props;

      /* если нет вопроса, рендерим вэлком-скрин */
      if (!question) {
        const {step, questions} = this.props;
        if (step > questions.length - 1) {
          // todo add game-over-screen or win-screen
          // eslint-disable-next-line
          window.alert(`Вы проиграли?!`); // temporary solution
          return null;
        } else {
          return <WelcomeScreen
            maxMistakes={maxMistakes}
            maxTime={maxTime}
            onClick={onWelcomeScreenClick}
          />;
        }
      }

      /* Если превысили ко-во допустимых ошибок рендерим game-over-screen */
      if (mistakes >= maxMistakes) {
        // todo add game-over-screen
        // eslint-disable-next-line
        if (window.confirm(`Вы проиграли!`)) { // temporary solution
          resetGame();
        }
        return null;
      }

      /* Если ничего выше не отрендерилось, рендерим хеадер-обертку и в ней игровой экран */
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
        case `genre`: return <GenreGameScreenWrapped
          answers={question.answers}
          question = {question}
          onAnswer = {onAnswer}/>;
        case `artist`: return <ArtistGameScreenWrapped
          song = {question.song}
          answers = {question.answers}
          onAnswer = {onAnswer}/>;
      }
      return null;
    }

  }

  WithScreenSwitch.propTypes = {
    maxTime: PropTypes.number.isRequired,
    maxMistakes: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

const mapDispatchToProps = (dispatch) => ({

  onWelcomeScreenClick: () => dispatch(ActionCreator[`INCREMENT_STEP`]()),

  onUserAnswer: (question, userAnswer, mistakes, maxMistakes) => {
    dispatch(ActionCreator[`INCREMENT_STEP`]());
    dispatch(ActionCreator[`INCREMENT_MISTAKES`](question, userAnswer, mistakes, maxMistakes));
  },

  resetGame: () => dispatch(ActionCreator[`RESET_GAME`]()),
});

export {withScreenSwitch};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
