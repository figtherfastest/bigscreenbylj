var asia = {
    init: function () {
        var that = this
        that.AsiaTourists()
    },
    AsiaTourists: function () {
        // var myChart = echarts.init(document.getElementById('AsiaTourists'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: [
                {
                    orient: 'vertical',
                    x: '30%',
                    y: '60%',
                    data: ['马来西亚', '韩国', '印度'],
                },
                {
                    orient: 'vertical',
                    x: '1%',
                    y: '60%',
                    data: ['日本', '新加坡', '泰国'],
                }
            ],
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '70%;',
                    //center: ['10%', '48%'],
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
                        // {value: 335, name: '日本', itemStyle: {color: '#fc7600'}},
                        // {value: 310, name: '新加坡', itemStyle: {color: '#487efe'}},
                        // {value: 234, name: '泰国', itemStyle: {color: '#13ad2d'}},
                        // {value: 235, name: '马来西亚', itemStyle: {color: '#fec400'}},
                        // {value: 250, name: '韩国', itemStyle: {color: '#00bbf0'}},
                        // {value: 450, name: '印度', itemStyle: {color: '#4ad970'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
asia.init();

