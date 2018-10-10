/*var weather = {
    init: function () {
        var that = this
        that.weatherBar()
    },
    weatherBar: function () {
        var myChart = echarts.init(document.getElementById('weatherBar'));
        option = {
            title: {
                subtext: '单位：℃',
                subtextStyle: {
                    color: '#000'
                }
            },
            color: ['#5d95fc'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%', 
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
                    axisTick: {
                        alignWithLabel: false,
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'gray',//x轴线颜色
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisTick: {
                        alignWithLabel: false,
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'gray',//y轴线颜色
                        }
                    }
                },

            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: '40%',
                    data: [10, 32, 20, 33, 39, 33, 22, 22, 22, 22, 22, 22]
                }
            ]
        };
        myChart.setOption(option);
    }
}
	weather.init();
