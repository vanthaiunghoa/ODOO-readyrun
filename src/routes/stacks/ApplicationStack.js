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
                title: 'Tổng quan',
                // thêm dấu phẩy và phần ở dưới là chạy ngon lành.
                tabBarIcon: ({ tintColor }) => (<MaterialIcons name='widgets' color={tintColor} size={24} />),
            }
        },
        InboxTab: {
            ...screens.InboxScreen,
            navigationOptions: {
                title: 'Tin nhắn',
                tabBarIcon: ({ tintColor }) => (<MaterialIcons name='chat' color={tintColor} size={24} />),
            }
        },
        RemindersTab: {
            ...screens.ReminderListScreen,
            navigationOptions: {
                title: 'Lịch làm việc',
                tabBarIcon: ({ tintColor }) => (<MaterialIcons name='event' color={tintColor} size={24} />),
            }
        },
        NotificationsTab: {
            ...screens.NotificationListScreen,
            navigationOptions: {
                title: 'Thông báo',
                tabBarIcon: ({ tintColor }) => (<MaterialIcons name='notifications' color={tintColor} size={24} />),
            }
        }
        
    },
    {   
         shifting:false,
         labeled: true,
         activeTintColor: styleConfigs.color.main,
         inactiveTintColor: '#CCCCCC',
         barStyle: {
             backgroundColor: '#FFFFFF',
             borderTopColor: '#EBEBEB',
             borderTopWidth: 1
         },
        initialRouteName: 'HomeTab',
        // navigationOptions: ({ navigation }) => ({
        //     tabBarIcon: ({tintColor}) => {
        //         const { routeName } = navigation.state;
        //         let iconName;
        //         switch (routeName) {
        //             case 'HomeTab':
        //                 iconName ='widgets'
        //                 break;
        //             case 'InboxTab':
        //                 iconName ='chat'
        //                 break;
        //             case 'RemindersTab':
        //                 iconName ='event'
        //                 break;
        //             case 'NotificationsTab':
        //                 iconName ='notifications'
        //                 break;
        //             default:
        //                 break;
        //         }
        //         return (
        //             <MaterialIcons
        //                 name={iconName}
        //                 size={24}
        //                 color={tintColor}
        //             />
        //         );
        //     }
        // })
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
