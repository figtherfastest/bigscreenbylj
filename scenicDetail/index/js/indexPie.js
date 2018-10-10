var index = {
    init: function () {
        var that = this
        that.indexPie()
    },
    indexPie: function () {
        var myChart = echarts.init(document.getElementById('indexPie'));
        option = {
            title: {
                text: '',
                subtext: '',
                link: ''
            },
            tooltip: {
                show: false
            },
            legend: {
                itemGap: 1,
                orient: 'vertical',
                // type: 'scroll',
                icon: 'diamond',
                bottom: 40,
                x: '',
                y: '8',
                textStyle: {
                    fontSize: 15,
                },
                data: ['江苏省', '四川省', '北京市', '福建省', '福建省', '云南省', '广东省', '湖北省', '甘肃省', '河北省', '湖南省']
            },

            series: [{
                type: 'pie',
                radius: ['35%', '60%'],
                roseType: 'area',
                center: ['63%', '50%'],
                zlevel: 2,
                // tooltip: {
                //     formatter: '{b}: {d}%'
                // },
                labelLine: {
                    normal: {
                        length: 10
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#000',
                        fontSize: 15,
                        formatter: '{b}\n{d}%'
                    }
                },
                data: [{
                    value: 104.7,
                    name: '江苏省',
                    itemStyle: {
                        color: '#4ad970',
                    }
                },
                    {
                        value: 10.4,
                        name: '四川省',
                        itemStyle: {color: '#ff473e'}
                    },
                    {
                        value: 26.3,
                        name: '北京市',
                        itemStyle: {color: '#fc7600'}
                    },
                    {
                        value: 71.6,
                        name: '福建省',
                        itemStyle: {color: '#fca400'}
                    },
                    {
                        value: 57.6,
                        name: '云南省',
                        itemStyle: {color: '#fec400'}
                    },
                    {
                        value: 89.4,
                        name: '广东省',
                        itemStyle: {color: '#fce300'}
                    },
                    {
                        value: 79.4,
                        name: '湖北省',
                        itemStyle: {color: '#4c6ffc'}
                    },
                    {
                        value: 89.4,
                        name: '甘肃省',
                        itemStyle: {color: '#4b7efe'}
                    },
                    {
                        value: 99.4,
                        name: '河北省',
                        itemStyle: {color: '#4997fc'}
                    },
                    {
                        value: 109.4,
                        name: '湖南省',
                        itemStyle: {color: '#4bdaac'}
                    }
                ]
            }]
        };
        myChart.setOption(option);
    }
}
index.init();
