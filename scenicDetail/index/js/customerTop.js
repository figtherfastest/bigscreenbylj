var customer = {
    init: function () {
        var that = this
        that.customerTop()
    },
    customerTop: function () {
        var myChart = echarts.init(document.getElementById('customerTop'));
        var datas = [720, 182, 191, 234, 290, 325, 225, 190, 300, 240];
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
                data: ['安徽省', '湖南省', '吉林省', '广东省', '湖北省', '台湾省', '河南省', '浙江省', '四川省', '山东省'],
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
                        color: '#000',
                        //TODO
                        offset: [240, -10],
                        formatter: '{c}/人'
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
                data: [max, max, max, max, max, max, max, max, max, max],
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
customer.init();
