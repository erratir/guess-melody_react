import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import AudioPlayer from "../audio-player/audio-player.jsx";

const GenreGameScreen = (props) => {
  const {answers, genre} = props;
  return <section className="game game--genre">
    <Header/>
    <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks">

        {answers.map((it, i) =>
          <div className="track" key={`answer-${i}`}>
            <AudioPlayer src={it.src}/>

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
  genre: PropTypes.oneOf([`rock`, `pop`, `jazz`]).isRequired
};

export default GenreGameScreen;