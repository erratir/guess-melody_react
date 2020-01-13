import React from "react";
import PropTypes from "prop-types";

const ArtistGameScreen = (props) => {

  const {song, answers, onAnswer, renderQuestion} = props;

  return <section className="game__screen">
    <h2 className="game__title">Кто исполняет эту песню?</h2>
    <div className="game__track">

      {renderQuestion(song, 0)}

    </div>
    <form className="game__artist">

      {answers.map((answer, i) => <div className="artist" key={`artist-${i}`}>
        <input className="artist__input visually-hidden"
          type="radio"
          name="answer"
          value={`artist-${i}`}
          id={`answer-${i}`}
          onClick={() => onAnswer(answer)}
        />
        <label className="artist__name" htmlFor={`answer-${i}`}>
          <img className="artist__picture" src={answer.pic} alt={answer.artist}/>
          {answer.artist}
        </label>
      </div>)}

    </form>
  </section>;

};

ArtistGameScreen.propTypes = {
  song: PropTypes.shape({
    src: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    artist: PropTypes.string.isRequired,
    pic: PropTypes.string.isRequired,
  })).isRequired,
  onAnswer: PropTypes.func.isRequired,
  renderQuestion: PropTypes.func.isRequired,
};

export default ArtistGameScreen;
