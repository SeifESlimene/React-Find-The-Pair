import React, { Component } from 'react'
import Cell from './Cell'

class Field extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: {
        Init: [...Array(8).keys()],
        Dupe: [],
        Rand: [],

        Open: [],

        children: [],
      }
    }

    this.initGame()
  }

  initGame = () => {
    let { cells: { Init, Dupe, Rand, children } } = this.state

    Dupe = Init.concat(Init) // Duplicating inited array (for pairs)
    Rand = this.shuffleCells(Dupe) // Randomizing it by shuffleCells func
    Rand = Dupe

    // Putting default info in each child of already randomized cells
    Rand.map((pair) => {
      return children.push({
        pair,
        close: true,
        done: false,
      })
    })
  }

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
      array[randomIndex] = temporaryValue
    }
    return array
  }

  /*
   * There are cannot be default values of close and done vars
   * Because every cell will work wrong
   */
  renderCell = (indexPair, indexArray, close, done) => {
    return (
      <Cell
        pair={indexPair}
        key={indexArray}
        close={close}
        done={done}
        onClick={() => this.handleClick(indexArray, indexPair)}
      />
    )
  }

  renderField = () => {
    const
      { cells: { children } } = this.state,
      lineLength = 4, // Count of cells in 1 line
      field = []

    // Every line...
    for (let i = 0; i < lineLength; i++) {
      let rows = []

      // Cells are created... 
      for (let j = 0; j < children.length; j += lineLength) {
        // In their own row
        rows.push(<div className='Field__row' key={`Row_${j}`}>
          {[ // In count of 4
            // FIXME: Automatically set count of renderCells in the row by lineLength
            this.renderCell(children[j].pair, j, children[j].close, children[j].done),
            this.renderCell(children[j + 1].pair, j + 1, children[j + 1].close, children[j + 1].done),
            this.renderCell(children[j + 2].pair, j + 2, children[j + 2].close, children[j + 2].done),
            this.renderCell(children[j + 3].pair, j + 3, children[j + 3].close, children[j + 3].done),
          ]}
        </div>)
      }

      // Then all line with their cells pushed into Field (parent) 
      field.push(<div className='Field' key={`Field_${i}`}>{rows}</div>)

      // Returned last updated and pushed status of field
      return field
    }
  }

  handleClick = (indexArray, indexPair) => {
    const
      { cells: { Open, children } } = this.state,
      currentCell = { indexPair, indexArray }

    // TODO: Add comments here and lower
    if (!(Open.length === 2)) {
      if (!children[indexArray].done && children[indexArray].close) {
        children[indexArray].close = false
        Open.push(currentCell)
      }

      this.setState({
        cells: {
          ...this.state.cells,
          children: children,
        }
      })

      if (Open && (Open.length === 2)) {
        if (Open[0].indexArray === Open[1].indexArray) {
          Open.shift()
        } else {
          setTimeout(() => this.check(), 1000)
        }
      }
    }
  }

  check = () => {
    const { cells: { Open, children } } = this.state

    // TODO: Style card when it flipped
    if (Open[0] && Open[1]) {
      if (Open[0].indexPair === Open[1].indexPair) {
        children[Open[0].indexArray].done = true
        children[Open[1].indexArray].done = true
      } else {
        children[Open[0].indexArray].close = true
        children[Open[1].indexArray].close = true
      }
    }

    this.setState({
      cells: {
        ...this.state.cells,
        Open: []
      }
    })
  }

  render() {
    return this.renderField()
  }
}

export default Field