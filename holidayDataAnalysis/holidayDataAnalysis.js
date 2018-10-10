//年选择器
// laydate.render({
//     elem: '#yearInput'
//     , type: 'year'
// });
var date = new Date();
var gyear = date.getFullYear();
var gmonth = date.getMonth();
var ym = "";
var gregion = 530700
var holiday = []

function changeTime(yearId, monthId) {
    var year = document.getElementById(yearId).value;
    var month = document.getElementById(monthId).value;
    console.log(month)
    var trs = /^\d{4}$/;
    if (!trs.test(year)) {
        alert("请选择年份");
        return;
    }
    gyear = parseInt(year);
    gmonth = parseInt(month)
    console.log(gmonth)
    ym = gyear + "-" + gmonth;
    $.ajax({
        url: getEveryHolidayFlow,
        contentType: "application/json",
        type: "GET",
        data: {
            "regionCode": gregion,
            "year": gyear
        },
        async: false,
        success: function (result) {
            console.log(JSON.stringify(result));
            var datas = result.data
            var loadHtml = ''
            var totalPeople = 0;
            for (var i = 0; i < datas.length; i++) {
                loadHtml += ' <li>' +
                    '<div class="tittles">' + datas[i].holiday + '</div>' +
                    '<div class="details">' + datas[i].tourist + '<span style="font-size: 20px;margin-top:10px;">' + '万人' + '</span>' + '</div>' +
                    '</li>'
                totalPeople += parseFloat(datas[i].tourist);
            }
            $('.leftCenter .details .all').html(loadHtml);

            var domList = totalPeople.toFixed(2) + ""
            var dataList = domList.split("");
            var ht = "";
            for (var i = 0; i < dataList.length; i++) {
                ht += '<span>' + dataList[i] + '</span>'
            }
            $('.sumTirvaler .figure').html(ht)
        }
    });


    $.ajax({
        url: getAccountByYear,
        contentType: "application/json",
        type: "GET",
        data: {
            "regionCode": gregion,
            "year": gyear
        },
        async: false,
        success: function (result) {
            console.log(JSON.stringify(result));
            var datas = result.data + "";
            var dataList = datas.split("")
            var domList = ''
            for (var i = 0; i < dataList.length; i++) {
                domList += '<span>' + dataList[i] + '</span>'
            }
            $('.allSum .figure').html(domList)
        }
    });


}

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


function getfirstDay(year, month) {
    var new_year = year; //取当前的年份
    var new_month = month - 1;//取下一个月的第一天，方便计算（最后一天不固定）
    return new Date(new_year, new_month, 1);//获取当月最后一天日期
}


