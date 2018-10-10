var scenicSpot = {
    init: function () {
        var that = this
        that.scenicSpotData()
    },
    scenicSpotData: function () {
        var myChart = echarts.init(document.getElementById('scenicSpotData'));
        var hideStyle = {
            normal: {
                color: '#fff', //未完成的圆环的颜色
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                show: false
            }
        };
        var option = {
            backgroundColor: '#fff',
            graphic: {
                type: 'text',
                top: 'center',
                // left: 'center',
                z: 2,
                zlevel: 100,
                style: {
                    text: '游客浏览\n数据分析',
                    x: 10,
                    y: 100,
                    textAlign: 'center',
                    width: 30,
                    height: 30,
                    fontSize: 14,
                    // fontWeight: 'bolder'
                },
            },
            legend: {
                orient: 'vertical',
                data: ['3个景区以上', '2个景区', '1个景区'],
                x: '70%',
                y: '4%',
                icon: 'diamond'
            },
            series: [{
                name: 'Line 1',
                type: 'pie',
                color: '#487efe',
                clockWise: false, //顺时针
                radius: [60, 80],
                label: {
                    normal: {
                        show: false,
                        position: 'inside'
                    }
                },
                labelLine: {
                    normal: {
                        show: false,
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: 40,
                    name: '3个景区以上'
                }, {
                    value: 25,
                    name: 'hide',
                    itemStyle: hideStyle
                }]
            }, {
                name: 'Line 2',
                type: 'pie',
                color: '#4ad970',
                clockWise: false, //顺时针
                radius: [60, 80],
                label: {
                    normal: {
                        show: false,
                        position: 'inside'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: 25,
                    name: '2个景区'
                }, {
                    value: 35,
                    name: 'hide',
                    itemStyle: hideStyle
                }]
            }, {
                name: 'Line 3',
                type: 'pie',
                color: '#fec400',
                clockWise: false, //顺时针
                radius: [60, 70],
                label: {
                    normal: {
                        show: false,
                        position: 'inside'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: 20,
                    name: '1个景区'
                }, {
                    value: 45,
                    name: 'hide',
                    itemStyle: hideStyle
                }]
            }, {
                name: 'Line 4',
                type: 'pie',
                color: '#36d9fc',
                clockWise: true, //顺时针
                radius: [0, 50],
                label: {
                    normal: {
                        show: false,
                        position: 'inside'
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                hoverAnimation: true,
                data: [{
                    value: 10,
                    name: 'D'
                }, {
                    value: 0,
                    name: '',
                    itemStyle: {}
                }]
            }]
        };
        myChart.setOption(option);
    }
}
scenicSpot.init();
