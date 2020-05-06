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
    // Shortcut
    const cells = this.state.cells

    let children = []

    cells.Dupe = cells.Init.concat(cells.Init) // Duplicating inited array (for pairs)
    cells.Rand = this.shuffleCells(cells.Dupe) // Randomizing it by shuffleCells func
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
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
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
      children = this.state.cells.children, // Shortcut
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

  handleClick = (indexArray, indexPair) => {
    // TODO: Set these first 3 consts into the global scope
    const
      cells = this.state.cells,
      open = cells.Open,
      children = cells.children,

      currentCell = {
        indexPair,
        indexArray
      }

    // TODO: Add comments here
    if (!(cells.Open.length === 2)) {
      if (!children[indexArray].done && children[indexArray].close) {
        children[indexArray].close = false
        open.push(currentCell)
      }

      this.setState({
        cells: {
          ...this.state.cells,
          children: cells.children,
        }
      })

      if (open && (open.length === 2)) {
        if (open[0].indexArray === open[1].indexArray) {
          open.shift()
        } else {
          setTimeout(() => {
              this.check()
            }, 1000
          )
        }
      }
    }
  }

  check = () => {
    const
      cells = this.state.cells,
      open = cells.Open,
      children = cells.children

    // TODO: Style card when it flipped
    if (open[0] && open[1]) {
      if (open[0].indexPair === open[1].indexPair) {
        children[open[0].indexArray].done = true
        children[open[1].indexArray].done = true
      } else {
        children[open[0].indexArray].close = true
        children[open[1].indexArray].close = true
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