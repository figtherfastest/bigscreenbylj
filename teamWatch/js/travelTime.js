var teamTime = {
    init: function () {
        var that = this
        that.travelTime()
    },
    travelTime: function () {
        var myChart = echarts.init(document.getElementById('travelTime'))
        option = {
            title: {
                text: '',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#057bff',
                    x: 50,
                    y: 10
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 10,
                data: []
            },
            label: {
                normal: {
                    show: true,
                    formatter: '{d}%'
                }
            },
            calculable: true,
            series: [
                {
                    name: '消费分析',
                    type: 'pie',
                    radius: [30, 70],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    labelLine: {
                        normal: {
                            length: 5
                        }
                    },
                    data: [
                        {value: 5, name: '四天', itemStyle: {color: '#4997fc'}},
                        {value: 15, name: '三天', itemStyle: {color: '#4c6ffc'}},
                        {value: 25, name: '两天', itemStyle: {color: '#fec400'}},
                        {value: 20, name: '一天', itemStyle: {color: '#fca400'}}, ,
                        {value: 35, name: '五天', itemStyle: {color: '#fc7600'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
teamTime.init()
