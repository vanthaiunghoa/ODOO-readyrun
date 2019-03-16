import React from 'react';
import {
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    View,
    Text,
    TouchableOpacity,
    Linking
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
        justifyContent: 'center',
        marginBottom: 20,
    },
    text: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#A3AAB1',
        fontSize: 14,
        fontWeight: 'normal'
    }
});

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);

        this.clickLeftButton = this.clickLeftButton.bind(this);
        this.callSupport = this.callSupport.bind(this);
    }

    clickLeftButton() {
        this.props.navigation.goBack();
    }

    callSupport() {
        Linking.openURL('tel:19001800');
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

                title='Quên mật khẩu'
                headerStyle={{}}
            >
                <KeyboardAvoidingView
                    style={styles.form}
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <AuthInput
                        iconName='mail'
                        keyboardType='email-address'
                        isPassword={false}
                        placeholder='Địa chỉ email'
                        getValue={value => { }}

                        style={{}}
                    />

                    <AuthButton
                        title='Gửi mật khẩu mới'
                        color='#FFFFFF'
                        backgroundColor='#1991EB'
                        borderColor='#1682D3'
                        onPress={() => { }}

                        style={{ marginTop: 20 }}
                    />

                </KeyboardAvoidingView>

                <View style={styles.support}>
                    <Text style={styles.text}>Gọi </Text>
                    <TouchableOpacity
                        onPress={this.callSupport}
                    >
                        <Text style={[styles.text, { color: '#FFFFFF' }]}>
                            1900 1800
                            </Text>
                    </TouchableOpacity>
                    <Text style={styles.text}> để được hỗ trợ</Text>
                </View>
            </ScreenWrapper>
        );
    }
}
