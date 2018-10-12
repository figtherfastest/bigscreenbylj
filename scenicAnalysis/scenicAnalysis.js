var num = 0;

/*
          * 获取指定年月的最后一天
          * @return string
          * @hjt 2015-9-17
          */
function getLastDay(year, month) {
    var new_year = year; //取当前的年份
    var new_month = month;//取下一个月的第一天，方便计算（最后一天不固定）
    if (month == 12) {
        new_month = 0; //月份减
        new_year++; //年份增
    }
    var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
    return new Date(new_date.getTime()/*-1000*60*60*24*/);//获取当月最后一天日期
}

//年选择器
laydate.render({
    elem: '#yearInput'
    , type: 'year'
});

/*
* 获取指定年月的第一天
* @return string
* @hjt 2015-9-17
*/
function getfirstDay(year, month) {
    var new_year = year; //取当前的年份
    var new_month = month - 1;//取下一个月的第一天，方便计算（最后一天不固定）
    return new Date(new_year, new_month, 1);//获取当月最后一天日期
}

function changeTime(yearId, monthId) {
    var year = document.getElementById(yearId).value.replace("年", "");
    var month = document.getElementById(monthId).value.replace("月", "");
    var trs = /^\d{4}$/;
    if (!trs.test(year)) {
        alert("请选择年份");
        return;
    }
    var endDate = getLastDay(parseInt(year), month);
    var beginDate = getfirstDay(parseInt(year), month);
    scenicAnalysis.init(beginDate.getTime() + "", endDate.getTime() + "", '');

}

