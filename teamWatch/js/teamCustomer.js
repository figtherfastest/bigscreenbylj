var customers = {
    init: function () {
        var that = this
        that.teamCustomer()
    },
    teamCustomer: function () {
        var myChart = echarts.init(document.getElementById('teamCustomer'));
        var datas = [720, 182, 191, 234, 290];
        var max = Math.max.apply(null, datas) / 0.85;
        option = {
            title: {
                text: ''
            },
            xAxis: {
                type: 'value',
                max: max,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                data: ['吉林省', '浙江省', '湖北省', '广东省', '四川省'],
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    margin: -4,
                    align: 'left',
                    verticalAlign: 'bottom',
                    padding: [0, 0, 10, 0]
                }

            },

            series: [{
                type: 'bar',
                data: datas,
                barWidth: 10,
                z: 30,
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        //TODO
                        offset: [270, -10],
                        color: '#000',
                        formatter: '{c}'
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 4,
                        color: '#0ecdf8'
                    }
                }
            }, {
                type: 'bar',
                data: [max, max, max, max, max],
                barWidth: 10,
                barGap: '-90%',
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: '#def1ff'
                    }
                }
            }]
        };
        myChart.setOption(option);
    }
}
customers.init();
