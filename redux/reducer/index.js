import {combineReducers} from 'redux';
import session from './session';
import room from './room'

export * from './session';

export default combineReducers({
    session, room
});
