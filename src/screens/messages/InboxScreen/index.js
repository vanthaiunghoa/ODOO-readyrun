import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Alert,
    TouchableOpacity
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styleConfigs from '../../../config/style.config';
import * as appHelpers from '../../../helpers/appHelpers';

import {
    ScreenWrapper,
    TabWrapper,
    SearchInput,
    InboxItem
} from '../../../components/index';

import * as inboxActions from '../../../store/actions/inboxActions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: styleConfigs.screen.paddingHorizontal
    },
    searchView: {
        paddingTop: 6,
        paddingBottom: 8,
        paddingHorizontal: styleConfigs.screen.paddingHorizontal,
        backgroundColor: '#FFFFFF'
    },
    titleListText: {
        marginTop: 12,
        marginBottom: 6,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 14,
        fontWeight: '500'
    },
    list: {
        paddingTop: 8,
        paddingBottom: 8 + 54 + styleConfigs.screen.paddingHorizontal
    },
    addButton: {
        position: 'absolute',
        right: styleConfigs.screen.paddingHorizontal,
        bottom: styleConfigs.screen.paddingHorizontal,
        justifyContent: 'center',
        alignItems: 'center',
        width: 54,
        height: 54,
        backgroundColor: styleConfigs.color.main,
        borderRadius: 27,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 1
    }
});

class InboxScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onPressInboxItem = this.onPressInboxItem.bind(this);
        this.onRefreshMessages = this.onRefreshMessages.bind(this);
        this.onPressAddButton = this.onPressAddButton.bind(this);
        this.getNewData = this.getNewData.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.recentMessages = this.recentMessages.bind(this);
        this.messageGroups = this.messageGroups.bind(this);
        this.keyExtractor = this.keyExtractor.bind(this);
        this.renderMessageItem = this.renderMessageItem.bind(this);

        this.lastUpdateInbox = 0;

        this.state = {
            isRefreshMessages: false,
            searchText: ''
        };
    }

    componentDidMount() {
        this.getNewData();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            this.getNewData();
        }
    }

    onPressInboxItem(item) {
        this.props.inboxActions.setReadInbox(item.id);
        this.props.navigation.navigate('MessagesScreen', { id: item.id, title: item.title });
    }
    //làm mới tin nhắn chỗ này
    onRefreshMessages() {
        this.getNewData();
    }

    onPressAddButton() {
        this.props.navigation.navigate('CreateInboxScreen');
    }

    getNewData() {
        const currentTime = Date.now();

        if (currentTime < this.lastUpdateInbox + 2000) return;

        this.lastUpdateInbox = currentTime;

        this.setState({ isRefreshMessages: true }, () => {
            this.props.inboxActions.getInbox()
                .then(payload => {
                    if (!payload.success) {
                        setTimeout(() => {
                            Alert.alert('Thông bá0', payload.data.msg);
                        }, 500);

                        return;
                    }

                    this.setState({ isRefreshMessages: false });
                })
                .catch(error => {
                    setTimeout(() => {
                        Alert.alert('Thông bá0', error.message);
                    }, 500);
                });
        });
    }

    searchItem(arr, str) {
        const re = new RegExp(str, 'i');
        return arr.filter(item => item.title.search(re) >= 0);
    }

    recentMessages(_data, _searchText) {
        let messageList = _data.all.map((item) => (
            {
                id: item.id,
                title: item.name,
                message: item.lastMessage ? item.lastMessage.content : '',
                time: item.lastMessage
                    ? appHelpers.formatTimeStamp(item.lastMessage.createdDate) : '',
                avatarUrl: '',
                status: 'offline',
                isRead: item.isRead
            }
        ));

        if (_searchText) {
            messageList = this.searchItem(messageList, _searchText);
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={messageList}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={
                        ({ item, index }) => this.renderMessageItem(messageList, item, index)
                    }
                    //onRefresh={this.onRefreshMessages}
                    refreshing={this.state.isRefreshMessages}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    messageGroups(_data, _searchText) {
        let messageList = _data.groups.map((item) => (
            {
                id: item.id,
                title: item.name,
                message: item.lastMessage ? item.lastMessage.content : '',
                time: item.lastMessage
                    ? appHelpers.formatTimeStamp(item.lastMessage.createdDate) : '',
                avatarUrl: '',
                status: 'offline',
                isRead: item.isRead
            }
        ));

        if (_searchText) {
            messageList = this.searchItem(messageList, _searchText);
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={messageList}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={
                        ({ item, index }) => this.renderMessageItem(messageList, item, index)
                    }
                    //onRefresh={this.onRefreshMessages}
                    refreshing={this.state.isRefreshMessages}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    keyExtractor(item) {
        return item.id.toString();
    }

    renderMessageItem(list, item, index) {
        const priorNumber = 1;

        let titleListView = (<View />);

        if (!this.state.searchText) {
            if (index === 0 && priorNumber > 0) {
                titleListView = (
                    <Text style={styles.titleListText}>
                        {`Được ưu tiên (${priorNumber})`}
                    </Text>
                );
            }

            if (index === priorNumber) {
                titleListView = (
                    <Text style={styles.titleListText}>
                        {`Tất cả (${list.length - priorNumber})`}
                    </Text>
                );
            }
        }

        return (
            <View>
                {titleListView}

                <InboxItem
                    title={item.title}
                    message={item.message}
                    time={item.time}
                    avatarUrl={item.avatarUrl}
                    status={item.status}
                    isRead={item.isRead}

                    onPress={
                        () => { this.onPressInboxItem(item); }
                    }

                    style={{}}
                />
            </View>
        );
    }

    render() {
        const currentAccount = this.props.AUTH.accountList[this.props.AUTH.currentAccountIndex];
        const fullName = currentAccount ? currentAccount.name : '';
        const avatarUrl = currentAccount ? currentAccount.avatarUrl : '';

        return (
            <ScreenWrapper
                // Screen
                barStyle='dark-content'
                hasBackgroundImage={false}
                backgroundImage={-1}
                style={{ position: 'relative', paddingHorizontal: 0 }}

                // Header
                hasHeader
                forChat={false}

                hasLeftButton
                leftIconName='menu'
                onPressLeftButton={() => { }}

                hasRightButton={false}
                rightIconName='more-vert'
                onPressRightButton={() => { }}

                hasAvatar
                fullName={fullName}
                avatarUrl={avatarUrl}
                onPressAvatar={() => { this.props.navigation.navigate('ManageAccountsScreen'); }}

                color='#000000'

                title=''
                headerStyle={{
                    paddingBottom: 0,
                    backgroundColor: '#FFFFFF'
                }}
            >
                <View style={styles.searchView}>
                    <SearchInput
                        backgroundColor='#EEEEEE'
                        borderColor='#D5D5D5'
                        getValue={value => this.setState({ searchText: value })}

                        style={{}}
                    />
                </View>

                <TabWrapper
                    firstRouteName='Tin nhắn mới'
                    firstRoute={() => this.recentMessages(this.props.INBOX, this.state.searchText)}

                    secondRouteName='Danh sách nhóm'
                    secondRoute={() => this.messageGroups(this.props.INBOX, this.state.searchText)}

                    index={0}
                />

                <TouchableOpacity
                    onPress={this.onPressAddButton}
                    style={styles.addButton}
                >
                    <MaterialIcons
                        size={25}
                        name='add'
                        color='#FFFFFF'
                    />
                </TouchableOpacity>
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

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(InboxScreen));
