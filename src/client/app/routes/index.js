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

import LandingPage from './LandingPage';
import AdminAccountPage from './Account';
import DashboardPage from './Dashboard';
import ContactUsPage from './ContactUs';
import Users from './Users';
import Transaction from './Transaction';
import NewsAndUpdate from './NewsAndUpdate';
import PushNotification from './PushNotification';

// const history = syncHistoryWithStore(hashHistory, InitStore());
export default () => {
	return <Provider store={InitStore()}>
		<Router history={browserHistory}>
			<Route path="/" component={LandingPage} />

			<Route path="/adminAccount" strict={true} component={AdminAccountPage}>
				<Route path='/account' component={DashboardPage} />
				<Route path='/dashboard' component={DashboardPage} />
				<Route path='/contactUs' component={ContactUsPage} />
				<Route path='/users' component={Users} />
				<Route path='/transaction' component={Transaction} />
				<Route path='/pushNotification' component={PushNotification} />
				<Route path='/newsAndUpdate' component={NewsAndUpdate} />
			</Route>
		</Router>
	</Provider>;
}