var scenicAnalysis = {
    init: function (startTime, endTime, regionCode) {
        //从新设置时间为当前月
        if (startTime == '' || endTime == '') {
            var date = new Date();
            startTime = new Date(date.getFullYear(), date.getMonth(), 1).getTime(); //当月第一天
            endTime = getLastDay(date.getFullYear(), date.getMonth() + 1).getTime();
        }
        var that = this;
        if (num == 0) {
            that.lijiangmap()
        }
        //不联动时间
        that.doubleBar(regionCode, new Date().getFullYear())
        that.secenyTirvalerAnalysis(regionCode)
        //区域联动接口时间联动
        that.secenyParkAnalysis('', regionCode)
        that.secenyParkAnalysisPie(startTime, endTime)
        that.secenyTirvalerAnalysisPie(startTime, endTime)
        that.upFourA(startTime, endTime)
        //时间和区域联动
        that.secentCategoryAnalysis(startTime, endTime, regionCode)
        that.tirvalerStaying(startTime, endTime, regionCode)
        that.sceneSunAccount(startTime, endTime, regionCode)
        that.tirvalAgeAnalysis(startTime, endTime, regionCode)
        that.chinaMap(startTime, endTime, regionCode)
        that.secentMeansAnalysis(startTime, endTime, regionCode)

    },
    //1*1
    doubleBar(regionCode, year) {
        var myChart = echarts.init(document.getElementById('tirvalAndTeamBar'));
        var teams = [];
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findVisitorsMonthByArea",
            data: {addressCode: regionCode, year: year},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        teams.push({
                            value: (item.teamNum / 10000).toFixed(2)
                        });
                        peoples.push({
                            value: (item.peopleNum / 10000).toFixed(2)
                        });
                        header.push({
                            value: item.month
                        });
                    });
                }
            }
        });
        option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['接待人数', '接待团队'],
                top: 10,
                right: 10,
                itemHeight: 10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                top: '20%',
                containLabel: true
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: header,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eff4fd'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: "单位:万人",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eff4fd'
                        }
                    }
                },

            ],
            series: [
                {
                    name: '接待人数',
                    type: 'bar',
                    barWidth: 10,
                    data: peoples,
                    itemStyle: {
                        barBorderRadius: [3, 3, 0, 0],
                        color: "#fc7600"
                    }

                },
                {
                    name: '接待团队',
                    type: 'bar',
                    barWidth: 10,
                    data: teams,
                    itemStyle: {
                        barBorderRadius: [3, 3, 0, 0],
                        color: "#4b7efe"
                    }
                }
            ]
        };

        myChart.setOption(option);
    },
    //arg1：节点    参数2：leng   arg3：数据  arg4:leng样式 arg5:槟的粗细 arg6:srzeCenter arg7 中间的字
    singerPie(doms, lengData, data, lengFormat, radius, srzeCenter, graphic, typeName) {
        var myChart = doms;
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {d}%"
            },
            graphic: graphic,
            legend: lengFormat,
            series: [
                {
                    name: typeName,
                    type: 'pie',
                    radius: radius,
                    center: srzeCenter,
                    avoidLabelOverlap: false,
                    hoverAnimation: false,//是否开启hover在扇形区域上放大动画效果
                    slient: true,//图形是否不响应和触发鼠标事件，默认为false，即响应和触发鼠标事件
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data
                }
            ]
        };
        myChart.setOption(option);
        //翁剑军 2018.9.29下午 添加饼状图中间默认显示
        myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });
        myChart.on('mouseover', (v) => {
            if (v.dataIndex != 0) {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            }
        });
        myChart.on('mouseout', (v) => {
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
        });
    },
    //突出的饼装图
    birckPieWithLine(doms, data) {
        var myChart = doms;
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     data: ['直达', '营销广告', '搜索引擎']
            // },
            series: [
                {
                    name: '详情',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '70%'],

                    label: {
                        normal: {
                            position: 'outside',
                            formatter: "{b}\n{d}%"
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length:5
                        }
                    },
                    data: data
                },
            ]
        };
        myChart.setOption(option);
    },
    //水平的柱状图
    verticalBar(node, data, yDatas, grid, axisLabel) {
        var myChart = node;
        var datas = data
        var max = Math.max.apply(null, datas) / 0.9;
        var maxList = []
        datas.forEach(()=>{
            maxList.push(max)
        })
        option = {
            grid: grid,
            xAxis: {
                type: 'value',
                data: data,
                max: max,
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    // fontWeight: 'bold',
                    // color: '#252830',
                },

            },
            yAxis: {
                type: 'category',
                data: yDatas,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                },
                axisLabel: axisLabel

            },

            series: [{
                type: 'bar',
                data: datas,
                barWidth: 10,
                z: 30,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        offset: [500, 30],
                        formatter: '{c}',

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
                    data: maxList,
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
                            color: '#def1ff'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    },
    singerBare(doms, peoples, header) {
        var myChart = doms;
        option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '18%',
                containLabel: true
            },
            label: {
                show: true,
                position: 'top'

            },
            xAxis: [
                {
                    type: 'category',
                    data: header,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eff4fd'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '单位:万人',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eff4fd'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: 15,
                    data: peoples
                }
            ]
        };
        myChart.setOption(option);
    },
    //2*1
    secenyTirvalerAnalysis(addressCode) {
        var that = this
        var dom = echarts.init(document.getElementById('secenyTirvalerAnalysis'));
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findVisitorsYearByArea",
            data: {addressCode: addressCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push({
                            value: item.peopleNum,
                        });
                        header.push({
                            value: item.year
                        });
                    });
                }
            }
        });
        that.singerBare(dom, peoples, header)
    },
//    2*6
    secenyParkAnalysis(year, addressCode) {
        var that = this
        var dom = echarts.init(document.getElementById('secenyParkAnalysis'));
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findStopCarAreaAndTime",
            data: {year: year, addressCode: addressCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        var color = randomHexColor();
                        peoples.push({
                            value: item.roundnum,
                        });
                        header.push(
                            item.month
                        );
                    });
                }
            }
        });
        that.singerBare(dom, peoples, header)
    },
//    1*5
    upFourA(startTime, endTime) {
        var that = this
        var dom = echarts.init(document.getElementById('upFourA'));
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findScenicReception",
            data: {startTime: startTime, endTime: endTime, addressCode: ''},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push(
                            (item.sum / 10000).toFixed(2)
                        );
                        header.push(
                            item.name
                        );
                    });
                }
            }
        });
        var grid = {
            left: '20%',
            right: '2%',
            bottom: '5%',
            top: '8%',
            containLabel: true
        }
        var axisLabel = {
            show: true,
            margin: 0,
            align: 'left',
            verticalAlign: 'bottom',
            padding: [0, 0, -5, -80]
        }
        that.verticalBar(dom, peoples.reverse(), header.reverse(), grid, axisLabel)
    },
