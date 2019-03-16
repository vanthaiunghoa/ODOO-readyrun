import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import PropTypes from 'prop-types';

import styleConfigs from '../config/style.config';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 8
    },
    avatarView: {
        position: 'relative',
        width: 44,
        height: 44
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 44,
        height: 44,
        backgroundColor: '#CCCCCC',
        borderRadius: 22,
        overflow: 'hidden'
    },
    avatarImage: {
        width: 44,
        height: 44,
        borderRadius: 22
    },
    avatarText: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 16,
        fontWeight: '500'
    },
    status: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 12,
        height: 12,
        backgroundColor: '#36D732',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: styleConfigs.color.background
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 13
    },
    title: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 16,
        fontWeight: '500'
    },
    message: {
        marginTop: 2,
        fontFamily: styleConfigs.text.fontFamily,
        fontSize: 14
    },
    time: {
        marginTop: 5,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 12,
        fontWeight: 'normal'
    }
});

export default class InboxItem extends React.Component {
    /* global propTypes */
    static propTypes = {
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        status: PropTypes.oneOf(['online', 'offline', 'busy']).isRequired,
        isRead: PropTypes.bool.isRequired,

        onPress: PropTypes.func.isRequired,

        style: PropTypes.object
    };

    /* global defaultProps */
    static defaultProps = {
        style: {}
    };

    constructor(props) {
        super(props);

        this.createLetterAvatar = this.createLetterAvatar.bind(this);
        this.renderAvatar = this.renderAvatar.bind(this);
    }

    createLetterAvatar(title) {
        if (!title) return null;

        const arr = title.split(' ');
        const firstLetter = arr[0].charAt(0);
        const lastLetter = arr[arr.length - 1].charAt(0);

        return (
            <Text style={styles.avatarText}>
                {`${firstLetter}${lastLetter}`}
            </Text>
        );
    }

    renderAvatar() {
        let statusColor = '#CCCCCC';
        switch (this.props.status) {
            case 'online':
                statusColor = '#36D732';
                break;
            case 'offline':
                statusColor = '#CCCCCC';
                break;
            case 'busy':
                statusColor = '#C0392B';
                break;
            default:
                break;
        }

        return (
            <View style={styles.avatarView}>
                <View style={styles.avatar}>
                    {
                        this.props.avatarUrl
                            ?
                            <Image
                                style={styles.avatarImage}
                                resizeMode='cover'
                                source={{ uri: this.props.avatarUrl }}
                                resizeMethod='scale'
                            />
                            :
                            this.createLetterAvatar(this.props.title)
                    }

                </View>
                <View style={[styles.status, { backgroundColor: statusColor }]} />
            </View>
        );
    }

    render() {
        return (
            <TouchableOpacity
                style={[
                    styles.container,
                    this.props.style
                ]}
                onPress={this.props.onPress}
            >
                {this.renderAvatar()}

                <View style={styles.content}>
                    <Text
                        numberOfLines={1}
                        style={styles.title}
                    >
                        {this.props.title}
                    </Text>

                    <Text
                        numberOfLines={1}
                        style={[
                            styles.message,
                            {
                                color: this.props.isRead ? '#999999' : '#000000',
                                fontWeight: this.props.isRead ? 'normal' : '500'
                            }
                        ]}
                    >
                        {this.props.message}
                    </Text>
                </View>

                <Text style={styles.time}>{this.props.time}</Text>
            </TouchableOpacity>
        );
    }
}
