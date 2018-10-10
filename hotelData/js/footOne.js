var footone = {
    init: function () {
        var that = this
        that.footerones()
    },
    footerones: function () {
        var myChart = echarts.init(document.getElementById('footerones'));
        var footeronesIndex = $("#footeronesIndex");
        var datas = [];
        var header = [];
        var headerMax = [];
        if (linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当月第一天
            // lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1); //当月最后一天
            lastDay= getLastDay(date.getFullYear(),date.getMonth()+1);
        } else {
            firstDay = new Date(linkTime.getFullYear(), linkTime.getMonth(), 1); //当月第一天
            // lastDay = new Date(linkTime.getFullYear(), linkTime.getMonth() + 1, 1); //当月最后一天
            lastDay= getLastDay(linkTime.getFullYear(),linkTime.getMonth()+1);
        }
        if (linkAddressCode != null) {
            defaultAddressCode = linkAddressCode;
        }

        var childs = $(footeronesIndex).children();
        if (childs != null && childs.length != 0) {
            $(footeronesIndex).empty();
        }

        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "livingStatistics/findHotelByAreaAndTime",
            data: {startTime: firstDay.getTime(), endTime: lastDay.getTime(), addressCode: defaultAddressCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    if (datas.length != 0) {
                        datas = []
                    }
                    if (header.length != 0) {
                        header = []
                    }
                    if (headerMax.length != 0) {
                        headerMax = []
                    }

                    $.each(data.data, function (index, item) {
                        datas.push(
                             Number((item.peopleNum / 10000).toFixed(2))
                        );
                        header.push({
                            value: item.hotelName
                        });
                    });
                }
            }
        });
        var max = Math.max.apply(null, datas) / 0.8;
        var indexList = []
        for(var i=0;i<datas.length;i++){
            headerMax.push(max)
            indexList.push(i+1)
        }
        var myColor = ['#0ecdf8', '#0ecdf8', '#128aff', '#06fba9', '#ffc316'];
        option = {
            grid: {
                left: '-15%',
                right: '3%',
                bottom: '1%',
                top: '5%',
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
                    data: header.reverse(),
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
                        padding: [0, 0, 6, 0]
                    },
                    yAxisIndex: 1,
                    //data: indexList.reverse(),
                },
                {
                    type: 'category',
                    position: 'left',
                    nameLocation: 'end',
                    offset: 25,
                    data: indexList.reverse(),
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
                                fontSize:16
                            },
                            a2: {
                                backgroundColor: {
                                    image: '../image/navIndex/02.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a3: {
                                backgroundColor: {
                                    image: '../image/navIndex/03.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a4: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a5: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a6: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a7: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a8: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a9: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a10: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            }
                        },

                    },
                    yAxisIndex: 1,
                }
            ],
            series: [
                {
                    type: 'bar',
                    data: datas.reverse(),
                    barWidth: 9,
                    z: 30,
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            offset: [320, -10],
                            color: '#000',
                            formatter: "{c}/万人 "
                        }

                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 4,
                            color: function (params) {
                                var num = myColor.length;
                                return myColor[params.dataIndex % num]
                            },
                        }
                    },
                    markPoint: {
                        symbol: 'rect'
                    }
                },
                {
                    type: 'bar',
                    data: headerMax,
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
    }
}
footone.init();
