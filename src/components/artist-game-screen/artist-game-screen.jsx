import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header.jsx";
import AudioPlayer from "../audio-player/audio-player.jsx";


class ArtistGameScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {song, answers, onAnswer} = this.props;
    const {isPlaying} = this.state;

    return <section className="game game--artist">
      <Header/>
      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <AudioPlayer
            src={song.src}
            isPlaying={isPlaying}
            onPlayButtonClick = {() =>
              this.setState({
                isPlaying: !isPlaying
              })}

          />
        </div>
        <form className="game__artist" onChange={onAnswer}>

          {answers.map((it, i) => <div className="artist" key={`artist-${i}`}>
            <input className="artist__input visually-hidden" type="radio" name="answer" value={`artist-${i}22`} id={`answer-${i}`}/>
            <label className="artist__name" htmlFor="answer-1">
              <img className="artist__picture" src={it.pic} alt={it.artist}/>
              {it.artist}
            </label>
          </div>)}

        </form>
      </section>
    </section>;
  }
}

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
};

export default ArtistGameScreen;
