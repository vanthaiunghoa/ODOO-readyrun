import React from 'react';
import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';

import * as authActions from '../../../store/actions/authActions';

import styleConfigs from '../../../config/style.config';

import {
    ScreenWrapper,
    OverlayLoading,
    AuthInput,
    AuthButton
} from '../../../components/index';

import {
    BusinessConsultingImage
} from '../../../assets/images/index';

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 17
    },
    text: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#A3AAB1',
        fontSize: 14,
        fontWeight: 'normal'
    },
    forgotPassword: {
        alignSelf: 'stretch',
        alignItems: 'flex-end',
        marginTop: 15
    }
});

class AddNewAccountScreen extends React.Component {
    constructor(props) {
        super(props);

        this.clickLeftButton = this.clickLeftButton.bind(this);
        this.login = this.login.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);

        this.state = {
            isLoading: false,
            domain: '',
            email: '',
            password: ''
        };
    }

    clickLeftButton() {
        this.props.navigation.goBack();
    }

    login() {
        const { domain, email, password } = this.state;

        const existAccount = this.props.AUTH.accountList.filter(item => item.domain === domain);

        if (existAccount.length === 0) {
            this.setState({ isLoading: true }, () => {
                this.props.authActions.login(domain, email, password)
                    .then(payload => {
                        if (!payload.success) {
                            this.setState({ isLoading: false }, () => {
                                setTimeout(() => {
                                    Alert.alert('Thông báo', payload.data.msg);
                                }, 500);
                            });

                            return;
                        }

                        setTimeout(() => {
                            Alert.alert(
                                'Thông báo',
                                'Ứng dụng cần được khởi động lại',
                                [
                                    { text: 'Khởi động lại', onPress: () => RNRestart.Restart() }
                                ],
                                { cancelable: false }
                            );
                        }, 500);
                    })
                    .catch(error => {
                        this.setState({ isLoading: false }, () => {
                            setTimeout(() => {
                                Alert.alert('Thông báo', error.message);
                            }, 500);
                        });
                    });
            });

            return;
        }

        Alert.alert('Thông báo', 'Tài khoản đã được đăng nhập');
    }

    forgotPassword() {
        this.props.navigation.navigate('ForgotPasswordScreen');
    }

    render() {
        return (
            <ScreenWrapper
                // Screen
                barStyle='light-content'
                hasBackgroundImage
                backgroundImage={BusinessConsultingImage}
                style={{}}

                // Header
                hasHeader
                forChat={false}

                hasLeftButton
                leftIconName='arrow-back'
                onPressLeftButton={this.clickLeftButton}

                hasRightButton={false}
                rightIconName='more-vert'
                onPressRightButton={() => { }}

                hasAvatar={false}
                fullName=''
                avatarUrl=''
                onPressAvatar={() => { }}

                color='#FFFFFF'

                title='Thêm tài khoản'
                headerStyle={{}}
            >
                <OverlayLoading
                    visible={this.state.isLoading}
                    onRequestClose={() => { }}
                />

                <KeyboardAvoidingView
                    style={styles.form}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <AuthInput
                        iconName='insert-link'
                        keyboardType='email-address'
                        isPassword={false}
                        placeholder='Địa chỉ website'
                        getValue={value => { this.setState({ domain: value }); }}

                        style={{ marginBottom: 12 }}
                    />

                    <AuthInput
                        iconName='mail'
                        keyboardType='email-address'
                        isPassword={false}
                        placeholder='Địa chỉ email'
                        getValue={value => { this.setState({ email: value }); }}

                        style={{ marginBottom: 12 }}
                    />

                    <AuthInput
                        iconName='lock'
                        keyboardType='default'
                        isPassword
                        placeholder='Mật khẩu'
                        getValue={value => { this.setState({ password: value }); }}

                        style={{}}
                    />

                    <View style={styles.forgotPassword}>
                        <TouchableOpacity
                            onPress={this.forgotPassword}
                        >
                            <Text style={styles.text}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>

                    <AuthButton
                        title='Đăng nhập'
                        color='#FFFFFF'
                        backgroundColor='#1991EB'
                        borderColor='#1682D3'
                        onPress={this.login}

                        style={{ marginTop: 25 }}
                    />
                </KeyboardAvoidingView>
            </ScreenWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    AUTH: state.AUTH
});

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAccountScreen);
