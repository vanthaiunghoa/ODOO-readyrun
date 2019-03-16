// Import auth's screens
import AuthLoadingScreen from './authentication/AuthLoadingScreen/index';
import SignInScreen from './authentication/SignInScreen/index';
import SignUpScreen from './authentication/SignUpScreen/index';
import ForgotPasswordScreen from './authentication/ForgotPasswordScreen/index';

// Import app's screens
import HomeScreen from './containers/HomeScreen/index';

// Import messages's screen
import InboxScreen from './messages/InboxScreen/index';
import CreateInboxScreen from './messages/CreateInboxScreen/index';
import MessagesScreen from './messages/MessagesScreen/index';

// Import reminders's screen
import ReminderListScreen from './reminders/ReminderListScreen/index';

// Import notifications's screen
import NotificationListScreen from './notifications/NotificationListScreen/index';

// Import accounts's screen
import ManageAccountsScreen from './accounts/ManageAccountsScreen/index';
import AddNewAccountScreen from './accounts/AddNewAccountScreen/index';

export default {
    // Auth's screens
    AuthLoadingScreen: {
        screen: AuthLoadingScreen
    },
    SignInScreen: {
        screen: SignInScreen
    },
    SignUpScreen: {
        screen: SignUpScreen
    },
    ForgotPasswordScreen: {
        screen: ForgotPasswordScreen
    },

    // App's screens
    HomeScreen: {
        screen: HomeScreen
    },

    // Messages's screen
    InboxScreen: {
        screen: InboxScreen
    },
    CreateInboxScreen: {
        screen: CreateInboxScreen
    },
    MessagesScreen: {
        screen: MessagesScreen
    },

    // Reminders's screen
    ReminderListScreen: {
        screen: ReminderListScreen
    },

    // Notifications's screen
    NotificationListScreen: {
        screen: NotificationListScreen
    },

    // Accounts's screen
    ManageAccountsScreen: {
        screen: ManageAccountsScreen
    },
    AddNewAccountScreen: {
        screen: AddNewAccountScreen
    }
};
