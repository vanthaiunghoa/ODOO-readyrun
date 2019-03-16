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
        borderRadius: 4,
        borderWidth: 1
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 42,
        paddingVertical: 6
    },
    input: {
        flex: 1,
        paddingRight: 15,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 16,
        fontWeight: 'normal'
    }
});

export default class SearchInput extends React.Component {
    /* global propTypes */
    static propTypes = {
        backgroundColor: PropTypes.string.isRequired,
        borderColor: PropTypes.string.isRequired,
        getValue: PropTypes.func.isRequired,

        style: PropTypes.object
    };

    /* global defaultProps */
    static defaultProps = {
        style: {}
    };

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.props.style,
                    {
                        backgroundColor: this.props.backgroundColor,
                        borderColor: this.props.borderColor
                    }
                ]}
            >
                <View style={styles.icon}>
                    <MaterialIcons
                        size={22}
                        name='search'
                        color='#8E8E93'
                    />
                </View>
                <TextInput
                    keyboardType='default'
                    onChangeText={text => this.props.getValue(text)}
                    placeholder='Tìm kiếm'
                    placeholderTextColor='#A3AAB1'
                    style={styles.input}
                    underlineColorAndroid='transparent'
                />
            </View>
        );
    }
}
