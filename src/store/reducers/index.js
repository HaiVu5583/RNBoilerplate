import { combineReducers } from 'redux';
import { home } from '~/src/store/reducers/home';
import { ui } from '~/src/store/reducers/ui'
import { query } from '~/src/store/reducers/query'

const rootReducer = combineReducers({
    home,
    ui,
    query
});

export default rootReducer;