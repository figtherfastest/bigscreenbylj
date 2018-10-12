var customer = {
    init: function () {
        var that = this
        that.customerTop()
    },
    customerTop: function () {

        var e = $("#customerTop").prev()
        var values = [];
        var keys = [];
        var firstDay;
        var lastDay;
        if (linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当月第一天
            lastDay = getLastDay(date.getFullYear(), date.getMonth() + 1); //当月最后一天
        } else {
            firstDay = new Date(linkTime.getFullYear(), linkTime.getMonth(), 1); //当月第一天
            lastDay = getLastDay(linkTime.getFullYear(), linkTime.getMonth() + 1)
            // lastDay = new Date(linkTime.getFullYear(), linkTime.getMonth() + 1, 1); //当月最后一天
        }
        var childs = $(e).children();
        if (childs != null && childs.length != 0) {
            $(e).empty();
        }
        $.ajax({
            url: index_url + "/scenicStatistics/findSourceByAreaAndTimeLocal",
            contentType: "application/json",
            type: "GET",
            async: false,
            data: "startTime=" + firstDay.getTime() + "&endTime=" + lastDay.getTime(),
            success: function (result) {
                var array = result.data;
                for (var i = 0; i < 10; i++) {
                    if (array[i] != null) {
                        keys.push(array[i].province_name)
                        values.push((array[i].sum / 10000).toFixed(2))
                        e.append(" <div>" + (i + 1) + "</div>")
                    } else {
                        break;
                    }
                }
            }
        })
        values.reverse()
        keys.reverse()
        var myChart = echarts.init(document.getElementById('customerTop'));
        var datas = values;
        var max = Math.max.apply(null, datas) / 0.8;
        var allMax = []
        var indexList = []
        for (var i = 0; i < datas.length; i++) {
            allMax.push(max)
            indexList.push(i+1)
        }
        var myColor = ['#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#128aff', '#06fba9', '#ffc316'];
        option = {
            grid: {
                left: '-10%',
                right: '3%',
                bottom: '-1%',
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
                }
            },
            yAxis: [
                {
                    type: 'category',
                    data: keys,
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
                        padding: [0, 0, 6, 0],
                        color:'#000',
                        fontWeight:'bold'
                    }

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
                                    image: 'js/image/01.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a2: {
                                backgroundColor: {
                                    image: 'js/image/02.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a3: {
                                backgroundColor: {
                                    image: 'js/image/03.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a4: {
                                backgroundColor: {
                                    image: 'js/image/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a5: {
                                backgroundColor: {
                                    image: 'js/image/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a6: {
                                backgroundColor: {
                                    image: 'js/image/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a7: {
                                backgroundColor: {
                                    image: 'js/image/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a8: {
                                backgroundColor: {
                                    image: 'js/image/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a9: {
                                backgroundColor: {
                                    image: 'js/image/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            },
                            a10: {
                                backgroundColor: {
                                    image: 'js/image/04.png'
                                },
                                height: 30,
                                width: 30,
                                fontSize:16
                            }
                        },
                    },
                    yAxisIndex: 1,
                    nameTextStyle: {
                        fontSize: 38
                    }
                }
            ],

            series: [
                {
                    type: 'bar',
                    data: datas,
                    barWidth: 10,
                    z: 30,
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            offset: [320, -10],
                            color:'#000',
                            fontWeight:'bold',
                            formatter: '{c}/万人'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var num = myColor.length;
                                return myColor[params.dataIndex % num]
                            },
                            barBorderRadius: 4,
                        }
                    }
                }, {
                    type: 'bar',
                    data: allMax,
                    barWidth: 10,
                    barGap: '-90%',
                    label: {
                        normal: {
                            show: false,
                            // offset: [100, -15],
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

customer.init();

