/**
 * Resuable Pagination component
 * @author gaurav sharma
 * @since 22nd September 2018
 */
import React from 'react';
import FontAwesome from 'react-fontawesome';
import './index.css';

export default ({
	page,
	limit,
	total,
	length,
	alignment = 'text-center',
	nextHandler,
	previousHander,
}) => <section className={alignment}>
	{ (page !== 1) && <button className='app-btn btn-sm plain paginationBack' onClick={previousHander}>
		<FontAwesome name='chevron-left'/>&nbsp;{ page - 1 }
	</button>}
	&nbsp;&nbsp;<span style={{ color: 'grey', fontSize: '12px'}}>Showing entries {limit * (page - 1) + 1} to {((limit * (page - 1)) ) + length} { total && ` of ${total} results`}</span>&nbsp;
	{(length === limit) && <button className='app-btn btn-sm plain paginationNext' onClick={nextHandler}>
		{ page + 1 }&nbsp;<FontAwesome name='chevron-right'/>
	</button>}
</section>