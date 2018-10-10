require(['../js/map.js'], function () {
    var num = 0
    var scenicOperateWatch = {
        init: function () {
            var that = this
            that.lijiangmap()
            AllAreaPublicOpinionData = that.getAllAreaPublicOpinion().data
            // console.log(AllAreaPublicOpinionData)
            that.timesPark()
            that.operateList()
            that.fashionList()
            that.go()
        },


        lijiangmap() {
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
//              alert(region);
                    that.setOption(myChart, 'yulong')
                    //that.lijiangmap('yulong')
                } else if (res.name === "古城") {
                    region = 530702
//              alert(region)
                    that.setOption(myChart, 'gucheng')
                } else if (res.name === "永胜") {
                    region = 530722
//              alert(region)
                    that.setOption(myChart, 'yongsheng')
                } else if (res.name === "华坪") {
                    region = 530723
//              alert(region)
                    that.setOption(myChart, 'huaping')
                } else if (res.name === "宁蒗") {
                    region = 530724
//              alert(region)
                    that.setOption(myChart, 'ninglang')
                }
                linkAddressCode = region
                that.timesPark(region)
                that.go()
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
                aspectScale: 1.2,
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
                    zoom: 1.2,
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
        },
        getAllAreaPublicOpinion: function () {
            $.ajax({
                url: All_Area_Public_Opinion,
                contentType: "application/json",
                type: "GET",
                async: false,
                success: function (result) {
                    AllAreaData = result
                }
            });
            return AllAreaData
        },

        timesPark(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            var url = scenic_monitor_url
            var data = that.loadDate(region, url)
            console.log(data)
            var timesDomLIst = ''
            for (var i = 0; i < data.length; i++) {
                //判断比例 获取颜色
                var color = "";
                var color1 = "";
                if (data[i].parkingSituation === "拥挤") {
                    color = "#FF5501"
                } else {
                    color = "#01DB58";
                }
                if (data[i].scenicSituation === "拥挤") {
                    color1 = "#FF5501"
                } else {
                    color1 = "#01DB58"
                }
                timesDomLIst += '<ul class="contentList"  iname="' + data[i].name + '" id="' + data[i].scenicId + '">' +
                    '                    <li class="senery">' + data[i].name + '</li>' +
                    '                    <li class="rank">' + data[i].level + '</li>' +
                    '                    <li class="park" id="park" >' + data[i].used_parking + '/' + data[i].parking_total + '(' + '<span style="color:' + color + '">' + data[i].parkingSituation + '</span>' + ')' + '</li>' +
                    '                    <li class="column" id="column">' + data[i].tourist_total + '(' + '<span style="color:' + color1 + '">' + data[i].scenicSituation + '</span>' + ')' + '</li>' +
                    '                    <li class="maxWeight">' + data[i].scenic_capacity + '</li>' +
                    '                </ul>'
            }
            $('.content .times .contentListWap').html(timesDomLIst)
        },

        operateList() {
            var that = this
            var str = ""
            $.each(AllAreaPublicOpinionData, function (i, n) {
                var j = i + 1
                var num = j
                str += '<ul class="operateListContent">' +
                    '<li class="index">' +
                    '<span class="in">' + num + '</span>' +
                    '</li>' +
                    '<li class="tit">' + n.title + '</li>' +
                    '<li class="putTime">' + n.time + '</li>' +
                    '<li class="column">' + n.viewCount + '</li>' +
                    '</ul>'

            })
            $("#operateList").html(str)
        },

        fashionList(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            // var url = ''
            // var data = that.loadDate(region,url)
        },
        loadDate(region, url) {
            var allParam = {}
            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                data: {
                    regionCode: region
                },
                success: function (res) {
                    if (res.code === 'OK') {
                        allParam = res.data
                    }

                }
            })
            return allParam
        },
        go() {
            $('.contentList').bind('click', function () {
                var id = $(this).attr('id')
                var name = $(this).attr('iname')
                window.location.href = '../scenicDetail/scenicDetail.html?id=' + id + '&name=' + name
            })
        }
    }
    scenicOperateWatch.init()
})





