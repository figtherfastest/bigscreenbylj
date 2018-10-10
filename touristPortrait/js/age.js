var ages = {
    init: function () {
        var that = this
        that.ageAnalysis()
    },
    
    ageAnalysis: function () {
        var myChart = echarts.init(document.getElementById('ageAnalysis'));
        var datas = [720, 182, 191, 234, 290, 180];
        var max = Math.max.apply(null, datas) / 0.85;
        option = {
            title: {
                text: '',
                // subtext: '单位：%',
                // subtextStyle: {
                //     color: '#000',
                // }
            },
            xAxis: {
                type: 'value',
                max: max,
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                // data: ['0-18岁', '19-30岁', '31-40岁', '41-60岁', '60岁以上', '未知'],
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                    margin: -4,
                    // align: 'left',
                    verticalAlign: 'bottom',
                    padding: [0, 5, 10, 0]
                }

            },

            series: [{
                type: 'bar',
                data: datas,
                barWidth: 10,
                z: 30,
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        color: '#000',
                        fontSize: 10,
                        //TODO
                        offset: [150, 0],
                        formatter: '{c}%'
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 4,
                        color: '#0ecdf8'
                    }
                }
            }, {
                type: 'bar',
                data: [max, max, max, max, max, max],
                barWidth: 10,
                barGap: '-90%',
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: '#def1ff'
                    }
                }
            }]
        };
        myChart.setOption(option);
    }
}
ages.init();
