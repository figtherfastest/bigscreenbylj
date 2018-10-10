var rightendpie = {
    init: function () {
        var that = this
        that.visiteAnalysis()
    },
    visiteAnalysis: function () {
        var myChart = echarts.init(document.getElementById('visiteAnalysis'));
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
                    radius: '60%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 335, name: '飞机', itemStyle: {color: '#4b7efe'}},
                        {value: 310, name: '轮船', itemStyle: {color: '#fec400'}},
                        {value: 234, name: '大巴', itemStyle: {color: '#fc7600'}},
                        {value: 135, name: '其它', itemStyle: {color: '#4ad970'}},
                        {value: 1548, name: '火车', itemStyle: {color: '#36d9fc'}}
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
rightendpie.init();
