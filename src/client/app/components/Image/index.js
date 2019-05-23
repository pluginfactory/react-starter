/**
 * This component represents a sample image component for application
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DefaultImage from '../../assets/images/profile.png';
import './index.scss';

class CustomImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			image: this.props.image || DefaultImage
		};
	}

	render() {
		const classNames = `litnite-image ${this.props.className && this.props.className}`;
		const { width=50, height=50 } = this.props;
		const { image } = this.state;
		return <img className={classNames} src={image} width={width} height={50} onError={() => this.setState({ image: DefaultImage })}/>
	}
}

CustomImage.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	radius: PropTypes.number
}

export default CustomImage;