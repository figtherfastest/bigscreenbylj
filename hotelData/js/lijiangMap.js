var lijiang = {
    init: function () {
        var that = this
        that.lijiangmap()
    },
    lijiangmap: function () {
        var that = this
        var myChart = echarts.init(document.getElementById('lijiangmap'));
        var map = maps.lj
        echarts.registerMap('LJ', map);

        that.setOption(myChart);
        myChart.on('click', function (res) {
            res.event.target.style.fill = '#d50000'
            var region = 0
            if (res.name === "玉龙纳西族") {
                region = 530721
                // alert(region);
                that.setOption(myChart, 'yulong')
                //that.lijiangmap('yulong')
            } else if (res.name === "古城") {
                region = 530702
                // alert(region)
                that.setOption(myChart, 'gucheng')
            } else if (res.name === "永胜") {
                region = 530722
                // alert(region)
                that.setOption(myChart, 'yongsheng')
            } else if (res.name === "华坪") {
                region = 530723
                // alert(region)
                that.setOption(myChart, 'huaping')
            } else if (res.name === "宁蒗") {
                region = 530724
                // alert(region)
                that.setOption(myChart, 'ninglang')
            }
            linkAddressCode = region

            rooms.init(); //景区游客住宿统计重画
            hotelData.init();
            asia.init();
            progress1.init();
            americas.init();
            progress2.init();
            oceania.init();
            progress3.init();
            european.init();
            progress4.init();
            africa.init();
            progress5.init();
            china.init();
            progress6.init();
            footone.init();
            stay.init();
            roomdays.init();
            entrys.init();
        })
    },

    setOption: function (myChart, item) {
        var mapDate = []
        var num = 0
        num++
        var mapList = [
            {
                name: '古城',
                value: 12200,
            },
            {
                name: '华坪',
                value: 1200,
            },
            {
                name: '宁蒗',
                value: 2102,
            },
            {
                name: '永胜',
                value: 3132,

            },
            {
                name: '玉龙纳西族',
                value: 602,
            },
        ]
        if (num <= 1 && item === undefined) {
            mapDate = mapList
        } else if (num >= 1 && item === 'yulong') {
            mapList[4].selected = true
            mapDate = mapList
        } else if (num >= 1 && item === 'gucheng') {
            mapList[0].selected = true
            mapDate = mapList
        } else if (num >= 1 && item === 'yongsheng') {
            mapList[3].selected = true
            mapDate = mapList
        } else if (num >= 1 && item === 'huaping') {
            mapList[1].selected = true
            mapDate = mapList
        } else if (num >= 1 && item === 'ninglang') {
            mapList[2].selected = true
            mapDate = mapList
        }
        option = {
            legend: { //地图上面的点
                orient: 'vertical',
                left: 'left',
                data: ['丽江']
            },
            aspectScale: 3,
            visualMap: {
                show: false,
                min: 0,
                max: 4000,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                calculable: false,
                orient: 'horizontal',
                inRange: {
                    color: ['#1733ff', '#0357dd'],
                    symbolSize: [100, 4000]
                },
            },

            backgroundColor: '#fff',
            series: [{
                type: 'map',
                map: 'LJ',
                zoom: 1.25,
                color: "#f00",
                label: {
                    normal: {
                        show: true,
                        color: '#d0e6fd',
                        fontWeight: 'bolder',
                        fontSize: 18
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#fdffff',
                        color: '#ffd543',
                        borderWidth: 'solid',
                        shadowColor: '#97baf9',
                        shadowBlur: 20

                    }
                },
                data: mapDate
            }]
        };
        myChart.setOption(option);
    }
}
lijiang.init();
