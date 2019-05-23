/**
 * dispatch an error
 */
import { ERROR } from './actionTypes';
export default ({ error }) => {
	return { type: ERROR, error };
}