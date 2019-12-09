import React from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";

class GenreGameScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    const {answers} = this.props.question;

    this.state = {
      activePlayer: -1,
      userAnswer: new Array(answers.length).fill(false),
    };
  }

  render() {
    const {question, onAnswer} = this.props;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {question.genre} треки</h2>
      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        this.setState({activePlayer: -1});
        onAnswer(this.state.userAnswer);
      }}>

        {question.answers.map((it, i) =>
          <div className="track" key={`answer-${i}`}>
            <AudioPlayer
              src={it.src}
              isPlaying = {i === this.state.activePlayer}
              onPlayButtonClick = {() =>
                this.setState({
                  activePlayer: this.state.activePlayer === i ? -1 : i
                })}
            />
            <div className="game__answer">
              <input className="game__input visually-hidden"
                type="checkbox"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
                checked={this.state.userAnswer[i]}
                onChange={() => {
                  const userAnswer = [...this.state.userAnswer];
                  userAnswer[i] = !userAnswer[i];
                  this.setState({userAnswer});
                }}
              />
              <label className="game__check" htmlFor={`answer-${i}`}>
                  Отметить
              </label>
            </div>
          </div>
        )}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }
}

GenreGameScreen.propTypes = {
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
      src: PropTypes.string.isRequired
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default GenreGameScreen;
