import React from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends React.PureComponent {

  constructor(props) {
    super(props);

    const {isPlaying, src} = props;

    this._audio = new Audio(src);

    this.state = {
      isLoading: true,
      isPlaying,
      progress: this._audio.currentTime
    };

    this._audio.oncanplaythrough = () => {
      this.setState({
        isLoading: false
      });
    };

    this._audio.onplay = () => {
      this.setState({
        isPlaying: true
      });
    };

    this._audio.onpause = () => {
      this.setState({
        isPlaying: false
      });
    };

    this._audio.ontimeupdate = () => {
      this.setState({
        progress: this._audio.currentTime
      });
    };

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
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
        <audio/>
      </div>
    </React.Fragment>;
  }

  componentDidUpdate() {
    if (this.props.isPlaying) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
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
