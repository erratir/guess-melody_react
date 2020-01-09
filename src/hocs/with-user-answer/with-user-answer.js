import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';


/**
 * Collect user responses
 * @param {Node} Component
 * @return {WithActivePlayer}
 */
const withUserAnswer = (Component) => {

  class WithUserAnswer extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        userAnswers: new Array(props.answers.length).fill(false),
      };
    }

    render() {
      const {onAnswer} = this.props;

      return <Component
        {...this.props}
        userAnswer={this.state.userAnswers}
        onChange={(index) => {
          const userAnswers = this.state.userAnswers.slice(0);
          userAnswers[index] = !userAnswers[index];
          this.setState({userAnswers});
        }}
        onAnswer={() => onAnswer(this.state.userAnswers)}
      />;
    }
  }

  WithUserAnswer.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `folk`, `pop`, `jazz`, `blues`]).isRequired,
    })),
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
