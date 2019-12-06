import React from 'react';
import PropTypes from 'prop-types';

class Mistakes extends React.PureComponent {
  render() {
    const {mistakes} = this.props;

    return <div className="game__mistakes">
      {
        /* Loop inside React JSX - [...Array(99)].map() - создаем массив с нужным числом пустых элементов и мапимся по нему */
        [...Array(mistakes)].map((it, i) => <div className="wrong" key={i}/>)
      }
    </div>;
  }
}

Mistakes.propTypes = {
  mistakes: PropTypes.number.isRequired,
};

export default Mistakes;
