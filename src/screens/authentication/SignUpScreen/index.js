import React from 'react';
import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import styleConfigs from '../../../config/style.config';

import {
    ScreenWrapper,
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
    support: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
        paddingHorizontal: 17
    },
    text: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#A3AAB1',
        fontSize: 14,
        fontWeight: 'normal'
    }
});

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);

        this.clickLeftButton = this.clickLeftButton.bind(this);
    }

    clickLeftButton() {
        this.props.navigation.goBack();
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

                title='Tạo tài khoản mới'
                headerStyle={{}}
            >
                <KeyboardAvoidingView
                    style={styles.form}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <AuthInput
                        iconName='insert-link'
                        keyboardType='email-address'
                        isPassword={false}
                        placeholder='Địa chỉ website'
                        getValue={value => { }}

                        style={{ marginBottom: 12 }}
                    />

                    <AuthInput
                        iconName='mail'
                        keyboardType='email-address'
                        isPassword={false}
                        placeholder='Địa chỉ email'
                        getValue={value => { }}

                        style={{ marginBottom: 12 }}
                    />

                    <AuthInput
                        iconName='account-circle'
                        keyboardType='default'
                        isPassword={false}
                        placeholder='Tên đầy đủ'
                        getValue={value => { }}

                        style={{ marginBottom: 12 }}
                    />

                    <AuthInput
                        iconName='lock'
                        keyboardType='default'
                        isPassword
                        placeholder='Mật khẩu'
                        getValue={value => { }}

                        style={{ marginBottom: 12 }}
                    />

                    <AuthInput
                        iconName='lock'
                        keyboardType='default'
                        isPassword
                        placeholder='Xác nhận mật khẩu'
                        getValue={value => { }}

                        style={{}}
                    />

                    <AuthButton
                        title='Đăng ký'
                        color='#FFFFFF'
                        backgroundColor='#39B54A'
                        borderColor='#33A242'
                        onPress={() => { }}

                        style={{ marginTop: 25 }}
                    />
                </KeyboardAvoidingView>

                <View style={styles.support}>
                    <Text style={styles.text}>Đồng ý với </Text>
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <Text style={[styles.text, { color: '#FFFFFF' }]}>
                            Chính sách và Điều khoản
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.text}> sử dụng</Text>
                </View>
            </ScreenWrapper>
        );
    }
}
