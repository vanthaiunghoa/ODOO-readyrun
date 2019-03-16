import * as appHelpers from '../helpers/appHelpers';
import * as reportAPIs from '../api/reportAPIs';

export function getGeneralReports(_selecetedMonth) {
    return new Promise((resolve, reject) => {
        const { startTime, endTime } = appHelpers.getDistanceTime(_selecetedMonth);

        reportAPIs.getGeneralReports(startTime, endTime)
            .then(async ({ success, data }) => {
                const payload = {
                    success,
                    data
                };

                if (success) {
                    const distanceTime = appHelpers.getDistanceTime(_selecetedMonth - 1);

                    let oldData;
                    const response = await reportAPIs.getGeneralReports(
                        distanceTime.startTime,
                        distanceTime.endTime
                    );

                    if (response.success) {
                        oldData = response.data;
                    }

                    const compareGeneralList = (_number, _oldNumber, _character = null) => {
                        let total = appHelpers.commarize(_number);
                        total = _character ? `${_character}${total}` : total;

                        const increase = _oldNumber && _number >= _oldNumber;

                        let icon = increase ? '+' : '-';
                        icon = _character ? `${icon}${_character}` : icon;

                        const increaseNumber
                            = `${icon}${appHelpers.commarize(Math.abs(_number - _oldNumber))}`;

                        return {
                            total,
                            increase,
                            increaseNumber
                        };
                    };

                    const compareCharts = (_numbers, _oldNumbers, _chartType, _character = null) => {
                        const getItemName = (_type, _item) => {
                            switch (_type) {
                                case 'line-chart':
                                    return _item['date_due:day'];
                                case 'bar-chart':
                                    return _item.user_id ? _item.user_id[1] : '';
                                default:
                                    return '';
                            }
                        };

                        const arr = _numbers.map(item => item.amount_total_signed);
                        let total = arr.length > 0 ? arr.reduce((sum, num) => sum + num) : 0;

                        const dataForChart = arr.map((item, index) => ({
                            name: getItemName(_chartType, _numbers[index]),
                            value: (item * 100) / total
                        }));

                        let oldTotal = 0;
                        let dataForOldChart = [];
                        if (_oldNumbers) {
                            const oldArr = _oldNumbers.map(item => item.amount_total_signed);
                            oldTotal = oldArr.length > 0 ? oldArr.reduce((sum, num) => sum + num) : 0;
                            dataForOldChart = oldArr.map((item, index) => ({
                                name: getItemName(_chartType, _oldNumbers[index]),
                                value: (item * 100) / oldTotal
                            }));
                        }

                        const increase = total >= oldTotal;

                        let icon = increase ? '+' : '-';
                        icon = _character ? `${icon}${_character}` : icon;

                        const increaseNumber
                            = `${icon}${appHelpers.commarize(Math.abs(total - oldTotal))}`;

                        total = appHelpers.commarize(total);
                        total = _character ? `${_character}${total}` : total;

                        return {
                            total,
                            increase,
                            increaseNumber,
                            type: _chartType,
                            data: dataForChart,
                            data2: dataForOldChart
                        };
                    };

                    const generalItemOfList0
                        = compareGeneralList(data[0].data, oldData ? oldData[0].data : 0, '$');
                    const generalItemOfList1
                        = compareGeneralList(data[1].data, oldData ? oldData[1].data : 0, '$');
                    const generalItemOfList2
                        = compareGeneralList(data[2].data, oldData ? oldData[2].data : 0, '$');
                    const generalItemOfList3
                        = compareGeneralList(data[3].data, oldData ? oldData[3].data : 0);

                    const generalChartsItem1 = compareCharts(data[6].data, oldData ? oldData[6].data : null, 'line-chart', '$');
                    const generalChartsItem2 = compareCharts(data[7].data, oldData ? oldData[7].data : null, 'bar-chart', '$');

                    payload.data = {
                        generalList: [
                            {
                                title: 'Doanh số',
                                total: generalItemOfList0.total,
                                increase: generalItemOfList0.increase,
                                increaseNumber: generalItemOfList0.increaseNumber
                            },
                            {
                                title: 'Tổng chi',
                                total: generalItemOfList1.total,
                                increase: generalItemOfList1.increase,
                                increaseNumber: generalItemOfList1.increaseNumber
                            },
                            {
                                title: 'Tổng thu',
                                total: generalItemOfList2.total,
                                increase: generalItemOfList2.increase,
                                increaseNumber: generalItemOfList2.increaseNumber
                            },
                            {
                                title: 'Số cơ hội',
                                total: generalItemOfList3.total,
                                increase: generalItemOfList3.increase,
                                increaseNumber: generalItemOfList3.increaseNumber
                            }
                        ],
                        generalCharts: [
                            {
                                title: 'Doanh thu theo ngày',
                                total: generalChartsItem1.total,
                                increase: generalChartsItem1.increase,
                                increaseNumber: generalChartsItem1.increaseNumber,
                                type: generalChartsItem1.type,
                                data: generalChartsItem1.data,
                                data2: generalChartsItem1.data2
                            }
                        ],
                        peopleCharts: [
                            {
                                title: 'Doanh thu bán hàng',
                                total: generalChartsItem2.total,
                                increase: generalChartsItem2.increase,
                                increaseNumber: generalChartsItem2.increaseNumber,
                                type: generalChartsItem2.type,
                                data: generalChartsItem2.data,
                                data2: generalChartsItem2.data2
                            }
                        ]
                    };
                }

                resolve(payload);
            })
            .catch(error => {
                reject(error);
            });
    });
}
