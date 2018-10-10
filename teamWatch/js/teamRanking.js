var teamRank = {
    init: function () {
        var that = this
        that.teamRanking()
    },
    teamRanking: function () {
        var myChart = echarts.init(document.getElementById('teamRanking'));
        var datas = [720, 182, 191, 234, 290, 320, 382, 150, 234, 490];
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
                data: ['昆明奥特斯旅行开发有限公司', '昆明海外旅游有限责任公司', '丽江市鼎承旅行社有限公司', '丽江市中乐假日旅行社有限责任公司', '云南省中国青年旅行社有限公司', '昆明奥特斯旅游开发有限公司', '昆明海外旅游有限责任公司', '丽江市鼎承旅行社有限公司', '丽江市中乐假日旅行社有限责任公司', '云南省中国青年旅行社有限公司'],
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
                        offset: [260, -10],
                        formatter: '{c}'
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
teamRank.init();
