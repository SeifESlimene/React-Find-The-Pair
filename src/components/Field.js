import React, { Component } from 'react'
import Cell from './Cell'

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(16).fill(null),
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  
  // It's already prepared, in advance, function for use to shuffle cards when page loaded.
  shuffleCells = (array) => {
    let
      currentIndex = array.length,
      temporaryValue,
      randomIndex
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue;
    }
    return array
  };

  handleClick = () => {
    // const cells = this.state.cells.slice();
    // cells[i_arr] = 'X'
    // this.setState({ cells: cells })
    // console.log(cells[i_arr])
    console.log(123)
  }

  renderCell = (i_pair, i_arr) => {
    return (
      <Cell
        value={i_pair}
        key={i_arr}
        onClick={() => {
          this.handleClick();
        }}
      >
        {/* {this.state.cells[i_arr]} */}
      </Cell>
    )
  }

  render() {
    return (
      <div className='Field'>
        <div className='Field__row'>
          {this.renderCell(0, 0)}
          {this.renderCell(0, 1)}
          {this.renderCell(1, 2)}
          {this.renderCell(1, 3)}
        </div>
        <div className='Field__row'>
          {this.renderCell(2, 4)}
          {this.renderCell(2, 5)}
          {this.renderCell(3, 6)}
          {this.renderCell(3, 7)}
        </div>
        <div className='Field__row'>
          {this.renderCell(4, 8)}
          {this.renderCell(4, 9)}
          {this.renderCell(5, 10)}
          {this.renderCell(5, 11)}
        </div>
        <div className='Field__row'>
          {this.renderCell(6, 12)}
          {this.renderCell(6, 13)}
          {this.renderCell(7, 14)}
          {this.renderCell(7, 15)}
        </div>
      </div>
    )
  }
}