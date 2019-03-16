import { createSwitchNavigator ,createAppContainer} from 'react-navigation';

import screens from '../screens/index';

import {
    AuthenticationStack,
    ApplicationStack
} from './stacks/index';
// export default createSwitchNavigator(
//     {
//         AuthLoadingScreen: screens.AuthLoadingScreen,
//         AuthenticationStack,
//         ApplicationStack
//     },
//     {
//         initialRouteName: 'AuthLoadingScreen'
//     }
// );
const AppSwitchNavigation = createSwitchNavigator(
    {
        AuthLoadingScreen: screens.AuthLoadingScreen,
        AuthenticationStack,
        ApplicationStack
    },
    {
        initialRouteName: 'AuthLoadingScreen'
    }
  );
   export const AppContainer = createAppContainer(AppSwitchNavigation);