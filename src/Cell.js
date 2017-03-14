import React, {Component} from 'react';


class Cell extends Component{





	render(){

		const playerMoveClass = ()=>{
			if(this.props.player1Moves.indexOf(this.props.gameIndex) !== -1){
				return "p1";
			} else if(this.props.player2Moves.indexOf(this.props.gameIndex) !== -1){
				return "p2";
			}
			else return "";
		}


		return(
			<button onClick={()=>{this.props.onMoved(this.props.gameIndex)}}className={'cell ' + playerMoveClass()}>Cell!</button>
		);
	}
}

export default Cell;