var oceania = {
    init: function () {
        var that = this
        that.oceaniaTourists()
    },
    oceaniaTourists: function () {
        var myChart = echarts.init(document.getElementById('oceaniaTourists'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                itemGap: 1,
                x: '16%',
                y: '60%',
                data: ['澳大利亚', '新西兰', '大洋洲其他'],
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
                        {value: 335, name: '澳大利亚', itemStyle: {color: '#fec400'}},
                        {value: 310, name: '新西兰', itemStyle: {color: '#487efe'}},
                        {value: 234, name: '大洋洲其他', itemStyle: {color: '#4ad970'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
oceania.init();

