/**
 * dispatch the fetch action
 */
import { FETCHING } from './actionTypes';

export default ({ fetching = false }) => { return { type: FETCHING, fetching };}