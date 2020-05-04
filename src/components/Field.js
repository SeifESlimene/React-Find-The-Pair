import React, { Component } from 'react'
import Cell from './Cell'

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(16).fill(null),
    };
  }

  renderSquare(i) {
    return <Cell value={i}/>
  }

  render() {
    return (
      <div className='Field'>
        <div className='Field__row'>
          {this.renderSquare(0)}
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(1)}
        </div>
        <div className='Field__row'>
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(3)}
        </div>
        <div className='Field__row'>
          {this.renderSquare(4)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(5)}
        </div>
        <div className='Field__row'>
          {this.renderSquare(6)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(7)}
        </div>
      </div>
    )
  }
}