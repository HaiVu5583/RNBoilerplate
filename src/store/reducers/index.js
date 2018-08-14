import { combineReducers } from 'redux';
import { home } from '~/src/store/reducers/home';

const rootReducer = combineReducers({
    home
});

export default rootReducer;