import React from 'react';
import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styleConfigs from '../config/style.config';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: 'rgba(172, 172, 172, 0.5)',
        borderRadius: 4
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 55,
        paddingVertical: 12
    },
    input: {
        flex: 1,
        paddingRight: 16,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'normal'
    }
});

export default class AuthInput extends React.Component {
    /* global propTypes */
    static propTypes = {
        iconName: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        getValue: PropTypes.func.isRequired,
        isPassword: PropTypes.bool.isRequired,

        keyboardType: PropTypes.string,
        style: PropTypes.object
    };

    /* global defaultProps */
    static defaultProps = {
        keyboardType: 'default',
        style: {}
    };

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.icon}>
                    <MaterialIcons
                        size={24}
                        name={this.props.iconName}
                        color='#FFFFFF'
                    />
                </View>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={this.props.isPassword}
                    keyboardType={this.props.keyboardType}
                    onChangeText={text => this.props.getValue(text)}
                    placeholder={this.props.placeholder}
                    placeholderTextColor='#A3AAB1'
                    style={styles.input}
                    underlineColorAndroid='transparent'
                />
            </View>
        );
    }
}
