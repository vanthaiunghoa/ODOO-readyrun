import { createStackNavigator } from 'react-navigation';

import screens from '../../screens/index';

export default createStackNavigator(
    {
        SignInScreen: screens.SignInScreen,
        SignUpScreen: screens.SignUpScreen,
        ForgotPasswordScreen: screens.ForgotPasswordScreen
    }, {
        initialRouteName: 'SignInScreen',
        headerMode: 'none'
    }
);
