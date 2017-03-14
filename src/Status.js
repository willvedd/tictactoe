import React, {Component} from 'react';


class Status extends Component{
	render(){
		return(
			<div className="status-container">
				<div className="status-container-inner">
					<span className="status-messaging">{this.props.children}
						<button className="status-button" onClick={()=>this.props.restartGame()}>Restart Game</button>
					</span>
				</div>
			</div>
		);
	}
}

export default Status;