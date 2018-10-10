var trafficrank = {
    init: function () {
        var that = this
        that.trafficRanking()
    },
    trafficRanking: function () {
        var myChart = echarts.init(document.getElementById('trafficRanking'));
        var datas = [220, 182, 191, 234, 290, 325, 225, 190, 300, 240];
        var max = Math.max.apply(null, datas) / 0.85;
        option = {
            title: {
                text: ''
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
                data: ['大研古镇', '文笔山', '河北省玉水寨', '观音峡', '黑龙潭公园', '木府', '束河古镇', '泸沽湖', '玉龙雪山', '丽江古镇'],
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
                    margin: -10,
                    align: 'left',
                    verticalAlign: 'bottom',
                    padding: [0, 0, 10, 0]
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
                        //TODO
                        offset: [230, -10],
                        formatter: '{c}/万人'
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
                data: [max, max, max, max, max, max, max, max, max, max],
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
trafficrank.init();
