import React from 'react';
import {
    StyleSheet,
    StatusBar,
    ImageBackground,
    View,
    TouchableOpacity,
    Text,
    Image,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styleConfigs from '../config/style.config';

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: styleConfigs.color.background
    },
    container: {
        flex: 1
    },
    header: {
        alignSelf: 'stretch',
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        paddingHorizontal: styleConfigs.screen.paddingHorizontal
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    button: {
        width: 50,
        paddingVertical: 14
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        backgroundColor: '#CCCCCC',
        borderRadius: 15,
        overflow: 'hidden'
    },
    avatarImage: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    avatarText: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 13,
        fontWeight: '500'
    },
    title: {
        fontFamily: styleConfigs.text.fontFamily,
        fontSize: 24,
        fontWeight: '500'
    },
    titleForChat: {
        fontFamily: styleConfigs.text.fontFamily,
        fontSize: 16,
        fontWeight: '500'
    },
    body: {
        flex: 1,
        paddingHorizontal: styleConfigs.screen.paddingHorizontal
    }
});

export default class ScreenWrapper extends React.Component {
    /* global propTypes */
    static propTypes = {
        // Screen
        barStyle: PropTypes.string.isRequired,
        hasBackgroundImage: PropTypes.bool.isRequired,
        backgroundImage: PropTypes.number,
        style: PropTypes.object,

        // Header
        hasHeader: PropTypes.bool.isRequired,
        forChat: PropTypes.bool.isRequired,

        hasLeftButton: PropTypes.bool.isRequired,
        leftIconName: PropTypes.string,
        onPressLeftButton: PropTypes.func,

        hasRightButton: PropTypes.bool.isRequired,
        rightIconName: PropTypes.string,
        onPressRightButton: PropTypes.func,

        hasAvatar: PropTypes.bool.isRequired,
        fullName: PropTypes.string,
        avatarUrl: PropTypes.string,
        onPressAvatar: PropTypes.func,

        color: PropTypes.string.isRequired,

        title: PropTypes.string,
        headerStyle: PropTypes.object
    };

    /* global defaultProps */
    static defaultProps = {
        style: {},
        headerStyle: {}
    };

    constructor(props) {
        super(props);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderContainer = this.renderContainer.bind(this);
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

    renderHeader() {
        if (!this.props.hasHeader) return null;

        return (
            <SafeAreaView
                style={[
                    styles.header,
                    {
                        paddingBottom:
                            (this.props.title && !this.props.forChat)
                                || !this.props.title
                                ?
                                10
                                :
                                0,
                    },
                    this.props.headerStyle
                ]}
                forceInset={{
                    top: 'always',
                    bottom: 'never'
                }}
            >
                <View style={styles.buttons}>
                    {
                        this.props.hasLeftButton
                            && this.props.leftIconName
                            && this.props.onPressLeftButton
                            ?
                            <TouchableOpacity
                                onPress={this.props.onPressLeftButton}
                                style={[
                                    styles.button,
                                    { alignItems: 'flex-start', marginLeft: -3 }
                                ]}
                            >
                                <MaterialIcons
                                    size={24}
                                    name={this.props.leftIconName}
                                    color={this.props.color}
                                />
                            </TouchableOpacity>
                            :
                            null
                    }

                    {
                        this.props.forChat
                            ?
                            <Text style={styles.titleForChat}>{this.props.title}</Text>
                            :
                            null
                    }

                    {
                        !this.props.hasAvatar
                            && this.props.hasRightButton
                            && this.props.rightIconName
                            && this.props.onPressRightButton
                            ?
                            <TouchableOpacity
                                onPress={this.props.onPressRightButton}
                                style={[
                                    styles.button,
                                    { alignItems: 'flex-end', marginRight: -3 }
                                ]}
                            >
                                <MaterialIcons
                                    size={24}
                                    name={this.props.rightIconName}
                                    color={this.props.color}
                                />
                            </TouchableOpacity>
                            :
                            null
                    }

                    {
                        this.props.hasAvatar
                            && this.props.onPressAvatar
                            ?
                            <TouchableOpacity
                                onPress={this.props.onPressAvatar}
                                style={
                                    this.props.avatarUrl
                                        ?
                                        styles.avatar
                                        :
                                        [
                                            styles.avatar,
                                            { backgroundColor: 'transparent' }
                                        ]
                                }
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
                            </TouchableOpacity>
                            :
                            null
                    }
                </View>

                {
                    this.props.title && !this.props.forChat
                        ?
                        <Text style={[styles.title, { color: this.props.color }]}>
                            {this.props.title}
                        </Text>
                        :
                        null
                }
            </SafeAreaView>
        );
    }

    renderContainer() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle={this.props.barStyle}
                    backgroundColor='transparent'
                    translucent
                />

                {this.renderHeader()}

                <View style={[styles.body, this.props.style]}>
                    {this.props.children}
                </View>

                <SafeAreaView
                    forceInset={{
                        top: 'never',
                        bottom: 'always'
                    }}
                />
            </View>
        );
    }

    render() {
        if (this.props.hasBackgroundImage
            && this.props.backgroundImage) {
            return (
                <ImageBackground
                    style={styles.screen}
                    resizeMode='cover'
                    source={this.props.backgroundImage}
                    resizeMethod='scale'
                >
                    {this.renderContainer()}
                </ImageBackground >

            );
        }

        return (
            <View style={styles.screen}>
                {this.renderContainer()}
            </View>
        );
    }
}
