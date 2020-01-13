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

      this.playButtonClickHandlers = {};
    }

    /**
     * Method for caching the handler
     * Сложный метод. Так стоит делать только в крайних случаях. Здесь же метод вызывается редко и только усложняет код.
     * Выигрыша производительности в хроме не заметил. Видимо браузер сам кешировал обработчик и в предыдущем коммите.
     * todo откатить коммит?
     * @param {Number} id
     * @return {*}
     */
    getOnPlayButtonClick(id) {
      if (!this.playButtonClickHandlers.hasOwnProperty(id)) {
        // Если обработчика нет, то создаем его и кешируем. Если он уже создан, то берем из кеша.
        this.playButtonClickHandlers[id] = () => {
          const {activePlayer} = this.state;
          this.setState({
            activePlayer: activePlayer === id ? -1 : id
          });
        };
      }

      return this.playButtonClickHandlers[id];
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(it, index) => {
          return <AudioPlayerWrapped
            src={it.src}
            isPlaying={index === activePlayer}
            onPlayButtonClick={this.getOnPlayButtonClick(index)}
          />;
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
