import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router';

import { navigationIndexer } from '../../constants';
import { switchNavigation } from '../../redux/actions';
// loading assets
import Events from '../Events';
import Tournament from '../Tournament';
import logo from '../../assets/images/logo.png';
import './index.scss';

class AdminIndex extends Component {
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
					<p className="navigationHeader">LOGGED USER</p>
					<i style={{ color: 'silver' }}>{localStorage.getItem('user')}</i>
				</section>
				<section className="navigationMenu">
					<p className="navigationHeader">Events</p>
					<button name='events' className={`navigationItem ${active === navigationIndexer.events ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='events' name="events" onClick={this.handleSwitch} />&nbsp; Events
					</button>
				</section>
				<section className="navigationMenu">
					<p className="navigationHeader">Tournaments</p>
					<button name='tournament' className={`navigationItem ${active === navigationIndexer.tournament ? 'activeItem' : ''}`} onClick={this.handleSwitch}>
						<FontAwesome id='tournament' name="tournament" onClick={this.handleSwitch} />&nbsp; Tournament
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
				{this.props.children || <Events />}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex);
// export default AdminIndex;
