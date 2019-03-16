import * as services from '../../services/inboxServices';
import constants from '../constants/inboxConstants';

export function getInbox() {
    return dispatch => (
        new Promise((resolve, reject) => {
            services.getInbox()
                .then(payload => {
                    if (payload.success) {
                        dispatch({ type: constants.INBOX_GET_ALL, data: payload.data });
                    }

                    resolve(payload);
                })
                .catch(error => {
                    reject(error);
                });
        })
    );
}

export function getRealTimeMessage(_message) {
    return dispatch => {
        dispatch({ type: constants.INBOX_GET_REAL_TIME_MESSAGE, data: _message });
    };
}

export function setReadInbox(_id) {
    return dispatch => {
        dispatch({ type: constants.INBOX_SET_READ_INBOX, data: _id });
    };
}
