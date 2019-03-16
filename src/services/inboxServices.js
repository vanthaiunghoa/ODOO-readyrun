import * as appHelpers from '../helpers/appHelpers';
import * as inboxAPIs from '../api/inboxAPIs';

export function getInbox() {
    const getLastMessage = async (item) => await inboxAPIs.getMessages(item.id, 1)
        .then(result => {
            if (result.success) {
                let lastMessage;

                if (result.data.length > 0) {
                    lastMessage = result.data[0];
                } else {
                    lastMessage = {
                        body: '',
                        date: ''
                    };
                }


                lastMessage.date = appHelpers.replaceAll(lastMessage.date, '-', '/');

                return {
                    id: item.id,
                    name: item.name,
                    lastMessage: {
                        content: appHelpers.handleHtmlTags(lastMessage.body),
                        createdDate: lastMessage.date ? (new Date(lastMessage.date)).getTime() : (new Date()).getTime()
                    }
                };
            }
        })
        .catch(error => console.log(error));

    return new Promise((resolve, reject) => {
        inboxAPIs.getInbox()
            .then(async ({ success, data }) => {
                const payload = {
                    success,
                    data
                };

                if (success) {
                    const channels = data.channel_slots;

                    payload.data = {
                        publicInbox: await Promise.all(
                            channels.channel_channel.map(getLastMessage)
                        ),
                        privateInbox: await Promise.all(
                            channels.channel_private_group.map(getLastMessage)
                        ),
                        directInbox: await Promise.all(
                            channels.channel_direct_message.map(getLastMessage)
                        )
                    };
                }

                resolve(payload);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function getMessages(_id) {
    return new Promise((resolve, reject) => {
        inboxAPIs.getMessages(_id)
            .then(async ({ success, data }) => {
                const payload = {
                    success,
                    data
                };

                if (success) {
                    payload.data = data.map((item) => ({
                        id: item.id,
                        content: appHelpers.handleHtmlTags(item.body),
                        author: {
                            id: item.author_id[0],
                            name: item.author_id[1]
                        },
                        createdDate: (
                            new Date(appHelpers.replaceAll(item.date, '-', '/'))
                        ).getTime()
                    }));
                }

                resolve(payload);
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function sendMessage(_id, _content) {
    return new Promise((resolve, reject) => {
        inboxAPIs.sendMessage(_id, _content)
            .then(async ({ success, data }) => {
                const payload = {
                    success,
                    data
                };

                resolve(payload);
            })
            .catch(error => {
                reject(error);
            });
    });
}
