import React, { Component } from 'react';
import './App.css';

class Gameboard extends Component {
  state = {
    cells: [...Array(9)],
    isX: true,
  }

  switch = () => this.setState(({ isX }) => ({ isX: !isX }));;

  placeMarker = i => {
    this.setState(({ cells, isX }) => ({
      cells: [
        ...cells.slice(0, i),
        isX ? 'X' : 'O',
        ...cells.slice(i + 1)
      ],
    }));

    this.isGameOver();
  }

  isGameOver = () => {
    // winner?
    // three in a row?
    // tie?
    // if not over, switch players
    this.switch();
  };

  onClickHandler = i => {
    const { cells } = this.state;
    typeof cells[i] === 'undefined' && this.placeMarker(i);
  };

  render () {
    const { cells } = this.state;

    return (
      <div className="gameboard">
        {cells.map((content, i) => (
          <div
            className="cell"
            key={i}
            onClick={() => this.onClickHandler(i)}
          >
            <div className="mark">
              {content}
            </div>
          </div>
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