//    1*6
    secenyParkAnalysisPie(startTime, endTime) {
        var that = this;
        var dom = echarts.init(document.getElementById('secenyParkAnalysisPie'));
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findStopByAreaAndTime",
            data: {startTime: startTime, endTime: endTime, addressCode: ''},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push({
                            value: item.num,
                            name: item.name,
                            itemStyle: {color: ringColor[index]}
                        });
                        header.push(
                            item.name
                        );

                    });
                }
            }
        });
        var lengFormat = {
            orient: 'vertical',
            top: "center",
            right: "15%",
            data: header,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['50%', '70%']
        var srzeCenter = ['31%', 'center']
        that.singerPie(dom, header, peoples, lengFormat, radius, srzeCenter, null, "详情")
    },
    //2*5
    secenyTirvalerAnalysisPie(startTime, endTime) {
        var that = this;
        var dom = echarts.init(document.getElementById('secenyTirvalerAnalysisPie'));
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findScenicReception",
            data: {startTime: startTime, endTime: endTime, addressCode: ''},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push({
                                value: item.sum,
                                name: item.name,
                                itemStyle: {color: ringColor[index]},
                            }
                        );
                        header.push(
                            item.name
                        );
                    });
                }
            }
        });
        var lengFormat = {
            orient: 'vertical',
            top: "center",
            right: "10%",
            data: header,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['31%', 'center']
        var graphic = {
            elements: [
                {
                    show: false,
                    type: 'text',
                    left: '23.8%',
                    top: '35%',
                    style: {
                        text: "  永胜县\n\n\n占比18%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.singerPie(dom, header, peoples, lengFormat, radius, srzeCenter, null, "详情")
    },
//    footer 1
    secentCategoryAnalysis(startTime, endTime, regionCode) {
        var dataListLength = 0
        var myChart = echarts.init(document.getElementById('secentCategoryAnalysis'));
        var peoples = [];
        var header = [];
        var color = ['#F9892E', '#4B7EFE', '#4AD970'];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findSexByAreaAndTime",
            data: {startTime: startTime, endTime: endTime, addressCode: regionCode},
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data.code == "OK") {
                    dataListLength = data.data.length
                    var htl = '<li class="footerFontColor"><span class="female">男性</span>' + data.data[1].num / 10000 + '万人</li>  ' +
                        '&nbsp;&nbsp; <li class="footerFontColor"><span class="female">女性</span>' + data.data[0].num / 10000 + '万人</li> ' +
                        ' <li class="footerFontColor"><span class="female">其他</span>' + data.data[2].num / 10000 + '万人</li>'
                    $('.secentCategoryAnalysisCls').html(htl)
                    $.each(data.data, function (index, item) {
                        peoples.push({
                            value: item.num,
                            name: item.sex,
                            itemStyle: {color: color[index]}
                        });
                        header.push(
                            item.sex
                        );
                    });
                }
            }
        });
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c}<br/>{d}%"
            },
            graphic: {
                //翁剑军 2018.9.29下午 饼状图中间字符修改
                elements: [
                    {
                        type: 'text',
                        ignore: dataListLength == 0 ? true : false,
                        left: '33%',
                        top: '50%',
                        style: {
                            text: "游客性别\n\t\t\t分析",
                            fill: '#4b7efe',
                        }
                    }
                ]

            },
            legend: {
                orient: 'vertical',
                right: "12%",
                bottom: '40%',
                data: header,
                itemWidth: 18,
                itemHeight: 10
            },
            series: [
                {
                    name: "详情",
                    type: 'pie',
                    radius: ['45%', '66%'],
                    center: ['40%', '55%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: "{b}\n{d}%"
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: peoples
                }
            ]
        };

        myChart.setOption(option);
        // myChart.dispatchAction({
        //     type: 'highlight',
        //     seriesIndex: 0,
        //     dataIndex: 0
        // });
        // myChart.on('mouseover', (v) => {
        //     if (v.dataIndex != 0) {
        //         myChart.dispatchAction({
        //             type: 'downplay',
        //             seriesIndex: 0,
        //             dataIndex: 0
        //         });
        //     }
        // });
        // myChart.on('mouseout', (v) => {
        //     myChart.dispatchAction({
        //         type: 'highlight',
        //         seriesIndex: 0,
        //         dataIndex: 0
        //     });
        // });

    },
