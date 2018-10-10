var roomRadar = {
    init: function () {
        var that = this
        that.roomAnalysis()
    },
    roomAnalysis: function () {
        var myChart = echarts.init(document.getElementById('roomAnalysis'));
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
                shape: 'circle',
                splitNumber: 4,
                radius: '65%',
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
                    {name: '客栈', max: 6500},
                    {name: '五星级', max: 16000},
                    {name: '四星级', max: 30000},
                    {name: '三星级', max: 38000},
                    {name: '三星级以下', max: 52000},
                ]
            },
            series: [{
                type: 'radar',
                // areaStyle: {normal: {}},
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                symbolSize: 6, // 拐点的大小
                data: [
                    {
                        value: [4300, 10000, 28000, 35000, 50000],
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
        window.onresize = myChart.resize;
    }
}
roomRadar.init();
