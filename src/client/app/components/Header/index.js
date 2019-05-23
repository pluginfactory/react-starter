import React from 'react';
import Favicon from 'react-favicon';
// load styles
import './index.scss';
// load images
import AppLogo from '../../assets/images/logo.png';
import favicon from '../../assets/images/logo.png';
// import PreRIcon from '../../assets/images/PreR-icon.png'

export default () => <section className="account-header">
		<Favicon url={favicon}/>
		<img src={AppLogo} height={30}/>
		<span><p className='pull-right'>PluginFactory App</p></span>
	</section>;
