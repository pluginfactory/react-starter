/**
 * this component represents the thumbnail image
 */
import React from 'react';

//import assets
import EmptyThumbnail from '../../assets/images/profile.png';
import './index.scss';

export default (props) => {
	const { image = EmptyThumbnail, width = 200, height = 200, className } = this.props;
	const classes = `thumbnail-image ${className ? className : ''}`;
	return <img src={image} width={width} height={height} className={classes} />
}