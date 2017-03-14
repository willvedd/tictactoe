import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './Cell';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player1:[],
      player2:[],
      turnCounter: 0,
      size: 5,
      player: [1,2,3,4,5],
    }

    this.wins = [[0,1,2],[3,4,5]];
  }


  _playerMove = (index) => {

    var currentPlayer;
    var self = this;

    var player1Moves= this.state.player1;
    var player2Moves= this.state.player2;


    if(this.state.turnCounter % 2){
      player2Moves.push(index);
    } else {
      player1Moves.push(index);
    }

    this.setState({
        player1: player1Moves,
        player2: player2Moves,
        turnCounter: this.state.turnCounter + 1,
    })
  }


  hasWon = () => {

    console.log("hasWon",this.wins);
    var wins = this.wins;
    var player1 = this.state.player1;

    var player1hasWon = false;

    wins.forEach(function(moveSet){
      var setMatch = true;
      moveSet.forEach(function(move,i){
        if(player1.indexOf(move) == -1){
          setMatch = false;
        }
      })
      if(!setMatch){
        return;
      }
      player1hasWon = setMatch;
    })
    console.log("*",player1hasWon);

  }

  render() {

    this.hasWon();

    console.log("this is the state",this.state);

    return (
      <div className="App">
        <div className="container-inner">
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={0}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={1}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={2}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={3}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={4}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={5}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={6}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={7}/>
          <Cell onMoved={this._playerMove} player1Moves={this.state.player1} player2Moves={this.state.player2} gameIndex={8}/>
        </div>
      </div>
    );
  }
}


export default App;
