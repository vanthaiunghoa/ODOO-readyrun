import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styleConfigs from '../config/style.config';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 6
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
    content: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 10
    },
    fullName: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 16,
        fontWeight: '500'
    },
    domain: {
        marginTop: 3,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 14,
        fontWeight: 'normal'
    },
    select: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

export default class AccountItem extends React.Component {
    /* global propTypes */
    static propTypes = {
        partnerId: PropTypes.number.isRequired,
        domain: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,

        isSelected: PropTypes.bool.isRequired,
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
    }

    createLetterAvatar(fullName) {
        if (!fullName) return null;

        const arr = fullName.split(' ');
        const firstLetter = arr[0].charAt(0);
        const lastLetter = arr[arr.length - 1].charAt(0);

        return (
            <Text style={styles.avatarText}>
                {`${firstLetter}${lastLetter}`}
            </Text>
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
                            this.createLetterAvatar(this.props.fullName)
                    }
                </View>

                <View style={styles.content}>
                    <Text style={styles.fullName}>{this.props.fullName}</Text>
                    <Text style={styles.domain}>{this.props.domain}</Text>
                </View>

                {
                    this.props.isSelected
                        ?
                        <View style={styles.select}>
                            <MaterialIcons
                                size={22}
                                name='check'
                                color='#1991EB'
                            />
                        </View>
                        :
                        null
                }
            </TouchableOpacity>
        );
    }
}
