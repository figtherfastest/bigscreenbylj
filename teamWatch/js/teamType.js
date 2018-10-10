var teamType = {
    init: function () {
        var that = this
        that.teamtype()
    },
    teamtype: function () {
        var myChart = echarts.init(document.getElementById('teamtype'));
        option = {
            title: {
                text: '',
                subtext: '',
                textStyle: {
                    color: '#057bff'
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '80%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 335, name: '出境游', itemStyle: {color: '#36d9fc'}},
                        {value: 60, name: '出境游', itemStyle: {color: '#4b7efe'}},
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
}
teamType.init();
