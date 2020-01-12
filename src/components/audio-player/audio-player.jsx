import React from 'react';
import PropTypes from 'prop-types';

const AudioPlayer = (props) => {

  const {isLoading, isPlaying, onPlayButtonClick, renderAudio} = props;

  return <React.Fragment>
    <button
      className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
      disabled={isLoading}
      onClick={onPlayButtonClick}
      type="button"
    />
    <div className="track__status">
      {renderAudio()}
    </div>
  </React.Fragment>;

};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  renderAudio: PropTypes.func.isRequired,
};

export default AudioPlayer;
