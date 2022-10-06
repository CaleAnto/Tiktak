import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      square: Array(9).fill(null),
      count: 0,
      move: 'X'
    }
    this.grid = [0,1,2,3,4,5,6,7,8];
    this.winnerLine = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  }
  isWinner = () => {
    let s = (this.state.count % 2 === 0) ? 'X' : 'O';

    for (let i = 0; i < 8; i++) {
      let line = this.winnerLine[i];
      if (this.state.square[line[0]] === s
        && this.state.square[line[1]] === s
        && this.state.square[line[2]] === s) {
        this.setState({ count: 10 });
        alert('Win to ' + s.toUpperCase());
        if (this.state.count === 8) {
          return;
        }
      }
    }
    if (this.state.count === 8) {
      if (!this.state.square.includes(null)) {alert('Not Winner');}
    }
  }

  clickHandler = (e) => {
    let data = e.target.getAttribute('data');
    let currentSquare = this.state.square;
    if (currentSquare[data] === null && this.state.count <= 8) {
      currentSquare[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
      this.setState({ count: this.state.count + 1 });
      this.setState({ squares: currentSquare });
      this.setState((this.state.count % 2 !== 0) ? {move: 'X'} : {move: 'O'});
    }
    this.isWinner();
  } 

  render() {
    return (
      <div className="wrapper">
        <div className="tic-tac-toe">
          { this.grid.map((item) =>{
            return <div className="box" onClick={this.clickHandler} data={item}>{this.state.square[item]}</div>
          })}
        </div>
        <div className="moved"> Move: {this.state.move}</div>
      </div>
    );
  }
  
}

export default App;
