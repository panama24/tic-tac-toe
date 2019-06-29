import React, { Component, Fragment } from 'react';
import './App.css';

const Row = ({ rowIdx, onClickHandler, row }) => (
  <Fragment>
    {row.map((cell, idx) => (
      <div
        className="cell"
        key={idx}
        onClick={() => onClickHandler(rowIdx, idx)}
      >
        <div className="mark">
          {cell}
        </div>
      </div>
    ))}
  </Fragment>
);

class Gameboard extends Component {
  state = {
    grid: Array(3).fill(Array(3).fill(null)),
    isX: true,
  }

  switch = () => this.setState(({ isX }) => ({ isX: !isX }));;

  placeMarker = (rowIdx, cellIdx) => {
    this.setState(({ grid, isX }) => ({
      grid: [
        ...grid.slice(0, rowIdx),
        [
          ...grid[rowIdx].slice(0, cellIdx),
          isX ? 'X' : 'O',
          ...grid[rowIdx].slice(cellIdx + 1),
        ],
        ...grid.slice(rowIdx + 1),
      ],
    }));

    this.isGameOver();
  }

  isGameOver = () => {
    // winner?
    // three in a row?
    // tie?
    // else
    this.switch();
  };

  onClickHandler = (rowIdx, cellIdx) => {
    const { grid } = this.state;
    !grid[rowIdx][cellIdx] && this.placeMarker(rowIdx, cellIdx);
  };

  render () {
    const { grid } = this.state;

    return (
      <div className="gameboard">
        {grid.map((row, idx) => (
          <Row
            className="row"
            key={idx}
            rowIdx={idx}
            onClickHandler={this.onClickHandler}
            row={row}
          />
        ))}
      </div>
    );
  }
}

const App = () => (
  <div className="App">
    <header className="App-header">
      <Gameboard />
    </header>
  </div>
);

export default App;
