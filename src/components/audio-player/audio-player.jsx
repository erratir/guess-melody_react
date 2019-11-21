import React from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends React.PureComponent {

  constructor(props) {
    super(props);

    const {isPlaying} = props;

    this._audioRef = React.createRef();

    this.state = {
      isLoading: true,
      isPlaying,
      progress: 0
    };

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
  }

  componentDidMount() {

    const {src} = this.props;
    const audio = this._audioRef.current;
    audio.src = src;

    audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };

    audio.onplay = () => {
      this.setState({
        isPlaying: true
      });
    };

    audio.onpause = () => {
      this.setState({
        isPlaying: false
      });
    };

    audio.ontimeupdate = () => {
      this.setState({
        progress: audio.currentTime
      });
    };
  }

  /**
   * Render audio player
   * @return {*}
   */
  render() {
    const {isLoading, isPlaying} = this.state;

    return <React.Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        disabled={isLoading}
        onClick={this._onPlayButtonClick}
        type="button"
      />
      <div className="track__status">
        <audio ref={this._audioRef}/>
      </div>
    </React.Fragment>;
  }

  componentDidUpdate() {
    const audio = this._audioRef.current;
    if (this.props.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  componentWillUnmount() {
    const audio = this._audioRef.current;
    audio.oncanplaythrough = null;
    audio.onplay = null;
    audio.onpause = null;
    audio.ontimeupdate = null;
    audio.src = ``;
  }

  /**
   * Change play status on play button click
   * @private
   */
  _onPlayButtonClick() {
    this.props.onPlayButtonClick();
    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }
}


AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};


export default AudioPlayer;
