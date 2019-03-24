import React from 'react';
import { Alert } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import 'moment/locale/vi';

import * as appHelpers from '../../../helpers/appHelpers';

import {
    ScreenWrapper
} from '../../../components/index';

import * as inboxServices from '../../../services/inboxServices';
import * as inboxActions from '../../../store/actions/inboxActions';

class MessagesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onSend = this.onSend.bind(this);
        this.clickLeftButton = this.clickLeftButton.bind(this);

        this.state = {
            isLoading: true,
            messages: []
        };
    }

    componentDidMount() {
        inboxServices.getMessages(this.props.navigation.state.params.id)
            .then(payload => {
                if (payload.success) {
                    this.setState({
                        isLoading: false,
                        messages: payload.data.map((item) => (
                            {
                                _id: item.id,
                                text: item.content,
                                createdAt: item.createdDate,
                                user: {
                                    _id: item.author.id,
                                    name: item.author.name
                                }
                            }
                        ))
                    });
                } else {
                    setTimeout(() => {
                        Alert.alert('Thông báo', payload.data.msg);
                    }, 500);
                }
            })
            .catch(error => {
                setTimeout(() => {
                    Alert.alert('Thông báo', error.message);
                }, 500);
            });
    }

    componentWillReceiveProps(nextProps) {
        if (
            JSON.stringify(this.props.INBOX.realTimeMessage)
            !== JSON.stringify(nextProps.INBOX.realTimeMessage)
        ) {
            const message = nextProps.INBOX.realTimeMessage;

            const authState = this.props.AUTH;
            const currentAccount = authState.accountList[authState.currentAccountIndex];

            if (
                message.author_id[0] === currentAccount.partnerId
                || message.channel_ids[0] !== this.props.navigation.state.params.id
            ) return;

            const messages = [
                {
                    _id: message.id,
                    text: appHelpers.handleHtmlTags(message.body),
                    createdAt: (new Date(message.date)).getTime(),
                    user: {
                        _id: message.author_id[0],
                        name: message.author_id[1]
                    }
                }
            ];

            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages)
            }));
        }
    }

    componentWillUnmount() {
        this.props.inboxActions.setReadInbox(this.props.navigation.state.params.id);
    }

    onSend(messages = []) {
        inboxServices.sendMessage(this.props.navigation.state.params.id, messages[0].text)
            .then(payload => {
                if (payload.success) {
                    this.setState(previousState => ({
                        messages: GiftedChat.append(previousState.messages, messages)
                    }));
                } else {
                    setTimeout(() => {
                        Alert.alert('Thông bá0', payload.data.msg);
                    }, 500);
                }
            })
            .catch(error => {
                setTimeout(() => {
                    Alert.alert('Thông bá0', error.message);
                }, 500);
            });
    }

    clickLeftButton() {
        this.props.navigation.goBack();
    }

    render() {
        const currentAccount = this.props.AUTH.accountList[this.props.AUTH.currentAccountIndex];

        return (
            <ScreenWrapper
                // Screen
                barStyle='dark-content'
                hasBackgroundImage={false}
                backgroundImage={-1}
                style={{ paddingHorizontal: 0 }}

                // Header
                hasHeader
                forChat

                hasLeftButton
                leftIconName='arrow-back'
                onPressLeftButton={this.clickLeftButton}

                hasRightButton
                rightIconName='more-vert'
                onPressRightButton={() => { }}

                hasAvatar={false}
                fullName=''
                avatarUrl=''
                onPressAvatar={() => { }}

                color='#000000'

                title={this.props.navigation.state.params.title}
                headerStyle={{ backgroundColor: '#FFFFFF' }}
            >
                <GiftedChat
                    messages={this.state.messages}
                    placeholder='Nhập nội dung tin nhắn...'
                    user={{ _id: currentAccount.partnerId }}
                    onSend={messages => this.onSend(messages)}
                    locale='vi'
                />
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    AUTH: state.AUTH,
    INBOX: state.INBOX
});

const mapDispatchToProps = (dispatch) => ({
    inboxActions: bindActionCreators(inboxActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen);
