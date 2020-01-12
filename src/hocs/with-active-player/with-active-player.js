import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';
import withAudio from '../with-audio/with-audio';

const AudioPlayerWrapped = withAudio(AudioPlayer);


/**
 * Check is player active or no
 * @param {Node} Component
 * @return {WithActivePlayer}
 */
const withActivePlayer = (Component) => {

  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(it, index) => {
          return <AudioPlayerWrapped
            src={it.src}
            isPlaying={index === activePlayer}
            onPlayButtonClick={() => this._onPlayButtonClick(index)}
          />;
        }}
      />;
    }

    _onPlayButtonClick(index) {
      this.setState((prevState) => ({
        activePlayer: prevState.activePlayer === index ? -1 : index
      }));
    }

  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
