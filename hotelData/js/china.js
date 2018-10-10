var china = {
    init: function () {
        var that = this
        that.chinaTourists()
    },
    chinaTourists: function () {
        var myChart = echarts.init(document.getElementById('chinaTourists'));
        option = {
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            graphic: {
                type: 'text',
                top: 'center',
                // left: 'center',
                z: 2,
                zlevel: 100,
                style: {
                    text: '北京市',
                    x: 123,
                    y: 105,
                    textAlign: 'center',
                    width: 30,
                    height: 30,
                    fontSize: 16
                },
                fontSize: 20,
            },
            legend: [
                {
                    orient: 'vertical',
                    x: '50%',
                    y: '60%',
                    data: ['海南', '西藏', '中国其他'],
                },
                {
                    orient: 'vertical',
                    x: '1%',
                    y: '60%',
                    data: ['北京', '新疆', '云南'],
                }
            ],
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['50%', '75%'],
                    center: ['40%', '28%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: true,
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: [
                        {value: 335, name: '北京', itemStyle: {color: '#fc7600'}},
                        {value: 310, name: '新疆', itemStyle: {color: '#487efe'}},
                        {value: 234, name: '云南', itemStyle: {color: '#13ad2d'}},
                        {value: 235, name: '海南', itemStyle: {color: '#fec400'}},
                        {value: 350, name: '西藏', itemStyle: {color: '#00bbf0'}},
                        {value: 250, name: '中国其他', itemStyle: {color: '#4ad970'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
china.init();

