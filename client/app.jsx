import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, NotFoundRoute } from 'react-router';
import { browserHistory } from 'react-router';

import Layout from './layout';
import Game from './game'

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (<Router history={browserHistory}>
					<Route path="/" component={ Layout }>
						<IndexRoute component={ Game } />
			        </Route>
				</Router>);
	}
}

export default App;