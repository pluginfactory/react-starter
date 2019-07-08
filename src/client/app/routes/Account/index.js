import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
// loading assets
import Dashboard from '../Dashboard';
import Image from '../../components/Image';
import logo from '../../assets/images/logo.png';
import './index.scss';

class Account extends Component {
	constructor(props) {
		super(props);

		this.handleSwitch = this.handleSwitch.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleSwitch(e) {
		const { triggerSwitchNavigation } = this.props;
		e.preventDefault();
		const name = e.target.name  || e.target.id;
		browserHistory.push(`/${name}`);
		triggerSwitchNavigation(navigationIndexer[name]);
	}

	componentWillMount() {
		// if (!localStorage.getItem('accessToken')) {
		// 	window.location = '/';
		// }
	}

	componentDidMount() {
		document.title = 'Admin Account';
	}

	handleLogout(e) {
		e.preventDefault();
		const { type } = this.props;
		localStorage.removeItem('data');
		localStorage.removeItem('accessToken');
		window.location = '/';

	}

	render() {
		const { active } = this.props;
		return <section>
			<section className='leftNavigation'>
				<section className="navigationMenu">
					<p className='text-center'><Image image={logo} /></p>
					{/* <p className="navigationHeader">LOGGED USER</p>
					<i style={{ color: 'silver' }}>{localStorage.getItem('user')}</i> */}
				</section>
				<section className="navigationMenu">
					<p className="navigationHeader">Dashboard</p>
					<button name='dashboard' className={`navigationItem ${active === navigationIndexer.dashboard ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='users' name="events" onClick={this.handleSwitch} />&nbsp; Dashboard
					</button>
				</section>
				<section className="navigationMenu">
					<button name='Users' className={`navigationItem ${active === navigationIndexer.users ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='user' name="users" onClick={this.handleSwitch} />&nbsp; Users
					</button>
				</section>
				<section className="navigationMenu">
					<button name='Transaction' className={`navigationItem ${active === navigationIndexer.transaction ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='money-check-alt' name="transaction" onClick={this.handleSwitch} />&nbsp; Transaction
					</button>
				</section>
				<section className="navigationMenu">
					<button name='PushNotification' className={`navigationItem ${active === navigationIndexer.notifications ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='bell' name="notification" onClick={this.handleSwitch} />&nbsp;Notification
					</button>
				</section>
				<section className="navigationMenu">
					<button name='Users' className={`navigationItem ${active === navigationIndexer.news ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='icons' name="news" onClick={this.handleSwitch} />&nbsp; News
					</button>
				</section>
				<section className="navigationMenu">
					<p className="navigationHeader">Contact Us</p>
					<button name='contactUs' className={`navigationItem ${active === navigationIndexer.contactUs ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='tournament' name="tournament" onClick={this.handleSwitch} />&nbsp; Contact Us
					</button>
				</section>
				<section className="navigationMenu">
					<p className="navigationHeader">Account</p>
					<button name='logout' className={`navigationItem ${active === navigationIndexer.constants ? 'activeItem' : ''}`} onClick={this.handleLogout}>
						<FontAwesome id='logout' name="sign-out" onClick={this.handleSwitch} />&nbsp; Logout
					</button>
				</section>
			</section>
			<section className='dynamicContainer'>
				{this.props.children || <Dashboard />}
			</section>
		</section>;
	}
}

const mapDispatchToProps = dispatch => {
	return {
		triggerSwitchNavigation: (active) => dispatch(switchNavigation({ active })),
	}
}

const mapStateToProps = state => {
	const { fetching, navigation: { active } } = state;
	return { fetching, active };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
// export default AdminIndex;
