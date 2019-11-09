import React, {PureComponent} from "react";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import ArtistGameScreen from "../artist-game-screen/artist-game-screen.jsx";
import GenreGameScreen from "../genre-game-screen/genre-game-screen.jsx";
import PropTypes from "prop-types";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentGameCount: -1,
    };
  }

  render() {
    const {currentGameCount} = this.state;
    const {questions} = this.props;

    return this._getScreen(questions[currentGameCount], () => {
      this.setState({
        currentGameCount: currentGameCount + 1 >= questions.length ? -1 : currentGameCount + 1
      });
    });
  }

  _getScreen(question, onClick) {
    if (!question) {
      const {maxTime, maxMistakes} = this.props;
      return <WelcomeScreen
        maxTime = {maxTime}
        maxMistakes = {maxMistakes}
        onClick = {onClick}
      />;
    }
    switch (question.type) {
      case `genre`: return <GenreGameScreen
        answers = {question.answers}
        genre ={question.genre}
        onclick = {onClick}/>;
      case `artist`: return <ArtistGameScreen
        song = {question.song}
        answers = {question.answers}
        onclick = {onClick}/>;
    }

    return null;
  }
}

App.propTypes = {
  maxTime: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