require(['../js/map.js'], function () {
    var num = 0
    //    map
    var holidayDataAnalysis = {
        setOption(myChart, item) {
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
                    gregion = region
                    holidayDataAnalysis.init()

                    that.setOption(myChart, 'yulong')
                    //that.lijiangmap('yulong')
                } else if (res.name === "古城") {
                    region = 530702
                    gregion = region

                    holidayDataAnalysis.init()

                    that.setOption(myChart, 'gucheng')
                } else if (res.name === "永胜") {
                    region = 530722
                    gregion = region

                    holidayDataAnalysis.init()
                    that.setOption(myChart, 'yongsheng')
                } else if (res.name === "华坪") {
                    region = 530723
                    gregion = region

                    holidayDataAnalysis.init()
                    that.setOption(myChart, 'huaping')
                } else if (res.name === "宁蒗彝族") {
                    region = 530724
                    gregion = region

                    holidayDataAnalysis.init()
                    that.setOption(myChart, 'ninglang')
                }


            })
        },
        init: function () {
            var that = this
            that.beyondFourASeceny()
            that.sweepingDayAccount()
            that.springFestivalAccount()
            that.laborDayAccount()
            that.festivalAccount()
            that.middleAutumuFestival()
            that.nationalDay()
            that.beyondFourASecenyLine()
            that.sweepingDayAccountLine()
            that.laborDayAccountLine()
            that.springFestivalAccountLine()
            that.festivalAccountLine()
            that.middleAutumuFestivalLine()
            that.nationalDayLine()
            that.yearsAllAccount()
            that.yearsAllTirvaler()
            that.differHolidayTirvalers()

        },
        echartsBar(doms, barColors, income, year) {
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
                    bottom: '5%',
                    top: '20%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: year,
                        // axisTick: {
                        //     alignWithLabel: true
                        // },
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
                        name: '单位:万元',
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
                        barWidth: '30%',
                        itemStyle: {
                            barBorderRadius: [5, 5, 0, 0],
                            color: barColors
                        },
                        data: income
                    }
                ]
            };
            myChart.setOption(option);
        },
        echartsLine(doms, lineColor, areaColor, year, amount) {
            var myChart = doms;
            option = {
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    top: '20%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: year,
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
                yAxis: {
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
                },
                series: [{
                    data: amount,
                    type: 'line',
                    lineStyle: {
                        color: lineColor
                    },
                    areaStyle: {
                        color: areaColor
                    },
                    symbol: 'circle',//拐点样式
                    symbolSize: 3.9,//拐点大小
                    showSymbol: false
                }]
            };
            myChart.setOption(option);
        },
        //1*1 元旦
        beyondFourASeceny(region) {
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var that = this
            var url = getHolidayAccount
            var upDates = that.formatDates(region, 100050, url, 'bar')
            var dom = echarts.init(document.getElementById('beyondFourASeceny'));
            var barColors = '#4b7efe'
            that.echartsBar(dom, barColors, upDates.allIncome, upDates.allYear)
        },
        beyondFourASecenyLine(region) {
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var that = this
            var url = getHolidayFlow
            var upDates = that.formatDates(region, 100050, url, 'pie')
            var dom = echarts.init(document.getElementById('beyondFourASecenyLine'));
            var lineColor = "#3373e6"
            var areaColor = "#4b7efe"
            that.echartsLine(dom, lineColor, areaColor, upDates.allYear, upDates.allTotal)
        },
        //2*1 清明节
        sweepingDayAccount(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayAccount
            var upDates = that.formatDates(region, 100058, url, 'bar')
            var dom = echarts.init(document.getElementById('sweepingDayAccount'));
            var barColors = '#4ad970'
            that.echartsBar(dom, barColors, upDates.allIncome, upDates.allYear)
        },
        sweepingDayAccountLine(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayFlow
            var upDates = that.formatDates(region, 100058, url, 'pie')
            var dom = echarts.init(document.getElementById('sweepingDayAccountLine'));
            var lineColor = "#4ad970"
            var areaColor = "#a7edb9"
            that.echartsLine(dom, lineColor, areaColor, upDates.allYear, upDates.allTotal)
        },
        //1*3 春节
        springFestivalAccount(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayAccount
            var upDates = that.formatDates(gregion, 100054, url, 'bar')
            var dom = echarts.init(document.getElementById('springFestivalAccount'));
            var barColors = '#36d9fc'
            that.echartsBar(dom, barColors, upDates.allIncome, upDates.allYear)
        },
        springFestivalAccountLine(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayFlow
            var upDates = that.formatDates(region, 100054, url, 'pie')
            var dom = echarts.init(document.getElementById('springFestivalAccountLine'));
            var lineColor = "#36d9fc"
            var areaColor = "#77e5fd"
            that.echartsLine(dom, lineColor, areaColor, upDates.allYear, upDates.allTotal)
        },
        //2*3 劳动节
        laborDayAccount(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayAccount
            var upDates = that.formatDates(region, 100062, url, 'bar')
            var dom = echarts.init(document.getElementById('laborDayAccount'));
            var barColors = '#a05dfd'
            that.echartsBar(dom, barColors, upDates.allIncome, upDates.allYear)
        },
        laborDayAccountLine(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayFlow
            var upDates = that.formatDates(region, 100062, url, 'pie')
            var dom = echarts.init(document.getElementById('laborDayAccountLine'));
            var lineColor = "#a05dfd"
            var areaColor = "#cca8fe"
            that.echartsLine(dom, lineColor, areaColor, upDates.allYear, upDates.allTotal)
        },
        //footer 1  端午节
        festivalAccount(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayAccount
            var upDates = that.formatDates(region, 100066, url, 'bar')
            var dom = echarts.init(document.getElementById('festivalAccount'));
            var barColors = '#fec400'
            that.echartsBar(dom, barColors, upDates.allIncome, upDates.allYear)
        },
        festivalAccountLine(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayFlow
            // console.log("-----------")
            // console.log(region)
            // console.log(url)
            var upDates = that.formatDates(region, 100066, url, 'pie')
            console.log(upDates)
            var dom = echarts.init(document.getElementById('festivalAccountLine'));
            var lineColor = "#fec400"
            var areaColor = "#ffe489"
            that.echartsLine(dom, lineColor, areaColor, upDates.allYear, upDates.allTotal)
        },
        // footer 2 中秋节
        middleAutumuFestival(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayAccount
            var upDates = that.formatDates(region, 100070, url, 'bar')
            var dom = echarts.init(document.getElementById('middleAutumuFestival'));
            var barColors = '#13a02d'
            that.echartsBar(dom, barColors, upDates.allIncome, upDates.allYear)
        },
        middleAutumuFestivalLine(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayFlow
            var upDates = that.formatDates(region, 100070, url, 'pie')
            var dom = echarts.init(document.getElementById('middleAutumuFestivalLine'));
            var lineColor = "#13a02d"
            var areaColor = "#97d5a3"
            that.echartsLine(dom, lineColor, areaColor, upDates.allYear, upDates.allTotal)
        },
        // footer 3 国庆节
        nationalDay(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayAccount
            var upDates = that.formatDates(region, 100074, url, 'bar')
            var dom = echarts.init(document.getElementById('nationalDay'));
            var barColors = '#fc7600'
            that.echartsBar(dom, barColors, upDates.allIncome, upDates.allYear)
        },
        nationalDayLine(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var url = getHolidayFlow
            var upDates = that.formatDates(region, 100074, url, 'pie')
            var dom = echarts.init(document.getElementById('nationalDayLine'));
            var lineColor = "#fc7600"
            var areaColor = "#febf88"
            that.echartsLine(dom, lineColor, areaColor, upDates.allYear, upDates.allTotal)
        },
