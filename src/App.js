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
    gameOver: false,
    grid: Array(3).fill(Array(3).fill(null)),
    isX: true,
  }

  endGame = () => this.setState(({ gameOver }) => ({ gameOver: !gameOver }));
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
    }), () => !this.checkGameOver(rowIdx, cellIdx) ? this.switch() : this.endGame());
  }

  checkGameOver = (rowIdx, cellIdx) => {
    const { grid, isX } = this.state;
    const mark = isX ? 'X' : 'O';

    // diagonal
    const threeAcross = grid[rowIdx].every(cell => cell === mark);
    const threeVertical = grid.map(row => row[cellIdx]).every(cell => cell === mark);
    const tie = grid
      .map(row => row.every(cell => cell !== null))
      .every(val => val === true);

    return (threeAcross || threeVertical || tie) ? true : false;
  };

  onClickHandler = (rowIdx, cellIdx) => {
    const { gameOver, grid } = this.state;

    if (gameOver) {
      return;
    }

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
