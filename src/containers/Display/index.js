import React, { Component } from 'react';
import Results from '../../components/Results';
import Gameboard from '../../components/Gameboard';

class DisplayContainer extends Component {
  state = {
    endGameResult: null,
    grid: Array(3).fill(Array(3).fill(null)),
    isX: true,
  }

  getMark = () => this.state.isX ? 'X' : 'O';

  endGame = (res) => setTimeout(() => {
    this.setState(({ endGameResult }) => ({ endGameResult: res }));
  }, 1000);

  switch = () => this.setState(({ isX }) => ({ isX: !isX }));

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
    }), () => this.next(rowIdx, cellIdx));
  }

  next = (rowIdx, cellIdx) => {
    const res = this.checkGameOver(rowIdx, cellIdx);
    res ? this.endGame(res) : this.switch();
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

    if (diagonal || threeAcross || threeVertical) {
      return 'winner';
    } else if (tie) {
      return 'tie';
    } else {
      return null;
    }
  };

  onClickHandler = (rowIdx, cellIdx) => {
    const { endGameResult, grid } = this.state;

    if (endGameResult) {
      return;
    }

    !grid[rowIdx][cellIdx] && this.placeMarker(rowIdx, cellIdx);
  };

  render () {
    const { endGameResult, grid } = this.state;

    return (
      <div className="display-container">
        {endGameResult ? <Results result={endGameResult} /> : <Gameboard grid={grid} onClickHandler={this.onClickHandler} />}
      </div>
    );
  }
}

export default DisplayContainer;
