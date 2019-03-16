import * as apiHelpers from '../helpers/apiHelpers';

export function createInbox() {
    const path = '/web/dataset/call_kw/mail.channel/message_post';
    const method = 'POST';
    const headers = null;
    const body = {};
    const domain = null;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}

export function getInbox() {
    const path = '/mail/client_action';
    const method = 'POST';
    const headers = null;
    const body = {};
    const domain = null;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}

export function getMessages(_id, _limit = null) {
    const path = '/web/dataset/call_kw/mail.message/message_fetch';
    const method = 'POST';
    const headers = null;
    const body = {
        params: {
            args: [[['channel_ids', 'in', _id]]],
            model: 'mail.message',
            method: 'message_fetch',
            kwargs: { limit: _limit || 0 }
        }
    };
    const domain = null;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}

export function sendMessage(_id, _content) {
    const path = '/web/dataset/call_kw/mail.channel/message_post';
    const method = 'POST';
    const headers = null;
    const body = {
        params: {
            args: [_id],
            model: 'mail.channel',
            method: 'message_post',
            kwargs: {
                partner_ids: [],
                body: _content,
                attachment_ids: [],
                message_type: 'comment',
                content_subtype: 'html',
                subtype: 'mail.mt_comment'
            }
        }
    };
    const domain = null;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}
