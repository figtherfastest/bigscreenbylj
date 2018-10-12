var progress6 = {
    init: function () {
        var that = this
        that.progresssix()
    },
    progresssix: function () {
        var myChart = echarts.init(document.getElementById('progresssix'));
        var datas =[];
        var header =[];

        var firstDay;
        var lastDay;
        if(linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当月第一天
            // lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //当月最后一天
            lastDay= getLastDay(date.getFullYear(),date.getMonth()+1);
        } else {
            firstDay = new Date(linkTime.getFullYear(), linkTime.getMonth(), 1); //当月第一天
            // lastDay = new Date(linkTime.getFullYear(), linkTime.getMonth() + 1, 1); //当月最后一天
            lastDay= getLastDay(linkTime.getFullYear(),linkTime.getMonth()+1);
        }
        // var defaultAddressCode = 53470;
        if(linkAddressCode != null) {
            defaultAddressCode = linkAddressCode;
        }

        $.ajax({
            type: "GET",
            async:false,
            url: zhushu_url+"livingStatistics/findByCountryProvince",
            data: {startTime: firstDay.getTime(), endTime: lastDay.getTime(), addressCode: defaultAddressCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    if(datas.length != 0){
                        datas = [];
                    }
                    if(header.length != 0){
                        header = [];
                    }
                    // console.log(data.data)
                    $.each(data.data, function (index, item) {
                        datas.push({
                            value: item.num,
                            itemStyle:{color: pillarColor[index]}
                        });
                        header.push(item.cname);
                    });

                }
            }
        });
        var dataList = []
        var allMax = []
        var allDatas = []
        for (var i = 0; i < datas.length; i++) {
            dataList.push(datas[i].value)
            allDatas.push(datas[i].value)
        }
        var max = Math.max.apply(null, dataList) / 0.5;
        allDatas.forEach(item => {
            allMax.push(max)
        })
        option = {
            grid: {
                left: '-15%',
                right: '2%',
                bottom: '1%',
                top: '5%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                max: max,
                offset: 10,
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
                    data: header.reverse(),//名称
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
                        color: '#000',
                        fontWeight: '300'
                    },
                    yAxisIndex: 1,
                },
                {
                    type: 'category',
                    data: allDatas.reverse(),  // 名称所对应的值
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
                        show: false,
                        margin: 0,
                        align: 'left',
                        verticalAlign: 'bottom',
                        padding: [0, 0, 10, -12]
                    },
                    yAxisIndex: 1,
                }
            ],

            series: [{
                type: 'bar',
                data: datas.reverse(),
                barWidth: 10,
                z: 30,
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        offset: [200, -10],
                        formatter: '{c}个',
                        color: '#252830',
                        fontSize: '12',
                        fontWeight: 'bold',
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: 4,
                        color: '#0ecdf8',
                    },
                }
            },
                {
                    type: 'bar',
                    data: allMax,
                    barWidth: 10,
                    barGap: '-90%',
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: 20,
                            color: '#f2eeff'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
}
progress6.init();
