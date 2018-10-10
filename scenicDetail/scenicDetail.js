require([], function () {
    var params = decodeURI(window.location.search).split('&')
    var pid = params[0].split('=')
    var id = pid[1]
    var pname = params[1].split('=')
    var name = pname[1]

    var wheatherDay = [
        "暴雨", "大暴雨", "大雪", "大雨", "多云", "雷阵雨", "雷阵雨伴有冰雹",
        "晴", "特大暴雨", "雾", "小雪", "小雨", "阴", "雨夹雪", "阵雪"
        , "阵雨", "中雪", "中雨"];
    var wheatherUrl = ["./icon/day/", "./icon/night/", ".png"];

    function getPicUrl(name) {
        var tempurl = ["", ""]
        for (var i = 0; i < wheatherDay.length; i++) {
            if (name.search(wheatherDay[i]) >= 0) {
                tempurl[0] = wheatherUrl[0] + wheatherDay[i] + wheatherUrl[2];
                tempurl[1] = wheatherUrl[1] + wheatherDay[i] + wheatherUrl[2];
                return tempurl
            }
        }
    }

    var scenicDetails = {
        init() {
            var that = this
            $("#scenicName").text(name)
            weatherData = that.getWeatherData().data
            ScenicNewestData = that.getScenicNewest().data
            ScenicNegativeData = that.getScenicNegative().data
            console.log(ScenicNegativeData)
            that.scenicWeather()
            that.scenicNewest()
            that.scenicNegative()
            $.ajax({
                url: scenic_detail_url,
                data: {
                    regionCode: id
                },
                type: 'GET',
                success: function (res) {
                    // console.log(res)
                    if (res.code === 'OK') {
                        that.sumTirvaler(res.data.realtime)
                        that.compares(res.data.trend)
                        that.scenicComfortable(res.data.comfortable)
                        that.parkRank(res.data.carSource)
                    }

                }
            })
        },
        getWeatherData: function () {
            $.ajax({
                url: getTodayWetherInfo,
                contentType: "application/json",
                type: "GET",
                async: false,
                success: function (result) {
                    weatherData = result
                }
            });
            return weatherData
        },
        getScenicNewest: function () {
            $.ajax({
                url: scenic_newest_public_opinion_url,
                contentType: "application/json",
                type: "GET",
                async: false,
                success: function (result) {
                    ScenicNewestData = result
                }
            });
            return ScenicNewestData
        },
        getScenicNegative: function () {
            $.ajax({
                url: scenic_negative_public_opinion_url,
                contentType: "application/json",
                type: "GET",
                async: false,
                success: function (result) {
                    ScenicNegativeData = result
                }
            });
            return ScenicNegativeData
        },

        //1*2
        sumTirvaler(item) {
            var time = []
            var data = []
            for (var i = 0; i < item.length; i++) {
                time.push(item[i].time)
                data.push(item[i].flow)
            }
            var myChart = echarts.init(document.getElementById('sumTirvaler'));
            option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: time,
                },
                legend: {
                    data: '实时客流量',
                    top: 10,
                },
                grid: {
                    left: '2%',
                    right: '3%',
                    bottom: '1%',
                    top: '18%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    name: '单位:万人'
                },
                series: [{
                    name: '实时客流量',
                    data: data,
                    type: 'line',
                    areaStyle: {
                        color: '#8fb3fe'
                    },
                    lineStyle: {
                        color: "#6a9afe"
                    }
                }]
            };

            myChart.setOption(option);
        },
        //2*2
        compares(item) {
            // console.log(item)
            var prevYear = item.before[0].year
            var nowYear = item.now[0].year
            var prevYearData = []
            var nowYearData = []
            for (var i = 0; i < item.before.length; i++) {
                prevYearData.push(item.before[i].total)
                nowYearData.push(item.now[i].total)
            }

            var myChart = echarts.init(document.getElementById('compares'));
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [prevYear, nowYear],
                    top: 10,
                },
                grid: {
                    left: '2%',
                    right: '3%',
                    bottom: '1%',
                    top: '18%',
                    containLabel: true
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: "单位:万人"
                    },

                ],
                series: [
                    {
                        name: prevYear,
                        type: 'bar',
                        data: prevYearData,
                        barWidth: '10',
                        itemStyle: {
                            barBorderRadius: [3, 3, 0, 0],
                            color: '#2fc6fe'
                        }

                    },
                    {
                        name: nowYear,
                        type: 'bar',
                        data: nowYearData,
                        barWidth: '10',
                        itemStyle: {
                            barBorderRadius: [3, 3, 0, 0],
                            color: '#5d95fc'
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },
        //横向
        parkRank(item) {
            var province = []
            var dataList = []
            for (var i = 0; i < item.length; i++) {
                var data = item[i].city;
                province.push(data)

                dataList.push(item[i].car)
            }
            var myChart = echarts.init(document.getElementById('parkRank'));
            var max = Math.max.apply(null, dataList) / 0.85;
            var maxList = []
            var indexList = []
            var numberColor = []
            for (var j = 0; j < dataList.length; j++) {
                if (j == 0) {
                    numberColor.push("#ffc316")
                }
                if (j == 1) {
                    numberColor.push("#06fba9")
                }
                if (j == 2) {
                    numberColor.push("#128aff")
                }
                if (j > 2) {
                    numberColor.push("#0ecdf8")
                }
                maxList.push(max)
                indexList.push(j + 1)
            }
            var colorList = numberColor.reverse();
            option = {
                grid: {
                    left: '0',
                    right: '5%',
                    bottom: '1%',
                    top: '1%',
                    containLabel: true
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
                    },
                },
                yAxis: [
                    {
                        type: 'category',
                        data: province,// 名称
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
                            margin: 0,
                            align: 'left',
                            fontSize: 12,
                            verticalAlign: 'bottom',
                            //字体样式设置
                            padding: [0, 0, 6, 0]  //市区位置设置
                        },
                        yAxisIndex: 1,
                    },
                    {
                        type: 'category',
                        position: 'left',
                        nameLocation: 'end',
                        offset: 25,
                        data: indexList.reverse(), //索引
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
                            margin: 0,
                            verticalAlign: 'middle',
                            align: 'middle',
                            color: function () {
                                return "#fff"
                            },
                            formatter: function (value) {
                                return '{a' + value + '|' + value + '}';
                            },
                            rich: {
                                a1: {
                                    backgroundColor: {
                                        image: '../image/navIndex/01.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a2: {
                                    backgroundColor: {
                                        image: '../image/navIndex/02.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a3: {
                                    backgroundColor: {
                                        image: '../image/navIndex/03.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a4: {
                                    backgroundColor: {
                                        image: '../image/navIndex/04.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a5: {
                                    backgroundColor: {
                                        image: '../image/navIndex/04.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a6: {
                                    backgroundColor: {
                                        image: '../image/navIndex/04.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a7: {
                                    backgroundColor: {
                                        image: '../image/navIndex/04.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a8: {
                                    backgroundColor: {
                                        image: '../image/navIndex/04.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a9: {
                                    backgroundColor: {
                                        image: '../image/navIndex/04.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                },
                                a10: {
                                    backgroundColor: {
                                        image: '../image/navIndex/04.png'
                                    },
                                    height: 30,
                                    width: 30,
                                    fontSize: 16
                                }
                            },
                        },
                        yAxisIndex: 1,
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        data: dataList,
                        barWidth: 9,
                        z: 30,
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                offset: [310, -10],
                                color: '#000',
                                formatter: "{c}/万人 "
                            }

                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 4,
                                color: function (params) {
                                    var cc = colorList[params.dataIndex];
                                    return cc;
                                }
                            }

                        },
                        markPoint: {
                            symbol: 'rect'
                        }
                    },
                    {
                        type: 'bar',
                        data: maxList,
                        barWidth: 9,
                        barGap: '-90%',
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        itemStyle: {
                            normal: {
                                barBorderRadius: 20,
                                color: '#def1ff'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        },


        scenicWeather() {
            var that = this
            var info = weatherData.dayWeather
            var air = weatherData.pm25
            $.each(info, function (i, n) {
                $("#scenicWeather").html('<li class="date">' + '今天' + '&nbsp;' + n.date + '&nbsp;' + n.dateweek + '</li>' +
                    '<li class="weather">' +
                    '<img src=' + getPicUrl(n.weather)[0] + '>' + '&nbsp;' +
                    '<img src=' + getPicUrl(n.weather)[1] + '>' +
                    '</li>' +
                    '<li class="weatherSituation">' + n.weather + '</li>' +
                    '<li class="weatherDetail">' +
                    n.temperature + '&nbsp;' + n.wind +
                    '</li>' +
                    '<li class="arrSituation">' +
                    '<span class="tit">' + '实时空气质量：' + '</span>' +
                    '<span class="stuaution">' + air + '</span>' +
                    '</li>')
            });

            var items = $("#scenicWeather").html()
        },
        scenicNewest() {
            var that = this;
            var len = Math.ceil(ScenicNewestData.length / 10)
            var newArr = []
            for (var i = 0; i < ScenicNewestData.length; i += 10) {
                newArr.push(ScenicNewestData.slice(i, i + 10))
            }
            console.log(newArr);
            that.fillDoms(newArr[0])
            var num = 1
            setInterval(function () {
                $("#contents .wap").remove()
               that.fillDoms(newArr[num])
                num++
                if (num >= len) {
                    num = 0
                }
            }, 5000)
        },
        fillDoms(ScenicNewestData){
            var str = ""
            $.each(ScenicNewestData,function(i,n){
                str +='<div class="wap">'+
                '<div class="news">'+n.title.slice(0,8)+'...'+'</div>'+
                '<div class="from">'+n.media+'</div>'+
                '<div class="time">'+n.time+'</div>'+
                '</div>'
            })
            $("#contents").html(str)
        },
        scenicNegative() {
            var that = this
            var str = ""
            $.each(ScenicNegativeData, function (i, n) {
                var tittle = n.title.slice(0, 7)
                console.log(tittle);
                str += '<div class="wap">' +
                    '<div class="news">' + n.title.slice(0, 8) + '...' + '</div>' +
                    '<div class="from">' + n.media + '</div>' +
                    '<div class="time">' + n.time + '</div>' +
                    '</div>'
            })
            $("#content").html(str)
        },
        //2*1
        scenicComfortable(item) {
            var myChart = ''
            myChart = echarts.init(document.getElementById('scenicComfortable'));
            var conforDom = ' <li>' +
                '<div class="tittles">' + item.scenicSituation + '</div>' +
                '<div class="rates">' + item.ratio + '</div>' +
                '</li>' +
                '<li>' +
                '<div class="tittles">接待人数</div>' +
                '<div class="rates">' + item.flow + '</div>' +
                '</li>'
            $('.allPageContent .scenicComfortable').html(conforDom)
            option = {
                tooltip: {
                    formatter: "{c} {b}"
                },
                series: [
                    {
                        type: 'gauge',
                        center: ['50%', '70%'],    // 默认全局居中
                        radius: '100%',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 7,
                        splitNumber: 7,
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 8
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 10,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length: 20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        pointer: {
                            width: 5
                        },
                        title: {
                            offsetCenter: [0, '-90%'],       // x, y，单位px
                        },
                        detail: {
                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 17,
                            fontWeight: 'bolder',
                            offsetCenter: [0, '25%']
                        },
                        data: [{value: 1.5}]
                    },

                ]
            };

            option.series[0].data[0].value = Number(item.ratio.split('%')[0])
            myChart.setOption(option, true);

        },
    }
    scenicDetails.init()
})

