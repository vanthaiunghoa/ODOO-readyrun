import * as apiHelpers from '../helpers/apiHelpers';

export function getDatabaseName(_domain) {
    const path = '/web/database/list';
    const method = 'POST';
    const headers = null;
    const body = {};
    const domain = _domain;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}

export function login(_domain, _databaseName, _email, _password) {
    const path = '/web/session/authenticate';
    const method = 'POST';
    const headers = null;
    const body = {
        params: {
            db: _databaseName,
            login: _email,
            password: _password
        }
    };
    const domain = _domain;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}
