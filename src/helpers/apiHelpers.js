import CookieManager from 'react-native-cookies';

import { store } from '../store/index';

export function handleResponse(_path, _method, _headers = null, _body = null, _domain = null) {
    return new Promise(async (resolve, reject) => {
        await CookieManager.clearAll();

        const currentAuthState = store.getState().AUTH;
        const currentAccountIndex = currentAuthState.currentAccountIndex;
        const accountList = currentAuthState.accountList;

        let sessionId;
        let domain = _domain;

        if (
            !domain
            && accountList.length > 0
            && accountList[currentAccountIndex]
        ) {
            sessionId = accountList[currentAccountIndex].sessionId;
            domain = accountList[currentAccountIndex].domain;
        }

        const url = `https://${domain}${_path}`;

        let headers = {
            'Content-Type': 'application/json'
        };

        if (!_domain) {
            headers = Object.assign(headers, { Cookie: `session_id=${sessionId};` });
        }

        if (_headers) {
            headers = Object.assign(headers, _headers);
        }

        let requests = {
            method: _method,
            headers
        };

        if (_body) {
            requests = Object.assign(requests, { body: JSON.stringify(_body) });
        }

        console.log('API_REQUESTS', url, requests);

        return fetch(url, requests)
            .then(res => {
                console.log('API_RESPONSE', res);

                const status = res.status;

                if (status === 500) {
                    const error = {
                        code: 'SERVER_ERROR',
                        msg: 'Internal Server Error'
                    };

                    resolve({ success: false, data: error });
                } else {
                    res.json()
                        .then(resJson => {
                            console.log('API_JSON_RESPONSE', resJson);

                            const data = resJson;

                            if (status === 200) {
                                if (!data.error) {
                                    resolve({ success: true, data: data.result });
                                } else {
                                    const error = {
                                        code: data.error.code,
                                        msg: data.error.message
                                    };

                                    resolve({ success: false, data: error });
                                }
                            }
                        });
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
