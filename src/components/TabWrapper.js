import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import PropTypes from 'prop-types';
import { TabView, SceneMap } from 'react-native-tab-view';

import styleConfigs from '../config/style.config';

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    tabBarItem: {
        flex: 1
    },
    tabBarItemView: {
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 2
    },
    tabBarItemText: {
        fontFamily: styleConfigs.text.fontFamily,
        fontSize: 14,
        fontWeight: '500'
    }
});

export default class TabWrapper extends React.Component {
    /* global propTypes */
    static propTypes = {
        firstRouteName: PropTypes.string.isRequired,
        firstRoute: PropTypes.func.isRequired,

        secondRouteName: PropTypes.string.isRequired,
        secondRoute: PropTypes.func.isRequired,

        index: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);

        this.renderTabBar = this.renderTabBar.bind(this);

        this.state = {
            index: this.props.index,
            routes: [
                { key: 'first', title: this.props.firstRouteName },
                { key: 'second', title: this.props.secondRouteName }
            ]
        };
    }

    renderTabBar(props) {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {
                    props.navigationState.routes.map((route, i) => {
                        const color = props.position.interpolate({
                            inputRange,
                            outputRange: inputRange.map(
                                inputIndex => (
                                    inputIndex === i ? styleConfigs.color.main : '#CCCCCC'
                                )
                            ),
                        });

                        return (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.setState({ index: i })}
                                style={styles.tabBarItem}
                                key={i}
                            >
                                <Animated.View
                                    style={[styles.tabBarItemView, { borderBottomColor: color }]}
                                >
                                    <Animated.Text
                                        style={[
                                            styles.tabBarItemText,
                                            { color }
                                        ]}
                                    >
                                        {route.title}
                                    </Animated.Text>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        );
    }

    render() {
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={index => this.setState({ index })}
                renderScene={SceneMap({
                    first: this.props.firstRoute,
                    second: this.props.secondRoute
                })}
                renderTabBar={this.renderTabBar}
                initialLayout={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                }}
            />
        );
    }
}
