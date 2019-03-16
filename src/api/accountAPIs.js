import * as apiHelpers from '../helpers/apiHelpers';

export function getAccountList() {
    const path = '/mail/client_action';
    const method = 'POST';
    const headers = null;
    const body = {};
    const domain = null;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}
