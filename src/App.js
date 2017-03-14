import React, { Component } from 'react';
import './App.css';
import Cell from './Cell';
import Status from './Status';
import SizeSlider from './SizeSlider';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player1:[],
      player2:[],
      turnCounter: 0,
      statusMessage: '',
      gameOver: false,
      size: 3,
    }

    this.wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]];
  }

  _restartGame(){
    this.setState({
      player1:[],
      player2:[],
      turnCounter: 0,
      statusMessage: '',
      gameOver: false,
    })
  }

  _playerMove = (index) => {
    const {player1,player2,turnCounter,gameOver} = this.state;
    const allMoves = player1.concat(player2);

    const moveIsValid = (function(){//
      return allMoves.indexOf(index) === -1;
    })();


    if(!gameOver && moveIsValid){
      if(turnCounter % 2){
        player2.push(index);
      } else {
        player1.push(index);
      }

      this.setState({
          player1: player1,
          player2: player2,
          turnCounter: turnCounter + 1,
      })
    }
  }


  _isSubset(subjectArray,compareArray){//checks if array1 is a subset of array 2
    return subjectArray.every(function (value) { 
      return compareArray.indexOf(value) >= 0; 
    });
  }

  _hasSubset(subjectArray,compareArray){
    const self = this;
    return subjectArray.some(function(subset){
      return self._isSubset(subset,compareArray);
    })
  }


  _hasWon = () => {
    const {player1,player2,size} = this.state;

    const player1hasWon = this._hasSubset(this.wins,player1);
    const player2hasWon = this._hasSubset(this.wins,player2);

    if(player1hasWon||player2hasWon){
      this.setState({
        statusMessage: (function(){
          if(player1hasWon) return 'Player 1 has won';
          else return 'Player 2 has won';
        })(),
        gameOver: true,
      })
    }else if(this.state.turnCounter >= size*size) {
      this.setState({
        statusMessage: "Stalemate",
        gameOver: true,
      })
    }
  }

  componentDidUpdate(){
    if(!this.state.gameOver) this._hasWon();//this check is necessary to prevent an infinite loop
  }


  _renderCells(size){
    let cells = [];
    for(let i=0;i<size*size;i++){
      cells.push(<Cell cellSize={(100/this.state.size)} key={"cell-"+i} onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={i}/>);
    }
    return cells;
  }

  _changeSize(newSize) {
    this._restartGame();
    this.setState({
      size: newSize,
    })
  }


  render() {
    const {turnCounter,size,gameOver,statusMessage} = this.state;

    const currentTurnClass = (function(){
      if(turnCounter % 2){
        return 'currentTurnPlayer2';
      }else{
        return 'currentTurnPlayer1';
      }
    })(); 

    return (
      <div className={"App " + currentTurnClass}>
        <div className="container-inner">
          {this._renderCells(size)}
        </div>
        {gameOver ?
          <Status restartGame={this._restartGame.bind(this)}>{statusMessage}</Status>
        :""}
        <SizeSlider defaultSize={size} changeSize={this._changeSize.bind(this)}/>
      </div>
    );
  }
}


export default App;
