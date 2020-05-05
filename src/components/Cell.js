import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cell extends Component {
  constructor(props) {
    super(props);
    /*
    * For rename Cell's className it's needed to
    * call this func again, so we use: "...bind(this)".
    */
    this.toggleClassName = this.toggleClassName.bind(this);

    this.state = {
      isTapped: false,
    };
  }

  // Func for flip card.
  toggleClassName() {
    this.setState(state => ({
      isTapped: !state.isTapped
    }));
  }

  render () {
    // Importing this state into render() to className which has to read value of the state.
    const { isTapped } = this.state;

    return (
      <div
        // There is our imported state.
        className={`Field__сell${isTapped ? ' Field__cell_flipped' : ''}`}
        onClick={() => {
          this.toggleClassName()
          this.props.onClick()
        }}
      >
        <div className='Cell__front-side'></div>
        <div className='Cell__back-side' style={{backgroundImage: 'url(react-back-logo.png)'}}></div>
      </div>
    )
  }
}

Cell.propTypes = {
  onClick: PropTypes.func,
  pair: PropTypes.number.isRequired,
}

export default Cell;