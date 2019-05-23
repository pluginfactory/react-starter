import React from 'react';
import {
	Router,
	Route,
	// hashHistory,
	browserHistory,
} from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import InitStore from '../redux/store';

import Admin from './Admin';
import AdminAccount from './AdminAccount';
import Events from './Events';
import Tournament from './Tournament';


// const history = syncHistoryWithStore(hashHistory, InitStore());
export default () => {
	return <Provider store={InitStore()}>
		<Router history={browserHistory}>
			<Route path="/" component={Admin} />

			<Route path="/adminAccount" strict={true} component={AdminAccount}>
				<Route path='/adminAccount' component={Events} />
				<Route path='/events' component={Events} />
				<Route path='/tournament' component={Tournament} />
			</Route>
		</Router>
	</Provider>;
}
