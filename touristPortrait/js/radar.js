var radars = {
    init: function () {
        var that = this
        that.stayAnalysis()
    },
    stayAnalysis: function () {
        var myChart = echarts.init(document.getElementById('stayAnalysis'));
        option = {
            title: {
                text: '',
                textStyle: {
                    color: '#057bff'
                }
            },
            tooltip: {},
            legend: {
                data: []
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#057bff' // 图表背景网格线的颜色
                }
            },
            radar: {
                //shape: 'circle',
                radius: '60%',
                center: ['50%', '50%'],
                splitNumber: 8,
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#057bff', // 设置网格的颜色
                    },
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: '#fff', // 图表背景的颜色
                    },
                },
                name: {
                    textStyle: {
                        color: '#000',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [
                    {name: '一天', max: 6500},
                    {name: '两天', max: 16000},
                    {name: '三天', max: 30000},
                    {name: '四天', max: 38000},
                    {name: '五天', max: 52000},
                    {name: '五天以上', max: 25000}
                ]
            },
            series: [{
                type: 'radar',
                // areaStyle: {normal: {}},
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                symbolSize: 6, // 拐点的大小
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000, 19000],
                        name: '',
                        areaStyle: {
                            normal: {
                                color: '#f7b67f'
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#fc7600',
                            },
                        },
                    },
                ]
            }]
        };
        myChart.setOption(option);
    }
}
radars.init();
