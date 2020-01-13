import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';


/**
 * Helper for audio player
 * @param {Node} Component
 * @return {WithAudio}
 */
const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
        progress: 0,
      };

      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
      this._renderAudio = this._renderAudio.bind(this);
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          onPlayButtonClick={this._onPlayButtonClick}
          renderAudio={this._renderAudio}
        />
      );
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime)
      });
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
      this.setState({isPlaying: !this.state.isPlaying});
    }

    _renderAudio() {
      return <audio
        ref={this._audioRef}
      />;
    }
  }

  WithAudio.propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};

export default withAudio;
