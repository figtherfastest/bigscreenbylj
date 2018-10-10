var touristPortrait = {
    init: function () {
        var that = this
        that.secenyAnalysis()
    },
    secenyAnalysis: function () {
        var myChart = echarts.init(document.getElementById('secenyAnalysis'));
        option = {
            title: {
                text: '',
                textStyle: {
                    color: '#057bff'
                }
            },
            tooltip: {
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
                    text: '游客性别\n分析',
                    x: 120,
                    y: 100,
                    textAlign: 'center',
                    // width: 50,
                    // height: 50,
                    fontSize: 14,
                    fill: '#057bff'
                },
            },
            legend: {
                orient: 'vertical',
                itemGap: 6,
                itemHeight: 8,
                itemWidth: 18,
                x: '70%',
                y: '25%',
                fontSize: 13,
                data: ['未知性别', '男性', '女性'],
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['75%', '80%'],
                    center: ['38%', '50%'],
                    label: {
                        normal: {
                            show: true,
                            // color: '#000',
                            formatter: '{b}\n{d}%',
                            fontSize: 15
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10//指示线长度
                        }
                    },
                    data: [
                        {value: 300, name: '未知性别', itemStyle: {color: '#fc7600'}},
                        {value: 258, name: '男性', itemStyle: {color: '#487efe'}},
                        {value: 800, name: '女性', itemStyle: {color: '#4ad970'}},

                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
touristPortrait.init()
