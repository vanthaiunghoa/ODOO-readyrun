import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

import styleConfigs from '../config/style.config';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'stretch',
        padding: 14,
        borderRadius: 4,
        borderWidth: 1
    },
    text: {
        fontFamily: styleConfigs.text.fontFamily,
        fontSize: 16,
        fontWeight: 'normal'
    }
});

export default class AuthButton extends React.Component {
    /* global propTypes */
    static propTypes = {
        title: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        backgroundColor: PropTypes.string.isRequired,
        borderColor: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,

        style: PropTypes.object
    };

    /* global defaultProps */
    static defaultProps = {
        style: {}
    };

    render() {
        return (
            <TouchableOpacity
                style={[
                    styles.container,
                    this.props.style,
                    {
                        backgroundColor: this.props.backgroundColor,
                        borderColor: this.props.borderColor
                    }
                ]}
                onPress={this.props.onPress}
            >
                <Text style={[styles.text, { color: this.props.color }]}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }
}
