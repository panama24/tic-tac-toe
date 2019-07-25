import React, { Component } from 'react';
import styled from 'styled-components';
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

  switch = () => {
    const { isX } = this.state;
    this.setState({ isX: !isX });
    setTimeout(() => { if (isX) {
      this.computerTurn();
    }}, 500)
  };

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

  computerTurn = () => {
    const { grid } = this.state;
    const availableMoves = this.getAvailableMoves(grid);
    const chosenMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
    const [rowIdx, cellIdx] = chosenMove;
    this.onClickHandler(rowIdx, cellIdx);
  };

  onClickHandler = (rowIdx, cellIdx) => {
    const { endGameResult, grid } = this.state;

    if (endGameResult) {
      return;
    }

    !grid[rowIdx][cellIdx] && this.placeMarker(rowIdx, cellIdx);
  };

  getAvailableMoves = (grid) => grid.reduce((acc, row, rowIdx) =>
    acc.concat(row.reduce((acc, cell, cellIdx) =>
      !!cell ? acc : acc.concat([[rowIdx, cellIdx]]), [])), [])
  // [X, undefined, Y]
  // [], [].concat([0, 1]) = [[0, 1]], [[0, 1]]
  // [].concat([]) = [] // [].concat([1, 2]) = [1, 2] // [].concat([[1,2]]) = [[1, 2]]


  render () {
    const { isX, endGameResult, grid } = this.state;

    return (
      <Container>
        {endGameResult ? <Results result={endGameResult} /> : <Gameboard grid={grid} onClickHandler={this.onClickHandler} />}
      </Container>
    );
  }
}

export default DisplayContainer;

const Container = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: repeat(3, 1fr);
`;
