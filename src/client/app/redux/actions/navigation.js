/**
 * dispatch the navgation change triggers
 */
import { SWITCH_NAVIGATION } from './actionTypes';

export default ({ active }) => { return { type: SWITCH_NAVIGATION, active }};