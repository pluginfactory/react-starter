/**
 * the account index component
 *
 */
import React from 'react';

import { browserHistory } from 'react-router';
// import Favicon from 'react-favicon';

// load assets
import './index.scss';
// import favicon from '../../assets/images/favicon.png';


export default (props) => {
	const handleLogout = (e) => {
		e.preventDefault();
		const { type } = props;
		localStorage.removeItem('adminAccessToken');
		window.location = '/';

	}
	return <section className='account-header'>
		{/* <Favicon url={favicon}/> */}
		{/* <img src={Logo} height={30}/>  */}
		<h2 className='logo-text-account'>Social</h2>
		<p className='text-center' style={{ position: 'absolute', width: '100%', top: '0', marginTop: '10px' }}>Admin</p>
		<span><a href onClick={handleLogout}>Logout</a></span>
	</section>;
}