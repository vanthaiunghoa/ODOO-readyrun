import React from 'react';
import {
    StyleSheet,
    Modal,
    ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
});

export default class OverlayLoading extends React.Component {
    /* global propTypes */
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onRequestClose: PropTypes.func.isRequired
    };

    render() {
        return (
            <Modal
                visible={this.props.visible}
                onRequestClose={this.props.onRequestClose}
                transparent
            >
                <Animatable.View
                    animation='fadeIn'
                    useNativeDriver
                    duration={500}
                    style={styles.loading}
                >
                    <ActivityIndicator
                        color='#FFFFFF'
                    />
                </Animatable.View>
            </Modal>
        );
    }
}