//    footer 5
    tirvalerStaying(startTime, endTime, regionCode) {
        var that = this
        var dom = echarts.init(document.getElementById('tirvalerStaying'));
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findStopTimeByAreaAndTime",
            data: {startTime: startTime, endTime: endTime, addressCode: regionCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push({
                            value: item.num,
                            name: item.days,
                            itemStyle: {color: pillarColor[index]}
                        });
                        header.push(
                            item.days
                        );
                    });
                }
            }
        });
        that.birckPieWithLine(dom, peoples)
    },
//    footer 6
    sceneSunAccount(startTime, endTime, regionCode) {
        var that = this
        var dom = echarts.init(document.getElementById('sceneSunAccount'));
        var peoples = [];
        var header = [];
        var color = ['#4B7EFE', '#36D9FC'];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findMoneyByAreaAndTime",
            data: {startTime: startTime, endTime: endTime, addressCode: regionCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push({
                            value: item.money.toFixed(0),
                            name: item.type,
                            itemStyle: {color: color[index]}
                        });
                        header.push(
                            item.days
                        );
                    });
                }
            }
        });
        that.birckPieWithLine(dom, peoples)
    },
//    footer 2
    tirvalAgeAnalysis(startTime, endTime, regionCode) {
        var that = this
        var dom = echarts.init(document.getElementById('tirvalAgeAnalysis'));
        var peoples = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findAgeByAreaAndTime",
            data: {startTime: startTime, endTime: endTime, addressCode: regionCode},
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push(
                            (item.sum / 10000).toFixed(2)
                        );
                        header.push(
                            item.ageLevel
                        );
                    });
                }
            }
        });
        var grid = {
            left: '13%',
            right: '2%',
            bottom: '5%',
            top: '5%',
            containLabel: true
        }
        var axisLabel = {
            show: true,
            margin: 0,
            align: 'left',
            verticalAlign: 'bottom',
            padding: [0, 0, -5, -50]
        }
        that.verticalBar(dom, peoples.reverse(), header.reverse(), grid, axisLabel)
    },
//    footer 3
    chinaMap(startTime, endTime, regionCode) {
        var myChart = echarts.init(document.getElementById('chinaMap'));
        var peoples = [];
        var sum = 0;
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findSourceByAreaAndTimeLocal",
            data: {startTime: startTime, endTime: endTime, addressCode: regionCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        peoples.push({
                                name: item.province_name.replace("自治区", "")
                                    .replace("省", "").replace("市", "")
                                    .replace("维吾尔", "")
                                    .replace("特别行政区", "")
                                    .replace("回族", "")
                                    .replace("壮族", "")
                                    .replace(" ", ""),
                                value: item.sum,
                            }
                        );
                        sum = sum + item.sum;
                    });
                }
            }
        });
        option = {
            backgroundColor: '#f2f2f2',
            tooltip: {
                trigger: 'item',
                formatter: '{b}',
            },
            roam: true,
            visualMap: [
                {
                    type: 'continuous',
                    min: 0,
                    max: sum,
                    top: '5%',
                    left: '0',
                    bottom: '0',
                    text: ['高', '低'],
                    color: ['#0a469d', '#9dae6e', '#2db3d3', '#2db3d3'],
                    textGap: 2
                }

            ],
            roamController: {
                show: false,
                x: 'right',
                mapTypeControl: {
                    'china': true
                }
            },
            series: [{
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }

                },
                data: peoples,
            },]
        };


        myChart.setOption(option);
    },
