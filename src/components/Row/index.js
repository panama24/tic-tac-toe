import React, { Fragment } from 'react';
import styled from 'styled-components';

const Row = ({ rowIdx, onClickHandler, row }) => {
  const isDark = (cellIdx, rowIdx) => (rowIdx % 2 === 0 && cellIdx % 2 === 0) || (rowIdx % 2 !== 0 && cellIdx % 2 !== 0);

  return (
    <Fragment>
      {row.map((cell, idx) => (
        <Cell
          key={idx}
          dark={isDark(idx, rowIdx)}
          onClick={() => onClickHandler(rowIdx, idx)}
        >
          <div className="mark">
            {cell}
          </div>
        </Cell>
      ))}
    </Fragment>
  );
};

export default Row;

const CELL_WIDTH = '198px';

const Cell = styled.div`
  border: 1px solid;
  background-color: ${({ dark }) => dark ? 'black' : '#ccc'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  width: ${CELL_WIDTH};
  height: ${CELL_WIDTH};
  float: left;
`;
