import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router';
import Favicon from 'react-favicon';
// load styles
import './index.scss';
// load images
import Tutable from '../../assets/images/logo.png';
import favicon from '../../assets/images/favicon.png';
// import PreRIcon from '../../assets/images/PreR-icon.png'

export default () => <section className="account-header">
		{/* <Favicon url={favicon}/> */}
		<img src={Tutable} height={30}/>
		{/* <Navbar color="dark" style={{ background: 'linear-gradient(90deg, rgba(65,212,167,1) 0%, rgba(74,214,168,1) 35%, rgba(65,212,167,1), rgba(170,237,181,1) 100%)'}} light expand="md">
			<NavbarBrand>
				<Link to={"/"}><img src={Tutable} height="30px"/></Link>
			</NavbarBrand>
		</Navbar> */}
		<span><p className='pull-right'>Admin</p></span>
	</section>;
