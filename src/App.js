import React, { Component, Fragment } from 'react';
import './App.css';

const Grid = ({ grid, onClickHandler }) => (
  grid.map((row, idx) => (
    <Row
      className="row"
      key={idx}
      rowIdx={idx}
      onClickHandler={onClickHandler}
      row={row}
    />
  ))
);

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

  getMark = () => this.state.isX ? 'X' : 'O';
  endGame = () => setTimeout(() => {
    this.setState(({ gameOver }) => ({ gameOver: !gameOver }));
  }, 1000);
  switch = () => this.setState(({ isX }) => ({ isX: !isX }));;

  placeMarker = (rowIdx, cellIdx) => {
    this.setState(({ grid }) => ({
      grid: [
        ...grid.slice(0, rowIdx),
        [
          ...grid[rowIdx].slice(0, cellIdx),
          this.getMark(),
          ...grid[rowIdx].slice(cellIdx + 1),
        ],
        ...grid.slice(rowIdx + 1),
      ],
    }), () => !this.checkGameOver(rowIdx, cellIdx) ? this.switch() : this.endGame());
  }

  checkGameOver = (rowIdx, cellIdx) => {
    const { grid } = this.state;
    const mark = this.getMark();

    const rightDiagonal = grid[0][0] === mark &&
      grid[1][1] === mark &&
      grid[2][2] === mark;

    const leftDiagonal = grid[0][2] === mark &&
      grid[1][1] === mark &&
      grid[2][0] === mark;

    const diagonal = rightDiagonal || leftDiagonal;
    const threeAcross = grid[rowIdx].every(cell => cell === mark);
    const threeVertical = grid
      .map(row => row[cellIdx])
      .every(cell => cell === mark);
    const tie = grid
      .map(row => row.every(cell => cell !== null))
      .every(val => val === true);

    return (diagonal || threeAcross || threeVertical || tie) ? true : false;
  };

  onClickHandler = (rowIdx, cellIdx) => {
    const { gameOver, grid } = this.state;

    if (gameOver) {
      return;
    }

    !grid[rowIdx][cellIdx] && this.placeMarker(rowIdx, cellIdx);
  };

  render () {
    const { gameOver, grid } = this.state;

    return (
      <div className="gameboard">
        {gameOver ? <h1>GAME OVER</h1> : <Grid grid={grid} onClickHandler={this.onClickHandler} />}
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
