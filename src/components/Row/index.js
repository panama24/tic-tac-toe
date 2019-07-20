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
          <Mark>
            {cell}
          </Mark>
        </Cell>
      ))}
    </Fragment>
  );
};

export default Row;

const CELL_WIDTH = '200px';

const Cell = styled.div`
  border-radius: 10%;
  background-color: ${({ dark }) => dark ? '#080A52' : '#EB2188'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${CELL_WIDTH};
  height: ${CELL_WIDTH};
`;

const Mark = styled.div`
  font-size: 120px;
  font-weight: bold;
  color: #FAD744;
`;