//    footer 4
    secentMeansAnalysis(startTime, endTime, regionCode) {
        var curWwwPath = window.document.location.href;
        var pathname = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathname);
        var localhostPath = curWwwPath.substring(0, pos);


        var myChart = echarts.init(document.getElementById('secentMeansAnalysis'));
        var pathSymbols = {

            plane: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/plane.png',
            train: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/train.png',
            car: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/car.png',
            ship: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/ship.png',
            other: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/other.png',
        };
        var peoples = [];
        var datas = [];
        var header = [];
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "scenicStatistics/findWayByAreaAndTime",
            data: {startTime: startTime, endTime: endTime, addressCode: regionCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data, function (index, item) {
                        if (item.type == "轮船") {
                            peoples.push({
                                    value: (item.num / 10000).toFixed(2),
                                    symbol: pathSymbols.ship,
                                    symbolSize: [30, 30]
                                }
                            );
                        } else if (item.type == "飞机") {
                            peoples.push({
                                    value: (item.num / 10000).toFixed(2),
                                    symbol: pathSymbols.plane,
                                    symbolSize: [30, 30]
                                }
                            );
                        } else if (item.type == "高铁") {
                            peoples.push({
                                    value: (item.num / 10000).toFixed(2),
                                    symbol: pathSymbols.train,
                                    symbolSize: [30, 30]
                                }
                            );
                        } else if (item.type == "汽车") {
                            peoples.push({
                                    value: (item.num / 10000).toFixed(2),
                                    symbol: pathSymbols.car,
                                    symbolSize: [30, 30]
                                }
                            );
                        } else if (item.type == "其他") {
                            peoples.push({
                                    value: (item.num / 10000).toFixed(2),
                                    symbol: pathSymbols.other,
                                    symbolSize: [30, 30]
                                }
                            );
                        }
                        header.push(item.type);
                        datas.push((item.num / 10000).toFixed(2));
                    });
                }
            }
        });
        console.log(datas);
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'none'
                },
                formatter: function (params) {
                    return params[0].name + ': ' + params[0].value;
                }
            },
            grid: {
                left: '2%',
                right: '2%',
                bottom: '3%',
                top: '18%',
                containLabel: true
            },
            xAxis: {
                data: header,
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis: {
                name: '单位：万人',
                splitLine: {show: false},
                axisTick: {show: false},
                axisLine: {show: false},
                axisLabel: {show: true}
            },
            color: ['#0fcdf8', '#1d93e5'],
            series: [{
                name: 'hill',
                radius: ['25%', '50%'],
                type: 'pictorialBar',
                barCategoryGap: '-130%',
                symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                data: datas,
                z: 10,
                barWidth: '120%',
            }, {
                name: 'glyph',
                type: 'pictorialBar',
                pictorialBar: ['50%', '50%'],
                barGap: '-100%',
                symbolPosition: 'end',
                symbolSize: 50,
                symbolOffset: [0, '-120%'],
                // itemStyle: {
                //     normal: {
                //         opacity: 1,
                //         shadowOffsetX:20,
                //     },
                //     emphasis: {
                //         opacity: 1
                //     }
                // },
                barWidth: '120%',
                data: peoples
            }]
        };

        myChart.setOption(option);
    },
    setOption(myChart, item) {
        var mapDate = []
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
                that.setOption(myChart, 'yulong')
            } else if (res.name === "古城") {
                region = 530702
                that.setOption(myChart, 'gucheng')
            } else if (res.name === "永胜") {
                region = 530722
                that.setOption(myChart, 'yongsheng')
            } else if (res.name === "华坪") {
                region = 530723
                that.setOption(myChart, 'huaping')
            } else if (res.name === "宁蒗") {
                region = 530724
                that.setOption(myChart, 'ninglang')
            }
            var year = $("#yearId").val().replace("年", "");
            var month = $("#monthId").val().replace("月", "");
            var trs = /^\d{4}$/;
            if (!trs.test(year)) {
                alert("请选择年份");
                return;
            }
            var endTime = getLastDay(parseInt(year), month).getTime();
            var startTime = getfirstDay(parseInt(year), month).getTime();
            console.log(endTime + "++++++++" + startTime + "++++++" + region);
            that.doubleBar(region, year)
            that.secenyParkAnalysis(year, region)
            that.secenyTirvalerAnalysis(region)
            that.secentCategoryAnalysis(startTime, endTime, region)
            that.tirvalAgeAnalysis(startTime, endTime, region)
            that.chinaMap(startTime, endTime, region)
            that.secentMeansAnalysis(startTime, endTime, region)
            that.tirvalerStaying(startTime, endTime, region)
            that.sceneSunAccount(startTime, endTime, region)
            getDateMeetNumber(region);
            //
        })
    }
}
scenicAnalysis.init('', '', '')

function randomHexColor() { //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
}
