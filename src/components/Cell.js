import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTapped: false,
    };

    /*
    * For rename Cell's className it's needed to render again
    * i.e call this func again, so we use: "...bind(this)".
    */
    this.toggleClassName = this.toggleClassName.bind(this);
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
        onClick={() => {
          this.toggleClassName()
          this.props.onClick()
        }}
        // There is our imported state.
        className={`Field__сell${isTapped ? ' Field__cell_flipped' : ''}`}
      >
        <div className='Cell__front-side'></div>
        <div className='Cell__back-side' style={{backgroundImage: 'url(react-back-logo.png)'}}></div>
      </div>
    )
  }
}