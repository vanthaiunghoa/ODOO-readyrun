import React from 'react';
import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    View,
    Image,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styleConfigs from '../../../config/style.config';

import {
    ScreenWrapper,
    OverlayLoading,
    AuthInput,
    AuthButton
} from '../../../components/index';

import {
    LogoImage,
    BusinessConsultingImage
} from '../../../assets/images/index';

import * as authActions from '../../../store/actions/authActions';

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 17
    },
    logo: {
        marginBottom: 30
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
    },
    createAccount: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 20
    }
});

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);

        this.state = {
            isLoading: false,
            domain: '',
            email: '',
            password: ''
        };
    }

    login() {
        this.setState({ isLoading: true }, () => {
            const { domain, email, password } = this.state;

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

                    this.props.navigation.navigate('ApplicationStack');
                })
                .catch(error => {
                    this.setState({ isLoading: false }, () => {
                        setTimeout(() => {
                            Alert.alert('Thông báo', error.message);
                        }, 500);
                    });
                });
        });
    }

    signUp() {
        this.props.navigation.navigate('SignUpScreen');
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
                hasHeader={false}
                forChat={false}

                hasLeftButton={false}
                leftIconName='arrow-back'
                onPressLeftButton={this.onClickLeftButton}

                hasRightButton={false}
                rightIconName='more-vert'
                onPressRightButton={() => { }}

                hasAvatar={false}
                fullName=''
                avatarUrl=''
                onPressAvatar={() => { }}

                color='#FFFFFF'

                title=''
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
                    <Image
                        style={styles.logo}
                        resizeMode='cover'
                        source={LogoImage}
                        resizeMethod='scale'
                    />

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

                    <View style={styles.createAccount}>
                        <Text style={styles.text}>Bạn đã có tài khoản chưa?</Text>
                        <AuthButton
                            title='Tạo tài khoản mới'
                            color='#FFFFFF'
                            backgroundColor='#39B54A'
                            borderColor='#33A242'
                            onPress={this.signUp}

                            style={{ marginTop: 10 }}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScreenWrapper>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    authActions: bindActionCreators(authActions, dispatch)
});

export default connect(null, mapDispatchToProps)(SignInScreen);
