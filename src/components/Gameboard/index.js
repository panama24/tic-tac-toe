import React from 'react';
import Row from '../Row';

const Gameboard = ({ grid, onClickHandler }) => (
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

export default Gameboard;
