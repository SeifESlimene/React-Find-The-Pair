import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTapped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    if (!this.state.isTapped) {
      this.setState({
        isTapped: true
      });
    }
  } 

  render () {
    return (
      <CellChild
        className={this.state.isTapped ? 'Field__сell Field__cell_flipped' : 'Field__сell'}
        toggleClassName={this.handleClick}
      >
        <div className='Cell__front-side'></div>
        <div className='Cell__back-side'></div>
      </CellChild>
    )
  }
}

class CellChild extends Component {
  render() {
    return (
      <div
        className={this.props.className}
        onClick={this.props.toggleClassName}
      >
        {this.props.children}
      </div>
    )    
  }
}