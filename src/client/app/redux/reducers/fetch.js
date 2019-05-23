/**
 * The reducer for fetching event
 * @author gaurav sharma
 * @since 9th Janaury 2018
 */

 import { FETCHING } from '../actions/actionTypes';

 export default ( state = false, { type, fetching=false }) => {
	switch ( type ) {
		case FETCHING: return fetching;
		default: return state;
	}
 }