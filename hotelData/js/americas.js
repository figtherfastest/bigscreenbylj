var americas = {
    init: function () {
        var that = this
        that.AmericasTourists()
    },
    AmericasTourists: function () {
        var myChart = echarts.init(document.getElementById('AmericasTourists'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: '16%',
                y: '60%',
                data: ['美国', '加拿大', '美洲其他'],
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['40%', '65%'],
                    center: ['40%', '28%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: 335, name: '美国', itemStyle: {color: '#fec400'}},
                        {value: 310, name: '加拿大', itemStyle: {color: '#487efe'}},
                        {value: 234, name: '美洲其他', itemStyle: {color: '#4ad970'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
americas.init();

