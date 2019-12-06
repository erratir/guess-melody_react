import React from "react";
import PropTypes from "prop-types";
import Mistakes from "../mistakes/mistakes.jsx";

const HeaderWrapper = (props) => {

  const {game, gameType, mistakes} = props;

  const circleStyle = {
    filter: `url(#blur)`,
    transform: `rotate(-90deg) scaleY(-1)`,
    transformOrigin: `center`};

  return <section className={`game game--${gameType}`}>
    <header className="game__header">
      <a className="game__back" href="#">
        <span className="visually-hidden">Сыграть ещё раз</span>
        <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
      </a>

      <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
        <circle className="timer__line" cx="390" cy="390" r="370"
          style={circleStyle}/>
      </svg>

      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">05</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">00</span>
      </div>

      <div className="game__mistakes">
        <Mistakes mistakes={mistakes} />
      </div>
    </header>
    {game}
  </section>;

};

HeaderWrapper.propTypes = {
  game: PropTypes.node.isRequired,
  gameType: PropTypes.string.isRequired,
  mistakes: PropTypes.number.isRequired
};

export default HeaderWrapper;
