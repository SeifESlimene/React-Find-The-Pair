import React, { Component } from 'react'
import Cell from './Cell'

class Field extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: {
        Init:     [...Array(8).keys()],
        Dupe:     [],
        Rand:     [],

        Open:     [],

        children: [],
      }
    }

    this.initGame()
  }

  handleClick = (indexArray, indexPair) => {
    const
      cells = this.state.cells,

      currentCell = {
        indexPair,
        indexArray
      }
    
    // TODO: Remove this condition
    if (cells.Open.length === 2)
      return null
    else {
      cells.children[indexArray].close = false
      console.log(currentCell)
      // TODO: Not same index array
      cells.Open.push(currentCell)

      console.log(cells.Open)

      this.setState({
        cells: {
          ...this.state.cells,
          children: cells.children,
        }
      })

      if (cells.Open.length === 2)
        setTimeout(() => this.check(), 1000)
    }
  }

  check = () => {
    const
      cells = this.state.cells,
      children = this.state.cells.children
    
    /*
    * TODO:
    * - Check out it on bugs...
    * - Style card when it flipped
    */
    if ((cells.Open[0].indexPair === cells.Open[1].indexPair) &&
        (cells.Open[0].indexArray !== cells.Open[1].indexArray)) {
      cells.children[cells.Open[0].indexArray].done = true
      cells.children[cells.Open[1].indexArray].done = true
    } else if (cells.Open[0].indexArray === cells.Open[1].indexArray) {
      cells.children[cells.Open[0].indexArray].close = false
      cells.children[cells.Open[1].indexArray].close = false
    } else {
      cells.children[cells.Open[0].indexArray].close = true
      cells.children[cells.Open[1].indexArray].close = true
    }

    this.setState({
      cells: {
        ...this.state.cells,
        Open: []
      }
    })
  }

  initGame = () => {
    // Shortcut
    const cells  = this.state.cells

    let children = []

    cells.Dupe   = cells.Init.concat(cells.Init) // Duplicating inited array (for pairs)
    cells.Rand   = this.shuffleCells(cells.Dupe) // Randomizing it by shuffleCells func
    cells.Rand = cells.Dupe

    // Putting default info in each child of already randomized cells
    cells.Rand.map((pair, index) => {
      return children.push({
        pair,
        close: true,
        done: false,
      })
    })

    cells.children = children
  }

  shuffleCells = (array) => {
    let
      currentIndex = array.length,
      temporaryValue,
      randomIndex
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex   = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
  
      // And swap it with the current element.
      temporaryValue      = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex]  = temporaryValue
    }
    return array
  }

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
      children   = this.state.cells.children, // Shortcut
      lineLength = 4 // Count of cells in 1 line

    let field = []

    // Every line...
    for (let i = 0; i < lineLength; i++) {
      let rows = []

      // Cells are created... 
      for (let j = 0; j < children.length; j += lineLength) {
        // In their own row
        rows.push(<div className='Field__row' key={`Row_${j}`}>
          {[ // In count of 4
            this.renderCell(children[j].pair, j, children[j].close, children[j].done),
            this.renderCell(children[j + 1].pair, j + 1, children[j + 1].close, children[j + 1].done),
            this.renderCell(children[j + 2].pair, j + 2, children[j + 2].close, children[j + 2].done),
            this.renderCell(children[j + 3].pair, j + 3, children[j + 3].close, children[j + 3].done),
          ]}
        </div>)
      }
      
      // Then all line with their cells pushed into Field (parent) 
      field.push(<div className='Field' key={`Field_${i}`}>{rows}</div>)

      // Returned last updated and pushed 
      return field
    }
  }

  render() {
    return this.renderField()
  }
}

export default Field