import React from "react";
import PropTypes from "prop-types";

class GenreGameScreen extends React.PureComponent {

  render() {
    const {userAnswer, onChange} = this.props;
    const {renderAnswer} = this.props;
    const {question, onAnswer} = this.props;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {question.genre} треки</h2>
      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        onAnswer();
      }}>

        {question.answers.map((it, i) =>
          <div className="track" key={`answer-${i}`}>
            {renderAnswer(it, i)}
            <div className="game__answer">
              <input className="game__input visually-hidden"
                type="checkbox"
                name="answer"
                value={`answer-${i}`}
                id={`answer-${i}`}
                checked={userAnswer[i]}
                onChange={() => onChange(i)}
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
  renderAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  userAnswer: PropTypes.arrayOf(PropTypes.bool).isRequired,
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
