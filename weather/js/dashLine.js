/*var wartersLine = {
    init: function () {
        var that = this
        that.wartersLines()
    },
    wartersLines: function () {
        var myChart = echarts.init(document.getElementById('wartersLines'));
        option = {
            title: {
                subtext: '单位：mb',
                subtextStyle: {
                    color: '#000'
                }
            },
            xAxis: {
                type: 'category',
                data: ['10:00', '11.00', '12.00', '13.00', '14.00', '15.00'],
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'gray',//y轴线颜色
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    alignWithLabel: false,
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'gray',//y轴线颜色
                    }
                }
            },
            series: [{
                data: [2, 3, 5, 8, 4, 6],
                type: 'line',
                symbol: "none",
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#fbb224',
                            type: 'dashed'
                        }
                    }
                },
            }]
        };
        myChart.setOption(option);
    }
}
wartersLine.init();
*/