import React, { Component } from 'react';
import Results from '../../components/Results';
import Gameboard from '../../components/Gameboard';

import { isGameOver } from './helpers';

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
    const { grid } = this.state;
    const mark = this.getMark();
    const res = isGameOver(cellIdx, grid, mark, rowIdx);

    res ? this.endGame(res) : this.switch();
  }

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
