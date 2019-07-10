const isRightDiagonal = (grid, mark) => grid[0][0] === mark &&
  grid[1][1] === mark &&
  grid[2][2] === mark;

const isLeftDiagonal = (grid, mark) => grid[0][2] === mark &&
  grid[1][1] === mark &&
  grid[2][0] === mark;

const isDiagonal = (grid, mark) => isRightDiagonal(grid, mark) || isLeftDiagonal(grid,mark);

const isThreeAcross = (grid, mark, rowIdx) => grid[rowIdx].every(cell => cell === mark);

const isThreeVertical = (cellIdx, grid, mark) => grid
  .map(row => row[cellIdx])
  .every(cell => cell === mark);

const isTie = (grid, mark) => grid
  .map(row => row.every(cell => cell !== null))
  .every(val => val === true);

export const isGameOver = (cellIdx, grid, mark, rowIdx) => {
  const diagonal = isDiagonal(grid, mark);
  const threeAcross = isThreeAcross(grid, mark, rowIdx);
  const threeVertical = isThreeVertical(cellIdx, grid, mark);
  const tie = isTie(grid, mark);

  if (diagonal || threeAcross || threeVertical) {
    return 'winner';
  } else if (tie) {
    return 'tie';
  } else {
    return null;
  }
};
