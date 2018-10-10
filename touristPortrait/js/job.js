var job = {
    init: function () {
        var that = this
        that.jobs()
    },
    jobs: function () {
        var myChart = echarts.init(document.getElementById('jobs'));
        var dataStyle = {
            normal: {
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 18,
                },
                labelLine: {
                    //smooth: 0.2,
                    length: 20,
                    length2: 20
                },
            }
        };

        var labelShow = {
            show: true,
            color: '#000',
            fontSize: 15,
            formatter: [
                '{d| {d}% }',
                '{b| {b} }'
            ].join('\n'),
            rich: {
                d: {
                    fontSize: 12,
                    color: '#000'
                },
                b: {
                    fontSize: 14,
                    color: '#000'
                },
            }
        };

        var placeHolderStyle = {
            normal: {
                color: 'rgba(0,0,0,0)',
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                color: 'rgba(0,0,0,0)'
            }
        };
        option = {
            title: {
                text: '',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'normal',
                    color: '#000',
                },
                x: 'center'
            },
            // color: ['#2078d1', '#8a00ec', '#ff00f3', '#fb0065', '#ff941b'],
            tooltip: {
                show: false,
                formatter: "{b} <br/> {c} ({d}%)"
            },
            angleAxis: {
                type: 'category',
                z: 10,
                axisLine: {
                    color: '#fff',
                    lineStyle: {
                        width: 3,
                        color: '#fff',
                    }
                },
            },
            radiusAxis: {
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    color: '#000'
                },
                axisLine: {
                    show: false,
                    color: '#000',
                    lineStyle: {
                        color: '#000',
                    }
                },
                splitLine: {
                    color: '#000',
                    lineStyle: {
                        type: 'dotted',
                        color: 'rgba(170,170,170,.5)',
                    }
                },

            },
            polar: {
                center: ['30%', '40%'],
                radius: 140,
            },
            legend: {
                show: false,
                bottom: '5%',
                textStyle: {
                    color: '#000',
                },
                itemGap: 12,
                data: ['各类技术人员', '国家事业单位', '其他', '服务性人员', '商业工作人员', '农林牧渔劳动']
            },
            series: [{
                name: 'Line 1',
                type: 'pie',
                color: '#4997fc',
                clockWise: false,
                radius: [30, 50],
                itemStyle: dataStyle,
                hoverAnimation: false,
                data: [{
                    value: 800,
                    name: '',
                    itemStyle: placeHolderStyle
                },
                    {
                        value: 400,
                        name: '各类技术人员',
                        label: labelShow,
                    },
                    {
                        value: 10,
                        name: '',
                        itemStyle: placeHolderStyle
                    }

                ]
            },
                {
                    name: 'Line 2',
                    type: 'pie',
                    color: '#4c6ffc',
                    clockWise: false,
                    radius: [40, 60],
                    itemStyle: dataStyle,
                    hoverAnimation: false,

                    data: [{
                        value: 250,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                        {
                            value: 70,
                            name: '国家事业单位',
                            label: labelShow,
                        },
                        {
                            value: 200,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 3',
                    type: 'pie',
                    color: '#fec400',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: [40, 60],
                    itemStyle: dataStyle,

                    data: [{
                        value: 130,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                        {
                            value: 100,
                            name: '其他',
                            label: labelShow,
                        },
                        {
                            value: 170,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 4',
                    type: 'pie',
                    color: '#fca400',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: [50, 60],
                    itemStyle: dataStyle,

                    data: [{
                        value: 40,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                        {
                            value: 90,
                            name: '服务性人员',
                            label: labelShow,
                        },
                        {
                            value: 230,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 5',
                    type: 'pie',
                    color: '#fc7600',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: [40, 60],
                    itemStyle: dataStyle,

                    data: [{
                        value: 0,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                        {
                            value: 40,
                            name: '商业工作人员',
                            label: labelShow,
                        },
                        {
                            value: 320,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                {
                    name: 'Line 6',
                    type: 'pie',
                    color: '#1cc27e',
                    clockWise: false,
                    radius: [30, 50],
                    itemStyle: dataStyle,
                    hoverAnimation: false,

                    data: [{
                        value: 380,
                        name: '',
                        itemStyle: placeHolderStyle
                    },
                        {
                            value: 120,
                            name: '农林牧渔劳动',
                            label: labelShow,
                        },
                        {
                            value: 120,
                            name: '',
                            itemStyle: placeHolderStyle
                        }
                    ]
                },
                // {
                //     type: 'bar',
                //     data: [0],
                //     coordinateSystem: 'polar',
                //     name: '',
                //     stack: ''
                // },

            ]
        };
        myChart.setOption(option);
    }
}
job.init();
