import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";

const GenreGameScreen = (props) => {
  const {answers, genre, onAnswer} = props;
  return <section className="game game--genre">
    <Header/>
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit={onAnswer}>

        {answers.map((it, i) =>
          <div className="track" key={`answer-${i}`}>
            <button className="track__button track__button--play" type="button"/>
            <div className="track__status">
              <audio/>
            </div>
            <div className="game__answer">
              <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`}/>
              <label className="game__check" htmlFor={`answer-${i}`}>
                Отметить
              </label>
            </div>
          </div>
        )}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>
  </section>;

};

GenreGameScreen.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
    src: PropTypes.string.isRequired
  })).isRequired,
  genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired,
  onAnswer: PropTypes.func.isRequired,
};

export default GenreGameScreen;
