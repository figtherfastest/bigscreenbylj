var africa = {
    init: function () {
        var that = this
        that.africaTourists()
    },
    africaTourists: function () {
        var myChart = echarts.init(document.getElementById('africaTourists'));
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
                    data: ['肯尼亚', '埃塞俄比亚', '非洲其他'],
                },
                {
                    orient: 'vertical',
                    x: '1%',
                    y: '60%',
                    data: ['埃及', '摩洛哥', '突尼斯'],
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
                        {value: 335, name: '埃及', itemStyle: {color: '#fc7600'}},
                        {value: 310, name: '摩洛哥', itemStyle: {color: '#487efe'}},
                        {value: 234, name: '突尼斯', itemStyle: {color: '#13ad2d'}},
                        {value: 235, name: '肯尼亚', itemStyle: {color: '#fec400'}},
                        {value: 350, name: '埃塞俄比亚', itemStyle: {color: '#00bbf0'}},
                        {value: 250, name: '非洲其他', itemStyle: {color: '#4ad970'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
africa.init();

