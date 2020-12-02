import React, { useEffect } from 'react';
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


const Account = (props) => {

	useEffect(() => {
		// if (!localStorage.getItem('accessToken')) {
		// 	window.location = '/';
		// }
		document.title = 'Admin Account';
	}, [])

	const handleSwitch = (e) => {
		const { triggerSwitchNavigation } = props;
		e.preventDefault();
		const name = e.target.name || e.target.id;
		browserHistory.push(`/${name}`);
		triggerSwitchNavigation(navigationIndexer[name]);
	}

	const handleLogout = (e) => {
		e.preventDefault();
		const { type } = props;
		localStorage.removeItem('data');
		localStorage.removeItem('accessToken');
		window.location = '/';

	}
	const { active } = props;
	return <section>
		<section className='leftNavigation'>
			<section className="navigationMenu">
				<p className='text-center'><Image image={logo} /></p>
				{/* <p className="navigationHeader">LOGGED USER</p>
					<i style={{ color: 'silver' }}>{localStorage.getItem('user')}</i> */}
			</section>
			<section className="navigationMenu">
				<p className="navigationHeader">Dashboard</p>
				<button name='dashboard' className={`navigationItem ${active === navigationIndexer.dashboard ? 'activeItem' : ''}`} onClick={handleSwitch}>
					<FontAwesome id='events' name="events" onClick={handleSwitch} />&nbsp; Dashboard
					</button>
			</section>
			<section className="navigationMenu">
				<p className="navigationHeader">Contact Us</p>
				<button name='contactUs' className={`navigationItem ${active === navigationIndexer.contactUs ? 'activeItem' : ''}`} onClick={handleSwitch}>
					<FontAwesome id='tournament' name="tournament" onClick={handleSwitch} />&nbsp; Contact Us
					</button>
			</section>
			<section className="navigationMenu">
				<p className="navigationHeader">Account</p>
				<button name='logout' className={`navigationItem ${active === navigationIndexer.constants ? 'activeItem' : ''}`} onClick={handleLogout}>
					<FontAwesome id='logout' name="sign-out" onClick={handleSwitch} />&nbsp; Logout
					</button>
			</section>
		</section>
		<section className='dynamicContainer'>
			{props.children || <Dashboard />}
		</section>
	</section>;
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
