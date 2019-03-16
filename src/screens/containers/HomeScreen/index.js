import React from 'react';
import {
    StyleSheet,
    ScrollView,
    RefreshControl,
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import io from 'socket.io-client';
import firebase from 'react-native-firebase';

import styleConfigs from '../../../config/style.config';
import systemConfigs from '../../../config/system.config';

import {
    ScreenWrapper
} from '../../../components/index';

import * as reportServices from '../../../services/reportServices';
import * as inboxActions from '../../../store/actions/inboxActions';

import {
    Slider,
    Charts
} from './components/index';

const styles = StyleSheet.create({
    group: {
        marginTop: 20
    },
    time: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: styleConfigs.screen.paddingHorizontal
    },
    timeToday: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeTodayText: {
        marginLeft: 5,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 14,
        fontWeight: '500'
    },
    timeButtons: {
        flexDirection: 'row'
    },
    timeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 26,
        height: 26,
        backgroundColor: '#E9EDF1',
        borderRadius: 13,
        borderColor: '#D1D4D8',
        borderWidth: 1
    },
    general: {
        flexDirection: 'row',
        marginTop: 15
    },
    generalItem: {
        width: 150,
        marginRight: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderColor: '#FFFFFF',
        borderWidth: 1
    },
    generalItemTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    generalItemTitleText: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 14,
        fontWeight: '500'
    },
    generalItemTotal: {
        marginTop: 6,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 20,
        fontWeight: '500'
    },
    generalItemIncreaseNumber: {
        marginBottom: 4,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 14,
        fontWeight: '500'
    }
});

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onRefreshMessages = this.onRefreshMessages.bind(this);
        this.getNewData = this.getNewData.bind(this);
        this.initRealTime = this.initRealTime.bind(this);
        this.initFirebase = this.initFirebase.bind(this);
        this.changeMonth = this.changeMonth.bind(this);
        this.renderGeneralItem = this.renderGeneralItem.bind(this);

        this.state = {
            isRefreshMessages: false,
            selecetedMonth: (new Date()).getMonth(),
            generalList: [],
            generalCharts: [],
            peopleCharts: []
        };
    }

    componentDidMount() {
        this.getNewData(this.state.selecetedMonth);
        this.initRealTime();
        this.initFirebase();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isFocused && nextProps.isFocused) {
            this.onRefreshMessages();
        }
    }

    componentWillUnmount() {
        this.onTokenRefreshListener();
        this.messageListener();
    }

    onRefreshMessages() {
        this.setState({
            isRefreshMessages: true,
            selecetedMonth: (new Date()).getMonth()
        }, () => {
            this.getNewData(this.state.selecetedMonth)
                .then(
                    () => this.setState({ isRefreshMessages: false })
                );
        });
    }

    async getNewData(selecetedMonth) {
        await reportServices.getGeneralReports(selecetedMonth)
            .then(payload => {
                if (payload.success) {
                    this.setState({
                        generalList: payload.data.generalList,
                        generalCharts: payload.data.generalCharts,
                        peopleCharts: payload.data.peopleCharts,
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

    initRealTime() {
        const authState = this.props.AUTH;
        const currentAccount = authState.accountList[authState.currentAccountIndex];

        this.socket = io(`${systemConfigs.SOCKET_URL}:${systemConfigs.SOCKET_PORT}`, {
            reconnection: true,
            reconnectionDelay: 5000
        });

        this.socket.on('connect', () => {
            this.socket.emit('authenticate', {
                session_id: currentAccount.sessionId,
                host: `https://${currentAccount.domain}`
            });
        });

        this.socket.on('events', data => {
            console.log('SOCKET.IO EVENTS', data);
        });

        this.socket.on(
            `message_${currentAccount.db}_app.message_${currentAccount.partnerId}`,
            data => {
                const newMessage = JSON.parse(data);
                console.log('SOCKET.IO NEW_MESSAGE', newMessage);

                this.props.inboxActions.getRealTimeMessage(newMessage);
            }
        );

        this.socket.on('disconnect', () => { });
    }

    async initFirebase() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            // user has permissions
        }

        const token = await firebase.messaging().getToken();
        if (token) {
            console.log('FIREBASE TOKEN', token);
        }

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(newToken => {
            console.log('FIREBASE NEW_TOKEN', newToken);
        });

        this.messageListener = firebase.messaging().onMessage(message => {
            console.log('FIREBASE MESSAGE', message);
        });
    }

    changeMonth(actionType) {
        const { selecetedMonth } = this.state;

        const currentMonth = (new Date()).getMonth();

        let month;

        if (actionType === 'increase') {
            if (selecetedMonth === currentMonth) {
                month = 0;
            } else {
                month = selecetedMonth + 1;
            }
        } else if (actionType === 'decrease') {
            if (selecetedMonth === 0) {
                month = currentMonth;
            } else {
                month = selecetedMonth - 1;
            }
        }

        this.setState({ selecetedMonth: month });

        this.getNewData(month);
    }

    renderGeneralItem(item, index) {
        let itemStyle = styles.generalItem;

        if (index === 0) {
            itemStyle = [
                styles.generalItem,
                {
                    marginLeft: styleConfigs.screen.paddingHorizontal,
                    backgroundColor: '#1991EB',
                    borderColor: '#1682D3'
                }
            ];
        } else if (index === this.state.generalList.length - 1) {
            itemStyle = [
                styles.generalItem,
                { marginRight: styleConfigs.screen.paddingHorizontal }
            ];
        }

        return (
            <View
                style={itemStyle}
                key={index}
            >
                <View style={styles.generalItemTitle}>
                    <Text
                        style={
                            index === 0
                                ?
                                [styles.generalItemTitleText, { color: '#FFFFFF' }]
                                :
                                styles.generalItemTitleText
                        }
                    >
                        {item.title}
                    </Text>
                    <MaterialIcons
                        size={20}
                        name={
                            item.increase ? 'arrow-drop-up' : 'arrow-drop-down'
                        }
                        color={index === 0 ? '#FFFFFF' : '#000000'}
                    />
                </View>
                <Text
                    style={
                        index === 0
                            ?
                            [styles.generalItemTotal, { color: '#FFFFFF' }]
                            :
                            styles.generalItemTotal
                    }
                >
                    {item.total}
                </Text>
                <Text
                    style={
                        index === 0
                            ?
                            [styles.generalItemIncreaseNumber, { color: '#FFFFFF' }]
                            :
                            styles.generalItemIncreaseNumber
                    }
                >
                    {item.increaseNumber}
                </Text>
            </View>
        );
    }

    render() {
        const currentAccount = this.props.AUTH.accountList[this.props.AUTH.currentAccountIndex];
        const fullName = currentAccount ? currentAccount.name : '';
        const avatarUrl = currentAccount ? currentAccount.avatarUrl : '';

        const currentYear = (new Date()).getFullYear();

        return (
            <ScreenWrapper
                // Screen
                barStyle='dark-content'
                hasBackgroundImage={false}
                backgroundImage={-1}
                style={{ paddingHorizontal: 0 }}

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

                title='Tổng quan'
                headerStyle={{ backgroundColor: '#FFFFFF' }}
            >
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshMessages}
                            onRefresh={this.onRefreshMessages}
                        />
                    }
                >
                    <View style={styles.group}>
                        <View style={styles.time}>
                            <View style={styles.timeToday}>
                                <MaterialIcons
                                    size={24}
                                    name='today'
                                    color='#999999'
                                />

                                <Text style={styles.timeTodayText}>
                                    {
                                        this.state.selecetedMonth === 0
                                            ? `Tháng 12/${currentYear - 1} và Tháng ${this.state.selecetedMonth + 1}/${currentYear}`
                                            : `Tháng ${this.state.selecetedMonth}/${currentYear} và Tháng ${this.state.selecetedMonth + 1}/${currentYear}`
                                    }
                                </Text>
                            </View>

                            <View style={styles.timeButtons}>
                                <TouchableOpacity
                                    onPress={() => this.changeMonth('decrease')}
                                    style={[styles.timeButton, { marginRight: 6 }]}
                                >
                                    <MaterialIcons
                                        size={22}
                                        name='chevron-left'
                                        color='#999999'
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => this.changeMonth('increase')}
                                    style={styles.timeButton}
                                >
                                    <MaterialIcons
                                        size={22}
                                        name='chevron-right'
                                        color='#999999'
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        style={styles.general}
                    >
                        {
                            this.state.generalList.map(
                                (item, index) => this.renderGeneralItem(item, index)
                            )
                        }
                    </ScrollView>

                    <View style={styles.group}>
                        <Slider
                            data={this.state.generalCharts}
                            renderItem={(item) => (
                                <Charts
                                    type={item.type}
                                    data={item.data}
                                    data2={item.data2}
                                />
                            )}
                        />
                    </View>

                    <View style={[styles.group, { marginBottom: 20 }]}>
                        <Slider
                            data={this.state.peopleCharts}
                            renderItem={(item) => (
                                <Charts
                                    type={item.type}
                                    data={item.data}
                                    data2={item.data2}
                                />
                            )}
                        />
                    </View>
                </ScrollView>
            </ScreenWrapper >
        );
    }
}

const mapStateToProps = (state) => ({
    AUTH: state.AUTH
});

const mapDispatchToProps = (dispatch) => ({
    inboxActions: bindActionCreators(inboxActions, dispatch)
});

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));
