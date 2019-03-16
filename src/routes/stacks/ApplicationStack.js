import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styleConfigs from '../../config/style.config';

import screens from '../../screens/index';

const TabBar = createMaterialBottomTabNavigator(
    {
        HomeTab: {
            ...screens.HomeScreen,
            navigationOptions: {
                title: 'Tổng quan'
            }
        },
        InboxTab: {
            ...screens.InboxScreen,
            navigationOptions: {
                title: 'Tin nhắn'
            }
        },
        RemindersTab: {
            ...screens.ReminderListScreen,
            navigationOptions: {
                title: 'Lịch làm việc'
            }
        },
        NotificationsTab: {
            ...screens.NotificationListScreen,
            navigationOptions: {
                title: 'Thông báo'
            }
        }
    }, {
        shifting: false,
        labeled: true,
        activeTintColor: styleConfigs.color.main,
        inactiveTintColor: '#CCCCCC',
        barStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#EBEBEB',
            borderTopWidth: 1
        },
        initialRouteName: 'HomeTab',
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ tintColor }) => {
                const { routeName } = navigation.state;

                let iconName;
                switch (routeName) {
                    case 'HomeTab':
                        iconName = 'widgets';
                        break;
                    case 'InboxTab':
                        iconName = 'chat';
                        break;
                    case 'RemindersTab':
                        iconName = 'event';
                        break;
                    case 'NotificationsTab':
                        iconName = 'notifications';
                        break;
                    default:
                        break;
                }

                return (
                    <MaterialIcons
                        name={iconName}
                        size={24}
                        color={tintColor}
                    />
                );
            }
        })
    }
);

export default createStackNavigator(
    {
        ...screens,
        TabBar: {
            screen: TabBar
        }
    }, {
        initialRouteName: 'TabBar',
        headerMode: 'none'
    }
);
