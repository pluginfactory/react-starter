/**
 * dispatch the navgation change triggers
 */
import { SWITCH_NAVIGATION } from './actionTypes';

export default ({ active = 1 }) => { return { type: SWITCH_NAVIGATION, active }};