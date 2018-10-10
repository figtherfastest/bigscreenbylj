var rightPie = {
    init: function () {
        var that = this
        that.consumption()
    },
    consumption: function () {
        var myChart = echarts.init(document.getElementById('consumption'))
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
                y: 'bottom',
                data: []
            },
            calculable: true,
            series: [
                {
                    name: '消费分析',
                    type: 'pie',
                    radius: [30, 75],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    label: {
                        normal: {
                            show: true,
                            // color: '#000',
                            formatter: '{b}\n{d}%'
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 5
                        }
                    },
                    data: [
                        {value: 35, name: '6000以上', itemStyle: {color: '#fc7600'}},
                        {value: 20, name: '5000-6000', itemStyle: {color: '#fca400'}},
                        {value: 25, name: '4000-5000', itemStyle: {color: '#fec400'}},
                        {value: 15, name: '3000-4000', itemStyle: {color: '#4c6ffc'}},
                        {value: 5, name: '300-2000', itemStyle: {color: '#4997fc'}},
                        {value: 10, name: '2000以下', itemStyle: {color: '#4bdaac'}},
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }
}
rightPie.init()
