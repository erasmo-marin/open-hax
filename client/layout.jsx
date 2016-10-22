import React from 'react';
import Header from './Components/Header';
import './Less/main.less';


class Layout extends React.Component {

	constructor (props) {
		super(props);
	}


	render () {
		return (
				<div>
					<Header/>
					<div className="main-container">
						{this.props.children}
					</div>
				</div>
			);
	}
} 

export default Layout;