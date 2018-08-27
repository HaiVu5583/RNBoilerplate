import { combineReducers } from 'redux';
import { home } from '~/src/store/reducers/home';
import { ui } from '~/src/store/reducers/ui'

const rootReducer = {
    home,
    ui
};

export default rootReducer;