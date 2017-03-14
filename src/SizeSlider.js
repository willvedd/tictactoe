import React, {Component} from 'react';


class SizeSlider extends Component{

	constructor(props){
		super(props);
		this.config = {
			min: 2,
			max: 20,
			debounceTime: 100
		}
	}

	_debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	_sizeChange(e){
		this._debounce(
			this.props.changeSize(e.target.value),this.config.debounceTime)
	}

	render(){
		const {min,max} = this.config;

		return(
			<div>
				<input onChange={(event)=>this._sizeChange(event)} type="range" min={min} max={max} value={this.props.defaultSize}/> 
			</div>
		);
	}
}

export default SizeSlider;