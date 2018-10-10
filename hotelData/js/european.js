var european = {
    init: function () {
        var that = this
        that.europeanTourists()
    },
    europeanTourists: function () {
        var myChart = echarts.init(document.getElementById('europeanTourists'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: [
                {
                    orient: 'vertical',
                    x: '50%',
                    y: '60%',
                    data: ['法国', '意大利', '欧洲其他'],
                },
                {
                    orient: 'vertical',
                    x: '1%',
                    y: '60%',
                    data: ['英国', '德国', '瑞士'],
                }
            ],
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
                        {value: 335, name: '英国', itemStyle: {color: '#fc7600'}},
                        {value: 310, name: '德国', itemStyle: {color: '#487efe'}},
                        {value: 234, name: '瑞士', itemStyle: {color: '#13ad2d'}},
                        {value: 235, name: '法国', itemStyle: {color: '#fec400'}},
                        {value: 350, name: '意大利', itemStyle: {color: '#00bbf0'}},
                        {value: 250, name: '欧洲其他', itemStyle: {color: '#4ad970'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
european.init();

