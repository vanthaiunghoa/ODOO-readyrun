import authConstants from '../constants/authConstants';
import constants from '../constants/inboxConstants';
import * as appHelpers from '../../helpers/appHelpers';

const initialState = {
    all: [],
    groups: [],
    realTimeMessage: null
};

export default (state, action) => {
    if (!state) {
        return initialState;
    }

    if (
        action.type === authConstants.AUTH_LOGIN
        || action.type === authConstants.AUTH_CHANGE_ACCOUNT
        || action.type === authConstants.AUTH_LOGOUT
    ) return initialState;

    switch (action.type) {
        case constants.INBOX_GET_ALL:
            const newAllInbox = createNewInbox(
                state.all, [
                    ...action.data.publicInbox,
                    ...action.data.privateInbox,
                    ...action.data.directInbox
                ]
            );

            const newGroups = createNewInbox(
                state.groups, [
                    ...action.data.publicInbox,
                    ...action.data.directInbox
                ]
            );

            return {
                ...state,
                all: newAllInbox,
                groups: newGroups
            };
        case constants.INBOX_GET_REAL_TIME_MESSAGE:
            const newMessage = action.data;

            const message = {
                id: newMessage.channel_ids[0],
                name: newMessage.record_name,
                lastMessage: {
                    content: appHelpers.handleHtmlTags(newMessage.body),
                    createdDate: (
                        new Date(appHelpers.replaceAll(newMessage.date, '-', '/'))
                    ).getTime()
                }
            };

            const newInbox = receiveRealTimeMessage(state.all, message);

            return {
                ...state,
                all: newInbox,
                realTimeMessage: newMessage
            };
        case constants.INBOX_SET_READ_INBOX:
            return {
                ...state,
                all: setReadInbox(state.all, action.data),
                groups: setReadInbox(state.groups, action.data)
            };
        default:
            return state;
    }
};

function createNewInbox(oldData, newData) {
    let inbox = oldData;

    if (inbox.length === 0) {
        inbox = newData.map((item) => (
            {
                ...item,
                isRead: true
            }
        ));
    } else {
        newData.forEach((item) => {
            let isExisted = false;

            inbox.forEach((oldItem, index) => {
                if (oldItem.id === item.id) {
                    inbox[index] = {
                        ...item,
                        isRead: inbox[index].isRead
                    };

                    isExisted = true;
                }
            });

            if (!isExisted) {
                inbox.push({
                    ...item,
                    isRead: false
                });
            }
        });
    }

    return inbox.sort(sortItem);
}

function receiveRealTimeMessage(oldData, message) {
    let inbox = oldData;

    if (inbox.length === 0) {
        inbox = [{
            ...message,
            isRead: false
        }];
    } else {
        let isExisted = false;

        inbox.forEach((oldItem, index) => {
            if (oldItem.id === message.id) {
                inbox[index] = {
                    ...oldItem,
                    lastMessage: message.lastMessage,
                    isRead: false
                };

                isExisted = true;
            }
        });

        if (!isExisted) {
            inbox.push({
                ...message,
                isRead: false
            });
        }
    }

    return inbox.sort(sortItem);
}

function setReadInbox(messages, id) {
    return messages.map((item) => ({
        ...item,
        isRead: item.id === id ? true : item.isRead
    }));
}

function sortItem(a, b) {
    return b.lastMessage.createdDate - a.lastMessage.createdDate;
}

