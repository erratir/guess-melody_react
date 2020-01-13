import {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";


class App extends Component {

  render() {
    const {questions, step, renderScreen} = this.props;

    return renderScreen(questions[step]);
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  renderScreen: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});

export {App};
export default connect(mapStateToProps)(App);
