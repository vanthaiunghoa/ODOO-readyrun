import React from 'react';
import {
    View
} from 'react-native';
import PropTypes from 'prop-types';
import {
    LineChart,
    BarChart,
    XAxis,
    YAxis,
    Grid
} from 'react-native-svg-charts';

export default class Charts extends React.PureComponent {
    /* global propTypes */
    static propTypes = {
        type: PropTypes.oneOf(['line-chart', 'bar-chart']).isRequired,
        data: PropTypes.array.isRequired,
        data2: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.renderCharts = this.renderCharts.bind(this);
    }

    renderCharts() {
        const type = this.props.type;

        if (type === 'line-chart') {
            return (
                <View style={{ flex: 1 }}>
                    <LineChart
                        style={{ flex: 1 }}
                        data={this.props.data2.map(item => item.value)}
                        svg={{ stroke: '#F5A623' }}
                    />
                    <LineChart
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%'
                        }}
                        data={this.props.data.map(item => item.value)}
                        svg={{ stroke: '#1991EB' }}
                    >
                        <Grid />
                    </LineChart>
                </View>
            );
        } else if (type === 'bar-chart') {
            const data = this.props.data.map(item => item.value);
            const data2 = this.props.data2.map(item => item.value);

            const barData = [
                {
                    data: data2,
                    svg: { fill: '#F5A623' }
                },
                {
                    data,
                    svg: { fill: '#1991EB' }
                }
            ];

            return (
                <View style={{ flex: 1 }}>
                    <BarChart
                        style={{ flex: 1 }}
                        data={barData}
                    >
                        <Grid />
                    </BarChart>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <YAxis
                    data={this.props.data.map(item => item.value)}
                    svg={{ fontSize: 10, fill: '#999999' }}
                    style={{ marginRight: 10 }}
                    contentInset={{ top: 5, bottom: 25 }}
                    numberOfTicks={this.props.data.length}
                    formatLabel={value => value}
                />
                <View style={{ flex: 1 }}>
                    {this.renderCharts()}

                    <XAxis
                        data={this.props.data.map(item => item.value)}
                        svg={{ fontSize: 10, fill: '#999999' }}
                        style={{ marginTop: 10 }}
                        contentInset={{ left: 5, right: 5 }}
                        formatLabel={(value, index) => this.props.data[index].name}
                    />
                </View>
            </View>
        );
    }
}
