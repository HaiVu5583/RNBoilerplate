import { combineReducers } from 'redux';
import { home } from '~/src/store/reducers/home';
import { ui } from '~/src/store/reducers/ui'
import { query } from '~/src/store/reducers/query'
import { auth } from '~/src/store/reducers/auth'

const rootReducer = combineReducers({
    home,
    ui,
    query,
    auth
});

export default rootReducer;