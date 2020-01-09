import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';


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
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(it, index) => {
          return <AudioPlayer
            src={it.src}
            isPlaying={index === activePlayer}
            onPlayButtonClick={() => this.setState({
              activePlayer: activePlayer === index ? -1 : index
            })}
          />;
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;