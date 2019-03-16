import { combineReducers } from 'redux';

import authReducer from './authReducer';
import inboxReducer from './inboxReducer';

const reducers = combineReducers({
    AUTH: authReducer,
    INBOX: inboxReducer
});

export default reducers;
