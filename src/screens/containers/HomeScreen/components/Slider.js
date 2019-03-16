import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';

import styleConfigs from '../../../../config/style.config';

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: styleConfigs.screen.paddingHorizontal
    },
    itemContainer: {
        padding: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemHeaderTitleText: {
        fontFamily: styleConfigs.text.fontFamily,
        color: '#999999',
        fontSize: 14,
        fontWeight: '500'
    },
    itemHeaderTotal: {
        marginTop: 6,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 20,
        fontWeight: '500'
    },
    itemHeaderIncreaseNumber: {
        marginBottom: 4,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 14,
        fontWeight: '500'
    },
    itemHeaderLine: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemHeaderLineText: {
        marginLeft: 6,
        fontFamily: styleConfigs.text.fontFamily,
        color: '#000000',
        fontSize: 11
    },
    itemBody: {
        flexDirection: 'row',
        height: 150,
        marginTop: 20
    },
    pagination: {
        flexDirection: 'row',
        marginTop: 10
    },
    paginationDot: {
        marginHorizontal: 2
    }
});

export default class Slider extends React.Component {
    /* global propTypes */
    static propTypes = {
        data: PropTypes.array.isRequired,
        renderItem: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);

        this.state = {
            currentIndex: 0
        };
    }

    renderItem({ item, index }) {
        return (
            <View style={styles.item}>
                <View style={styles.itemContainer}>
                    <View style={styles.itemHeader}>
                        <View>
                            <Text style={styles.itemHeaderTitleText}>
                                {item.title}
                            </Text>
                            <Text style={styles.itemHeaderTotal}>
                                <Text>{item.total}</Text>
                                <Text style={styles.itemHeaderIncreaseNumber}>
                                    {` ${item.increaseNumber}`}
                                </Text>
                            </Text>
                        </View>

                        <View>
                            <View style={styles.itemHeaderLine}>
                                <MaterialIcons
                                    size={10}
                                    name='lens'
                                    color='#1991EB'
                                />
                                <Text style={styles.itemHeaderLineText}>
                                    Hiện tại
                            </Text>
                            </View>

                            <View style={[styles.itemHeaderLine, { marginTop: 3 }]}>
                                <MaterialIcons
                                    size={10}
                                    name='lens'
                                    color='#F5A623'
                                />
                                <Text style={styles.itemHeaderLineText}>
                                    So sánh
                            </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.itemBody}>
                        {this.props.renderItem(item, index)}
                    </View>
                </View>
            </View >
        );
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Carousel
                    data={this.props.data}
                    renderItem={this.renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    onSnapToItem={index => this.setState({ currentIndex: index })}
                />
                <View style={styles.pagination}>
                    {
                        this.props.data.map((item, index) => (
                            <View
                                style={styles.paginationDot}
                                key={index}
                            >
                                <MaterialIcons
                                    size={10}
                                    name='lens'
                                    color={index === this.state.currentIndex ? '#1991EB' : '#CCCCCC'}
                                />
                            </View>
                        ))
                    }
                </View>
            </View>
        );
    }
}
