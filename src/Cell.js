import React, {Component} from 'react';


class Cell extends Component{

	render(){
		const {player1Moves,player2Moves,onMoved,cellSize,gameIndex} = this.props;

		const playerMoveClass = () =>{
			if(player1Moves.indexOf(gameIndex) !== -1){
				return "p1";
			} else if(player2Moves.indexOf(gameIndex) !== -1){
				return "p2";
			}
			else return "";
		}

		const cellStyle = {
			flex: "1 0 "+cellSize+"%",
			height: cellSize+"vh",
		}

		return(
			<button style={cellStyle} onClick={()=>onMoved(this.props.gameIndex)} className={'cell ' + playerMoveClass()}></button>
		);
	}
}

export default Cell;