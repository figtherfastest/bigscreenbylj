var maleNum = 0
var femaleNum = 0
var otherNum = 0
var data1;
var dataProvinceList = {};
var globalyear = new Date().getFullYear() + "";
var globalmoth = (new Date().getMonth() + 1) + "";

function changeTime(yearId, monthId) {
    var year = document.getElementById(yearId).value;
    var month = document.getElementById(monthId).value;
    var trs = /^\d{4}$/;
    if (!trs.test(year)) {
        alert("请选择年份");
        return;
    }
    this.globalyear = year;
    this.globalmoth = month;
    touristPortrait.init();
}

var touristPortrait = {

    init: function () {
        var that = this;
        //性别
        data1 = that.getData().data
        try {
            that.secenyAnalysis()
        } catch (e) {
            console.log("无数据")
        }

        try {
            //年龄
            that.ageAnalysis();
        } catch (err) {
            console.log("无数据")
        }
        try {
            //交通
            that.trafficAnalysis();
        } catch (err) {
            console.log("无数据")
        }
        try {
            //停留时长
            that.stayAnalysis();
        } catch (err) {
            console.log("无数据")
        }
        try {
            //目的地分析
            that.travelAnalysis();
        } catch (err) {
            console.log("无数据")
        }
        try {
            //游览景区数据
            that.scenicSpotData();
        } catch (err) {
            console.log("无数据")
        }
        try {
            //住宿
            that.roomAnalysis()
        } catch (err) {
            console.log("无数据")
        }
        try {
            //到访 频次
            that.visiteAnalysis()
        } catch (err) {
            console.log("无数据")
        }
        try {
            //职业
            that.jobs()
        } catch (err) {
            console.log("无数据")
        }
        try {
            //消费分析
            that.consumption()
        } catch (err) {
            console.log("无数据")
        }

        //省份排行
        that.provinceAnalysis()
    },
    //产生随机颜色
    randomHexColor: function () { //随机生成十六进制颜色
        var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
        while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
            hex = '0' + hex;
        }
        return '#' + hex; //返回‘#'开头16进制颜色
    },

    //ajax获取游客画像所有数据
    getData: function () {
        var resultData = "";
        $.ajax({
            url: getVisitorsInfPage,
            contentType: "application/json",
            data: {
                "year": globalyear,
                "month": globalmoth

            },
            type: "GET",
            async: false,
            success: function (result) {
                resultData = result
            }
        });
        return resultData

    },
    //性别比例图
    secenyAnalysis: function () {
        var that = this;
        var data = data1;
        var sex;
        sexName = []
        var sexData = data.sex;
        var colors = []
        colors = pillarColor
        var sexValue = [];
        for (var i in sexData) {
            sexValue[i] = {
                "value": sexData[i].total,
                "name": sexData[i].gender,
                "itemStyle": {
                    "color": colors[i]
                }
            }
            sexName[i] = sexData[i].gender
            if (sexData[i].gender == "男性") {
                maleNum = formatMoney(sexData[i].total, 0)
            } else if (sexData[i].gender == "女性") {
                femaleNum = formatMoney(sexData[i].total, 0)
            } else {
                otherNum = formatMoney(sexData[i].total, 0)
            }
        }

        $("#sexRatio").html("<span>男性<span style='color:#fc8319;'>" + maleNum.slice(0,-5) + "万人</span></span>&nbsp;<span>女性<span style='color:#fc8319';>" + femaleNum.slice(0,-5)+ "万人</span></span>&nbsp;<span>未知<span style='color:#fc8319;'>" + otherNum.slice(0,-5) + "万人</span></span>&nbsp;")
        var myChart = echarts.init(document.getElementById('secenyAnalysis'));
        option = {
            title: {
                text: '',
                textStyle: {
                    color: '#057bff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            graphic: {
                type: 'text',
                top: 'center',
                // left: 'center',
                z: 2,
                zlevel: 100,
                style: {
                    text: '游客性别\n分析',
                    x: 132,
                    y: 125,
                    textAlign: 'center',
                    width: 30,
                    height: 30,
                    fontSize: 'bolder 16',
                    fill:'#4B7EFE'
                },
                fontSize: 20,
            },
            legend: {
                orient: 'vertical',
                // itemGap: 2,
                //  itemWidth: 5,
                itemHeight: 10,
                x: '70%',
                y: '30%',
                data: sexName
            },
            series: [{
                name: '',
                type: 'pie',
                radius: ['55%', '80%'],
                center: ['35%', '50%'],
                labelLine: {
                    normal: {
                        length: 5 //指示线长度
                    }
                },
                data: sexValue
            }]
        };
        myChart.setOption(option);
    },
    //年龄比例图
    ageAnalysis: function () {
        var that = this;
        var data = data1;
        var ageData = data.age;
        var ageResult = [];
        for (var i in ageData) {
            ageResult[i] = ageData[i].ratio;
        }
        var myChart = echarts.init(document.getElementById('ageAnalysis'));
        var datas = ageResult;
        var max = Math.max.apply(null, datas) / 0.85;
        var keys = ['0-18', '19-30', '31-40', '40-60', '60以上']
        var myColor = ['#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#128aff', '#06fba9', '#ffc316'];
        option = {
            grid: {
                left: '10%',
                right: '5%',
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
                        padding: [0, 0, -5, -50]
                    }

                },
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
                            color: '#000',
                            offset: [300, -15],
                            formatter: '{c}%'
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
                    data: [max, max, max, max, max, max],
                    barWidth: 10,
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false,
                            offset: [10, 15],
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
    //交通人数图
    trafficAnalysis: function () {
        //获取数据渲染
        var resultTransport = data1.transport
        var curWwwPath = window.document.location.href;
        var pathname = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathname);
        var localhostPath = curWwwPath.substring(0, pos);
        var myChart = echarts.init(document.getElementById('trafficAnalysis'));
        var pathSymbols = {
             plane: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/plane.png',
            // plane:'image://../image/scenicAnalysis/train.png',
            train: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/train.png',
            car: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/car.png',
            ship: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/ship.png',
            other: 'image://' + localhostPath + '/dmzl_cj/ljBusiness/image/scenicAnalysis/other.png',
        };
        var peoples = [];
        var datas = [];
        var header = [];
        $.each(resultTransport, function (index, item) {
            console.log(item)
            if (item.transport == "轮船") {
                peoples.push({
                        value: (item.total / 10000).toFixed(2),
                        symbol: pathSymbols.ship,
                        symbolSize: [30, 30]
                    }
                );
            } else if (item.transport == "飞机") {
                peoples.push({
                        value: (item.total / 10000).toFixed(2),
                        symbol: pathSymbols.plane,
                        symbolSize: [30, 30]
                    }
                );
            } else if (item.transport == "高铁") {
                peoples.push({
                        value: (item.total / 10000).toFixed(2),
                        symbol: pathSymbols.train,
                        symbolSize: [30, 30]
                    }
                );
            } else if (item.transport == "汽车") {
                peoples.push({
                        value: (item.total / 10000).toFixed(2),
                        symbol: pathSymbols.car,
                        symbolSize: [30, 30]
                    }
                );
            } else if (item.transport == "其他") {
                peoples.push({
                        value: (item.total / 10000).toFixed(2),
                        symbol: pathSymbols.other,
                        symbolSize: [30, 30]
                    }
                );
            }
            header.push(item.transport);
            datas.push((item.total / 10000).toFixed(2));
        });
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
                name: '单位:万',
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
                symbolSize: 30,
                symbolOffset: [0, '-120%'],
                symbol: [ 'arrow'],
                barWidth: '120%',
                data: peoples
            }]
        };
        myChart.setOption(option);
    },
    //停留时长
    stayAnalysis: function () {
        //获取数据停留时长
        var indicatorData = [];
        var result = data1.stopTime
        var values = []
        for (var i in result) {
            values[i] = result[i].total
        }
        var max = Math.max.apply(null, values) / 0.85;
        for (var i in result) {
            indicatorData[i] = {
                "name": result[i].stopTime,
                "max": max
            }
        }
        console.log(values);
        console.log(indicatorData);
        var myChart = echarts.init(document.getElementById('stayAnalysis'));
        option = {
            tooltip: {
                "show": true,
                "trigger": "item"
            },
            legend: {
                data: []
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#057bff' // 图表背景网格线的颜色
                }
            },
            radar: {
                //shape: 'circle',
                radius: '60%',
                center: ['50%', '50%'],
                splitNumber: 8,
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#057bff', // 设置网格的颜色
                    },
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: '#fff', // 图表背景的颜色
                    },
                },
                name: {
                    textStyle: {
                        color: '#000',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: indicatorData
            },
            series: [{
                name: '数据：',
                type: 'radar',
                // areaStyle: {normal: {}},
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                symbolSize: 6, // 拐点的大小
                data: [{
                    value: values,
                    name: '',
                    areaStyle: {
                        normal: {
                            color: '#f7b67f'
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#fc7600',
                        },
                    },
                },]
            }]
        };
        myChart.setOption(option);
    },
    //出行目的地
    travelAnalysis: function () {
        var result = data1.purpose
        var names = []
        var value = []
        for (var i in result) {
            names[i] = result[i].purpose
            value[i] = result[i].ratio
        }
        var myChart = echarts.init(document.getElementById('travelAnalysis'));
        option = {
            color: ['#3398DB'],
            title: {
                text: '',
                subtext: '单位:次',
                subtextStyle: {
                    color: '#000'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top: '19%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: names,
                axisLabel: {
                    interval: 0,
                    rotate: 30,

                },
                axisTick: { //x轴刻度线
                    "show": false
                },
                axisLine: {
                    show: false
                },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    formatter: '{value}%'
                },
                axisLine: {
                    show: false
                },
                show: true,
                axisTick: {
                    "show": false
                },
            }],
            series: [{
                name: '',
                type: 'bar',
                barWidth: '30%',
                barMinHeight: '40%',
                color: '#4b7efe',
                label: {
                    normal: {
                        show: true,
                        formatter: '{c}%',
                        position: 'top',
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius: [5, 5, 0, 0],
                    }
                },
                data: value
            }]
        };
        myChart.setOption(option);
    },
    //游览景区数据
    scenicSpotData: function () {
        var spotNum = data1.visitScenic;
        var names = []
        var value = []
        for (var i in spotNum) {
            names[i] = spotNum[i].visitScenic
            value[i] = spotNum[i].total
        }
        console.log(names)
        var myChart = echarts.init(document.getElementById('scenicSpotData'));
        var hideStyle = {
            normal: {
                color: '#fff', //未完成的圆环的颜色
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            },
            emphasis: {
                show: false
            }
        };
        var option = {
            backgroundColor: '#fff',
            graphic: {
                type: 'text',
                top: 'center',
                // left: 'center',
                z: 2,
                zlevel: 100,
                style: {
                    text: '游客浏览\n数据分析',
                    x: 170,
                    y: 100,
                    textAlign: 'center',
                    width: 30,
                    height: 30,
                    fontSize: 16,
                    // fontWeight: 'bolder'
                },
            },
            grid: {
                left: '2%',
                right: '20%',
                bottom: '0%',
                top: '1%',
                containLabel: true
            },
            legend: {
                orient: 'vertical',
                data: names,
                x: '70%',
                y: '4%',
                icon: 'roundRect'
            },
            series:
                [
                    {
                        name: 'Line 1',
                        type: 'pie',
                        color: '#487efe',
                        clockWise: false, //顺时针
                        radius: [60, 86],
                        center: ['45%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'inside'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false,
                            }
                        },
                        hoverAnimation: false,
                        data: [{
                            value: value[2],
                            name: names[2]
                        }, {
                            value: 25,
                            name: 'hide',
                            itemStyle: hideStyle
                        }]
                    },
                    {
                        name: 'Line 2',
                        type: 'pie',
                        color: '#4ad970',
                        clockWise: false, //顺时针
                        radius: [60, 80],
                        center: ['45%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'inside'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        hoverAnimation: false,
                        data: [{
                            value: value[1],
                            name: names[1]
                        }, {
                            value: 35,
                            name: 'hide',
                            itemStyle: hideStyle
                        }]
                    },
                    {
                        name: 'Line 3',
                        type: 'pie',
                        color: '#fec400',
                        clockWise: false, //顺时针
                        radius: [60, 70],
                        center: ['45%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'inside'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        hoverAnimation: false,
                        data: [{
                            value: value[0],
                            name: names[0]
                        }, {
                            value: 45,
                            name: 'hide',
                            itemStyle: hideStyle
                        }]
                    },
                    {
                        name: 'Line 4',
                        type: 'pie',
                        color: '#36d9fc',
                        clockWise: true, //顺时针
                        radius: [0, 50],
                        center: ['45%', '50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'inside'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        hoverAnimation: true,
                        data: [{
                            value: 10,
                            name: 'D'
                        }, {
                            value: 0,
                            name: '',
                            itemStyle: {}
                        }]
                    }
                ]
        };
        myChart.setOption(option);
    },
    //住宿情况数据
    roomAnalysis: function () {
        var resultSleep = data1.sleep
        var indicatorDatas = [];
        var values = []
        for (var i in resultSleep) {
            // indicatorDatas[i] = {
            //     "name": resultSleep[i].stay,
            //     "max": resultSleep[i].touristTotal
            // },
            values[i] = resultSleep[i].total
        }
        var max1 = Math.max.apply(null, values) / 0.85;
        console.log(max1)
        var myChart = echarts.init(document.getElementById('roomAnalysis'));
        option = {
            title: {
                text: '',
                textStyle: {
                    color: '#057bff'
                }
            },
            tooltip: {},
            legend: {
                data: []
            },
            splitLine: {
                show: true,
                lineStyle: {
                    width: 1,
                    color: '#057bff' // 图表背景网格线的颜色
                }
            },
            radar: {
                shape: 'circle',
                splitNumber: 4,
                radius: '65%',
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: '#057bff', // 设置网格的颜色
                    },
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: '#fff', // 图表背景的颜色
                    },
                },
                name: {
                    textStyle: {
                        color: '#000',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: [{
                    name: '客栈',
                    max: max1
                },
                    {
                        name: '三星级',
                        max: max1
                    },
                    {
                        name: '三星级以下',
                        max: max1
                    },
                    {
                        name: '四星级',
                        max: max1
                    },
                    {
                        name: '五星级',
                        max: max1
                    }
                ]
            },
            series: [{
                name: '数据：',
                type: 'radar',
                // areaStyle: {normal: {}},
                symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                symbolSize: 6, // 拐点的大小
                data: [{
                    value: values,
                    name: '',
                    areaStyle: {
                        normal: {
                            color: '#f7b67f'
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: '#fc7600',
                        },
                    },
                },]
            }]
        };
        myChart.setOption(option);
        window.onresize = myChart.resize;
    },
    //到访频次
    visiteAnalysis: function () {
        var visitData = data1.frequency
        console.log(visitData)
        //插入数据渲染
        var colors = []
        colors = ringColor
        var resultVisit = []
        for (var i in visitData) {
            var color = this.randomHexColor()
            console.log(color)
            resultVisit[i] = {
                "name": visitData[i].frequency,
                "value": visitData[i].total,
                // 'selected':'true',
                "itemStyle": {
                    "color": colors[i]
                }
            }
        }
        var myChart = echarts.init(document.getElementById('visiteAnalysis'));
        option = {
            title: {
                text: '',
                subtext: '',
                textStyle: {
                    color: '#057bff'
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [{
                name: '',
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                data: resultVisit,
                labelLine: {
                    normal: {
                        show: true,
                        length:5
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        myChart.setOption(option);
    },
    //职业
    jobs: function () {
        var jobsData = data1.profession
        var names = []
        var values = []
        for (var i in jobsData) {
            names[i] = jobsData[i].profession,
                values[i] = {
                    "value": jobsData[i].total,
                    "name": jobsData[i].profession,
                    "itemStyle": "placeHolderStyle"
                }
        }
        var myChart = echarts.init(document.getElementById('jobs'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: []
            },
            label: {
                normal: {
                    show: true,
                    formatter: '{d}%'
                }
            },
            calculable: true,
            series: [{
                name: '消费分析',
                type: 'pie',
                radius: [30, 75],
                center: ['50%', '50%'],
                roseType: 'area',
                label: {
                    normal: {
                        show: true,
                        color: '#252830',
                        formatter: '{b}\n{d}%',
                        fontWeight:'bolder'
                    }
                },
                labelLine: {
                    normal: {
                        length: 6
                    }
                },
                data: values.sort()
            }]
        };
        myChart.setOption(option);
    },
    //消费分析
    consumption: function () {
        var payData = data1.consume;
        var values = []
        var colors = []
        colors = pillarColor
        for (var i in payData) {
            var color = this.randomHexColor()
            values[i] = {
                "value": payData[i].total,
                "name": payData[i].consume,
                "itemStyle": {
                    "color": colors[i]
                }

            }
        }
        var myChart = echarts.init(document.getElementById('consumption'))

        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: []
            },
            label: {
                normal: {
                    show: true,
                    formatter: '{d}%'
                }
            },
            calculable: true,
            series: [{
                type: 'pie',
                radius: [30, 75],
                center: ['50%', '50%'],
                roseType: 'area',
                label: {
                    normal: {
                        show: true,
                        color: '#252830',
                        fontWeight:'bolder',
                        formatter: '{b}\n{d}%'
                    }
                },
                labelLine: {
                    normal: {
                        length: 6
                    }
                },
                data: values.sort()
            }]
        };
        myChart.setOption(option);
    },
    //省份排行
    provinceAnalysis: function () {
        var dataProvince = data1.touristSource
        dataProvinceList = data1.touristSource
        console.log(dataProvinceList);
        console.log(dataProvince);
        var datas = [];
        var names = []
        for (var i in dataProvince) {
            datas[i] = dataProvince[i].total,
                names[i] = dataProvince[i].tourist_source
        }
        var myChart = echarts.init(document.getElementById('provinceAnalysis'));
        var max = Math.max.apply(null, datas) / 0.85;
        var numberColor = []
        var maxList = []
        var indexList = []
        for (var j = 0; j < datas.length; j++) {
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
                left: '5%',
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
                    data: names,
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
                        margin: -10,
                        align: 'left',
                        verticalAlign: 'bottom',
                        padding: [0, 0, 7, -9],
                        fontWeight: 'bolder',
                        color: '#252830',
                        fontSize: '12'
                    },
                    yAxisIndex: 1,
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
                    data: datas,
                    barWidth: 9,
                    z: 30,
                    label: {
                        normal: {
                            show: true,

                            position: 'left',
                            offset: [470, -10],
                            fontWeight: 'bolder',
                            color: '#252830',
                            fontSize: '12',
                            formatter: '{c}/万人'
                        }

                    },
                    itemStyle: {
                        normal: {
                            // barBorderRadius: [5, 5, 0, 0],
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
        var myColor = ['#06fba9', '#ffc316'];
        myChart.setOption(option);
    },

}
touristPortrait.init();