//        本年度总游客
        yearsAllTirvaler(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var year = gyear
            var url = getFlowByYear
            var datas = '' + that.allCateLoadDate(region, year, url).data
            var dataList = datas.split("")
            var domList = ''
            for (var i = 0; i < dataList.length; i++) {
                domList += '<span>' + dataList[i] + '</span>'
            }
            $('.sumTirvaler .figure').html(domList)
        },
//        本地年度总收入
        yearsAllAccount(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            region = gregion
            var year = gyear
            var url = getAccountByYear
            var datas = '' + that.allCateLoadDate(region, year, url).data
            var dataList = datas.split("")
            var domList = ''
            for (var i = 0; i < dataList.length; i++) {
                domList += '<span>' + dataList[i] + '</span>'
            }
            $('.allSum .figure').html(domList)


        },
        //各节假日游客数

        differHolidayTirvalers(region) {
            var that = this
            if (region === undefined) {
                region = 530700
            }
            var year = gyear
            var url = getEveryHolidayFlow
            var datas = that.allCateLoadDate(gregion, year, url).data
            console.log("+++++++++++++")
            console.log(datas);
            var loadHtml = ''
            for (var i = 0; i < datas.length ; i++) {
                loadHtml += ' <li>' +
                    '<div class="tittles">' + datas[i].holiday + '</div>' +
                    '<div class="details">' + datas[i].tourist + '<span style="font-size: 18px;margin-top:6px; margin-left: 8px;">' + '万人' + '</span>' + '</div>' +
                    '</li>'
            }
            $('.leftCenter .details .all').html(loadHtml)
        },


        formatDates(region, holiday, url, means) {
            var that = this
            if (means === 'bar') {
                var data = that.loadDate(region, holiday, url)
                var year = []
                var income = []
                for (var i = 0; i < data.length; i++) {
                    year.push(data[i].year)
                    income.push(data[i].income)
                }
                var objs = {
                    allYear: year,
                    allIncome: income
                }
                return objs
            } else if (means === 'pie') {
                var data = that.loadDate(region, holiday, url)
                var year = []
                var total = []
                for (var i = 0; i < data.length; i++) {
                    year.push(data[i].year)
                    total.push(data[i].total)
                }
                var obj = {
                    allYear: year,
                    allTotal: total
                }
                return obj
            }

        },
        loadDate(region, holiday, url) {
            var allParam = {}
            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                data: {
                    regionCode: region,
                    holidayCode: holiday
                },
                success: function (res) {
                    allParam = res.data
                }
            })
            return allParam
        },
        allCateLoadDate(region, year, url) {
            var alls = {}
            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                data: {
                    regionCode: region,
                    year: year
                },
                success: function (res) {
                    alls = res
                }
            })
            return alls
        }

    }
    holidayDataAnalysis.init();
    holidayDataAnalysis.lijiangmap();
})

