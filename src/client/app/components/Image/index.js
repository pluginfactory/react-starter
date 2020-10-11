/**
 * This component represents a sample image component for application
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DefaultImage from '../../assets/images/profile.png';
import './index.scss';


const CustomImage = (props) => {
	const [image, setImage] = useState("")
	useEffect(() => {
		setImage(props.image || DefaultImage)
	}, [props.image])

	const classNames = `litnite-image ${props.className && props.className}`;
	const { width = 50, height = 50 } = props;

	return <img className={classNames} src={image} width={width} height={50} onError={() => setState({ image: DefaultImage })} />
}

CustomImage.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	radius: PropTypes.number
}

export default CustomImage;