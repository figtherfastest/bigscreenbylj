var bars = {
    init: function () {
        var that = this
        that.travelAnalysis()
    },
    travelAnalysis: function () {
        var myChart = echarts.init(document.getElementById('travelAnalysis'));
        option = {
            color: ['#3398DB'],
            title: {
                text: '',
                subtext: '单位:次',
                subtextStyle: {
                    color: '#000'
                }
            },
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
                    data: ['观光游览', '休闲度假', '探亲访友', '商务会展', '科技交流', '会议培训', '健康/疗养', '其他'],
                    axisLabel: {
                        interval: 0,
                        rotate: 30,

                    },
                    axisTick: {       //x轴刻度线
                        "show": false
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        formatter: '{value}%'
                    },
                    show: true,
                    axisTick: {       //y轴刻度线
                        "show": false
                    },
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: '40%',
                    barMinHeight: '40%',
                    color: '#4b7efe',
                    label: {
                        normal: {
                            show: true,
                            formatter: '{c}%',
                            position: 'top',
                        }
                    },
                    data: [10, 52, 60, 30, 40, 35, 20, 40]
                }
            ]
        };
        myChart.setOption(option);
    }
}
bars.init();
