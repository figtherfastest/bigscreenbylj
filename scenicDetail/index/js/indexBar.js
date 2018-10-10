var bars = {
    init: function () {
        var that = this
        that.indexBar()
    },
    indexBar: function () {
        var myChart = echarts.init(document.getElementById('indexBar'));
        option = {
            color: ['#3398DB'],
            title: {
                text: '',
                subtext: '单位:次',
                y: -5,
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
                bottom: '0.1%',
                top: '20%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['四川省', '北京市', '重庆市', '云南省', '广东省', '湖北省', '甘肃省', '河北省', '湖南省', '江苏省'],
                    axisLabel: {
                        interval: 0,
                        rotate: 40
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
                        // formatter: '{value}.00%'
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
                    barWidth: '50%',
                    color: '#4b7efe',
                    itemStyle: {
                        emphasis: {
                            barBorderRadius: 30
                        },
                        normal: {
                            barBorderRadius: [5, 0, 0, 0],
                            label: {
                                normal: {
                                    show: false,
                                    //formatter: '{c}%',
                                    // position: 'top',
                                }
                            },
                        }
                    },
                    data: [10, 52, 60, 30, 40, 35, 20, 40, 35, 42]
                }
            ]
        };
        myChart.setOption(option);
    }
}
bars.init();
