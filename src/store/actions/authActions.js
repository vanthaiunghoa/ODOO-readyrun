import * as services from '../../services/authServices';
import constants from '../constants/authConstants';

export function login(_domain, _email, _password) {
    return dispatch => (
        new Promise((resolve, reject) => {
            services.login(_domain, _email, _password)
                .then(payload => {
                    if (payload.success) {
                        dispatch({ type: constants.AUTH_LOGIN, data: payload.data });
                    }

                    resolve(payload);
                })
                .catch(error => {
                    reject(error);
                });
        })
    );
}

export function changeAccount(accountIndex) {
    return dispatch => dispatch({ type: constants.AUTH_CHANGE_ACCOUNT, data: accountIndex });
}

export function logout() {
    return dispatch => dispatch({ type: constants.AUTH_LOGOUT });
}
