/*var weatherDashboard = {
    init: function () {
        var that = this
        that.weatherDashboards()
    },
    weatherDashboards: function () {
        var myChart = echarts.init(document.getElementById('weatherDashboards'));
        var option = {
            legend: {     //配置legend，这里的data，要对应type为‘bar’的series数据项的‘name’名称，作为图例的说明
                // data: ['第一阶段', '第二阶段', '第三阶段', '第四阶段', '第五阶段', '第六阶段'],
                selectedMode: false,  //图例禁止点击
                itemWidth: 30,
                itemHeight: 8,
                textStyle: {
                    color: '#707070',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                }
            },
            grid: {
                z: 1,    //grid作为柱状图的坐标系，其层级要和仪表图层级不同，同时隐藏
                show: false,
                left: '-30%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                splitLine: {
                    show: false    //隐藏分割线
                },
            },
            xAxis: [   //这里有很多的show，必须都设置成不显
                {
                    type: 'category',
                    data: [],
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    splitArea: {
                        interval: 'auto',
                        show: false
                    }
                }
            ],
            yAxis: [ //这里有很多的show，必须都设置成不显示
                {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                }
            ],
            toolbox: {
                show: false,
            },
            series: [
                {
                    name: '',
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    center: ["48%", "80%"], //整体的位置设置
                    z: 3,
                    min: 0,
                    max: 12,
                    splitNumber: 12,
                    radius: '150%',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            width: 10,
                            color: [
                                [0.2, '#75e007'],
                                [0.4, '#ffcb00'],
                                [0.6, '#fe6c00'],
                                [0.8, '#fe0000'],
                                [1, '#c4086e'],
                            ],
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 5,        // 属性length控制线长
                        splitNumber: 2,
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#cdcdcd'
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#454A57'
                        }
                    },
                    pointer: {
                        show: true,
                        length: '70%',
                        width: 5,
                    },
                    itemStyle: {
                        normal: {
                            color: '#75e007',//指针颜色
                            borderWidth: 0
                        }
                    },
                    title: {   //仪表盘标题
                        show: true,
                        offsetCenter: ['0', '20'],
                        textStyle: {
                            color: '#444A56',
                            fontSize: 12,
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    detail: {
                        textStyle: {
                            fontSize: 12,
                            color: '#707070'
                        },
                        offsetCenter: ["0%", "-50%"],
                        formatter: function () {
                            // return '创作时间\n' + '2018-01-17';
                        }
                    },
                    data: [{value: '3', name: '优40'}],
                },
                {
                    name: '',
                    type: 'gauge',
                    z: 2,
                    radius: '100%',
                    startAngle: 180,
                    endAngle: 0,
                    center: ["50%", "80%"], //整体的位置设置
                    splitNumber: 4,
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                //  [1, '#ccc']
                            ],
                            width: 25,
                            opacity: 1,
                        }
                    },
                    splitLine: { //分隔线样式
                        show: false,
                    },
                    axisLabel: { //刻度标签
                        show: false,
                    },
                    axisTick: { //刻度样式
                        show: false,
                    },
                    detail: {
                        show: false,
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 12
                        }
                    },
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',  //不显示，可以随便设置
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: '#75e007',  //这里的图例要注意，颜色设置和仪表盘的颜色对应起来
                        }
                    }
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: '#ffcb00',
                        }
                    }
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: '#fe6c00',
                        }
                    }
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: '#fe0000',
                        }
                    }
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: '#c4086e',
                        }
                    }
                },
                {
                    name: '',
                    type: 'bar',
                    barWidth: '60%',  //不显示，可以随便设置
                    data: [0],
                    itemStyle: {
                        normal: {
                            color: 'pink',  //这里的图例要注意，颜色设置和仪表盘的颜色对应起来
                        }
                    }
                },
            ]
        }
        myChart.setOption(option);
    }
}
weatherDashboard.init();
*/