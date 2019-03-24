để chạy được project cũ:
add tất cả các thư viện bên dưới:
+copy fire google sevirse bên project cũ qua.
+setup lại file android/app/build.gradle.
+sữa lại đường dẫn android/setting.gradle.
+sữa src/routers/index.js:
{
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
}
(nhớ sữa chỗ app.js lại thành <container />)


   "metro": "^0.53.0",
    "moment": "^2.24.0",
    "react": "16.6.3",
    "react-native": "0.58.6",
    "react-native-animatable": "^1.3.1",
    "react-native-config": "^0.11.7",
    "react-native-cookies": "^3.3.0",
    "react-native-firebase": "^5.2.3",
    "react-native-gesture-handler": "^1.1.0",
    "react-native-gifted-chat": "^0.7.2",
    "react-native-paper": "^2.13.0",
    "react-native-restart": "0.0.9",
    "react-native-snap-carousel": "^3.7.5",
    "react-native-svg": "^9.3.3",
    "react-native-svg-charts": "^5.2.0",
    "react-native-vector-icons": "^6.4.1",
    "react-navigation": "^3.3.2",
    "react-navigation-material-bottom-tabs": "^1.0.0",
    "react-redux": "^6.0.1",
    "redux": "^4.0.1",
    "redux-persist": "^5.10.0",
    "redux-thunk": "^2.3.0",
    "socket.io-client": "^2.2.0"

    các lỗi đã được fix:
    +fix lỗi ở trên cho app chạy được ,ahihi
    +fix lỗi không hiển thị icon

    các lỗi cần fix:
    +load lại tất cả dữ liệu khi ra vào messages
    +đăng nhập hoặc thoát ra phải khởi động lại ứng dụng