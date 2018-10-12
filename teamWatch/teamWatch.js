var flowDate = [];
var flowValue = [];
//团队客源地
var teamSourceNames = []
var teamSourceValues = []
//年龄段分析
var ageValue = []
//性别分析
var sexValues = []
var sexNames = []
//消费分析
var moneyValue = []
//行程时长
var travelTime = []
//团队排名
var teamRankValue = []
var teamRankName = []
//交通方式数据
var wayTypeValue = []

var flowDate1 = [];
var flowValue1 = [];

//出入境
var inOut = [];

var topFivDate = [];
var topFivValue = [];

var globalyear = new Date().getFullYear() + "";
var globalmoth = (new Date().getMonth() + 1) + "";

function randomHexColor() { //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
}


function changeTime(yearId, monthId) {
    var year = document.getElementById(yearId).value;
    var month = document.getElementById(monthId).value;
    var trs = /^\d{4}$/;
    if (!trs.test(year)) {
        alert("请选择年份");
        return;
    }
    var endDate = getLastDay(parseInt(year), month);
    var beginDate = getfirstDay(parseInt(year), month);
    ajaxInt(beginDate.getTime() + "", endDate.getTime() + "", '0');
    entry.init();
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


function ajaxInt(startTime, endTime, type) {
    $.ajax({
        url: myUrl[1],
        contentType: "application/json",
        type: "GET",
        data: {
            "startTime": startTime,
            "endTime": endTime,
            "type": type
        },
        async: false,
        success: function (result) {
            console.log(JSON.stringify(result))
            //出行目的地top5
            try {
                //季度或者
                var jidu = ["第一季度", "第二季度", "第三季度", "第四季度"]
                var inChinaQuarterFlowData = result.data.inChinaQuarterFlow
                for (var i = 0; i < inChinaQuarterFlowData.length; i++) {
                    var t = inChinaQuarterFlowData[i].t;
                    var str = t == 0 ? jidu[inChinaQuarterFlowData[i].time - 1] : inChinaQuarterFlowData[i].time + "日";
                    flowDate[i] = str;
                    flowValue[i] = (parseInt(inChinaQuarterFlowData[i].pnum) / 10000).toFixed(2);
                }
            } catch (err) {
                console.log("我要和太阳肩并肩" + err);
            }
            //接待团队客源地
            try {
                var teamSource = result.data.InChinaTeamFrom
                for (var i in teamSource) {
                    teamSourceNames[i] = teamSource[i].name
                    teamSourceValues[i] = teamSource[i].tnum
                }
            } catch (err) {
                console.log(err)
            }
            //年龄分析
            try {
                var ageData = result.data.teamAge
                for (var i in ageData) {
                    ageValue[i] = ageData[i].totalNum
                }

            } catch (err) {
                console.log(err)
            }

            //性别分析
            try {
                var sexData = result.data.teamSex
                var colors = []
                colors = ringColor
                for (var i in sexData) {
                    var color = randomHexColor()
                    sexValues[i] = {
                        "value": sexData[i].nums,
                        "name": sexData[i].sex,
                        "itemStyle": {
                            "color": colors[i]
                        }
                    },
                        sexNames[i] = sexData[i].sex
                }
                $("#sexData").css({
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                }).html("<span>" + sexNames[0] + "<span style='font-size:13px;color:" + randomHexColor() + ";'>" + sexValues[0].value / 10000 + "万人次</span></span>&nbsp;<span>" + sexNames[1] + "<span style='font-size:13px;color:" + randomHexColor() + "';>" + sexValues[1].value / 10000 + "万人次</span></span>&nbsp;<span>" + sexNames[2] + "</span></span><span style='font-size:13px; color:" + randomHexColor() + ";'>" + sexValues[2].value / 10000 + "万人次</span></span>&nbsp;")
            } catch (err) {
                console.log(err)
            }
            //消费分析teamConsumption
            try {
                var money = result.data.teamConsumption
                var colors = []
                colors = pillarColor
                for (var i in money) {
                    moneyValue[i] = {
                        "value": money[i].nums,
                        "name": money[i].consumptionLevel,
                        "itemStyle": {
                            "color": colors[i]
                        }
                    }

                }
            } catch (err) {
                console.log(err)
            }

            //行程时长teamPlay

            try {
                var colors = []
                colors = pillarColor
                var teamPlay = result.data.teamPlay
                for (var i in teamPlay) {
                    var color = randomHexColor()
                    travelTime[i] = {
                        "value": teamPlay[i].nums,
                        "name": teamPlay[i].playTime,
                        "itemStyle": {
                            "color": colors[i]
                        }
                    }

                }
            } catch (err) {
                console.log(err)
            }

            //入境游客top 5  未写
            try {
                var foreignTopTen = result.data.notInChinaTeamFrom
                /*	for(var i in teamPlay) {
                        var color = randomHexColor()
                        travelTime[i] = {
                            "value": teamPlay[i].nums,
                            "name": teamPlay[i].playTime,
                            "itemStyle": {
                                "color": color
                            }
                        }

                    }*/
            } catch (err) {
                console.log(err)
            }
            //团队排名
            try {
                var teamRank = result.data.teamCompent
                for (var i in teamRank) {
                    teamRankName[i] = teamRank[i].companyName
                    teamRankValue[i] = teamRank[i].teamNum

                }
            } catch (err) {
                console.log(err)
            }
            //交通分析

            try {
                var traffic = result.data.rank
                var colors = []
                colors = pillarColor
                for (var i in traffic) {
                    wayTypeValue[i] = {

                        "name": traffic[i].wayType,
                        "value": traffic[i].peopleNum,
                        // 'selected':true,
                        "itemStyle": {
                            "color": colors[i]
                        }
                    }
                }
                wayTypeValue[0].selected = true
            } catch (err) {
                console.log(err)
            }
            //类型
            try {
                var gh = result.data.type;
                inOut = [{
                    value: gh.foreignData,
                    name: '出境游',
                    itemStyle: {
                        color: '#36d9fc'
                    }
                },
                    {
                        value: gh.localData,
                        name: '国内游',
                        itemStyle: {
                            color: '#4b7efe'
                        }
                    }
                ]
            } catch (err) {
                console.log(err)
            }
            try {
                //季度或者
                var jidu1 = ["第一季度", "第二季度", "第三季度", "第四季度"]
                var notInChinaQuarterFlowData = result.data.notInChinaQuarterFlow
                for (var i = 0; i < notInChinaQuarterFlowData.length; i++) {
                    var t = notInChinaQuarterFlowData[i].t;
                    var str = t == 0 ? jidu[notInChinaQuarterFlowData[i].time - 1] : notInChinaQuarterFlowData[i].time + "日";
                    flowDate1[i] = str;
                    flowValue1[i] = (parseInt(inChinaQuarterFlowData[i].pnum) / 10000).toFixed(2);
                }

            } catch (err) {
                console.log(err)
            }

            // 交通方式人数
            try {
                //季度或者
                var rank1 = result.data.rank;
                var rankStr = "";
                var rankStr1 = "";
                var totalP = 0;
                for (var i = 0; i < rank1.length; i++) {
                    totalP += rank1[i].peopleNum;
                    if (i <= 1) {
                        rankStr += '<ul class="aaa" id="">';
                        rankStr += '<li>今日' + rank1[i].wayType + '(人)</li>';
                        rankStr += '<li id="tt_0">' + rank1[i].peopleNum + '</li>';
                        rankStr += '</ul>';
                    } else {
                        rankStr1 += '<ul class="aaa  " id="">';
                        rankStr1 += '<li>今日' + rank1[i].wayType + '(人)</li>';
                        rankStr1 += '<li id="tt_0" class="mlgb">' + rank1[i].peopleNum + '</li>';
                        rankStr1 += '</ul>';
                    }
                }
                var firt = '<ul class="aaa" id="">';
                firt += '<li>今日客流(人)</li>';
                firt += '<li id="tt_0">' + totalP + '</li>';
                firt += '</ul>';
                firt += rankStr;
                document.getElementById("mmmmmmm").innerHTML = firt;
                document.getElementById("mmmmmmmmmmmmm").innerHTML = rankStr1;
            } catch (err) {
                console.log(err)
            }

            //入境Top5
            try {
                var foreignPeopleTopfive = result.data.foreignPeopleTopfive;
                for (var i = 0; i < foreignPeopleTopfive.length; i++) {
                    topFivDate[i] = foreignPeopleTopfive[i].countryName;
                    topFivValue[i] = foreignPeopleTopfive[i].peopleNum;
                }
            } catch (err) {
                console.log("我要和太阳肩并肩" + err);
            }

        }
    });
}


ajaxInt(getfirstDay(this.globalyear, this.globalmoth).getTime() + "", getLastDay(this.globalyear, this.globalmoth).getTime() + "", "1");


var entry = {
    init: function () {
        var that = this
        try {
            that.entryNumber1()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //接待团队
            that.teamCustomer()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //年龄段分析
            that.ageAnalysis()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //性别
            that.secenyAnalysis()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //消费分析
            that.consumption()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //行程时长分析
            that.travelTime()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //入境游客
            that.teamEntrytourist()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //团队排名
            that.teamRanking()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //交通
            that.visiteAnalysis()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //团队类型
            that.teamtype()
        } catch (err) {
            console.log("可能无数据")
        }
        try {
            //入境团队数
            that.entryNumber()
        } catch (err) {
            console.log("可能无数据")
        }

    },
    entryNumber1: function () {
        var myChart = echarts.init(document.getElementById('entryNumber1'));
        option = {
            title: {
                subtext: '单位：万人',
                x: 10,
                y: -10,
                subtextStyle: {
                    color: '#000'
                }
            },
            grid: {
                top: '8%',
                left: '1%',
                // right: '1%',
                bottom: '18%',
                containLabel: true,
            },
            // grid: { // 控制图的大小，调整下面这些值就可以，
            //     x: 40,
            //     x2: 100,
            //     y2: 240,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
            // },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: { //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: 'gray'
                    },
                },
                axisLabel: { //坐标轴刻度标签的相关设置
                    interval: 0,
                    // rotate: 0,倾斜角度
                    textStyle: {
                        color: '#6a9cd5',
                        margin: 0,
                    },
                },
                axisTick: {
                    show: false,
                },
                data: flowDate1,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                max: 5,
                splitNumber: 7,
                splitLine: {
                    show: true,
                    // lineStyle: {
                    //     color: '#233e64'
                    // }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        color: '#6a9cd5',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                name: '',
                type: 'line',
                smooth: false, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#6c9bfe" // 线条颜色
                    }
                },
                areaStyle: { //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#8daafc'
                        },
                            {
                                offset: 0.7,
                                color: '#cfdcfd'
                            }
                        ], false),

                    }
                },
                data: flowValue1
            }]
        };
        myChart.setOption(option);
    },
    teamCustomer: function () {
        var myChart = echarts.init(document.getElementById('teamCustomer'));
        var datas = teamSourceValues.reverse();
        var max = Math.max.apply(null, datas) / 0.8;
        var myColor = ['#0ecdf8', '#0ecdf8', '#128aff', '#06fba9', '#ffc316'];
        var maxList = []
        var indexList = []
        datas.forEach((item, index) => {
            maxList.push(max)
            indexList.push(index + 1)
        })
        option = {
            grid: {
                left: '-10%',
                right: '5%',
                bottom: '10%',
                top: '3%',
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
                    data: teamSourceNames.reverse(),
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
                        padding: [0, 0, 7, 0],
                        fontWeight: 'bolder',
                        color: '#252830',
                        fontSize: '12'
                    }

                },
                {
                    type: 'category',
                    position: 'left',
                    nameLocation: 'end',
                    offset: 15,
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
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a2: {
                                backgroundColor: {
                                    image: '../image/navIndex/02.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a3: {
                                backgroundColor: {
                                    image: '../image/navIndex/03.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a4: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a5: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a6: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a7: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a8: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a9: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a10: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
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
                    barWidth: 10,
                    z: 30,
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            offset: [320, -10],
                            fontWeight: 'bolder',
                            color: '#252830',
                            fontSize: '12',
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
                    data: maxList,
                    barWidth: 10,
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false,
                            offset: [100, -15],
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
    //年龄断分析
    ageAnalysis: function () {
        var myChart = echarts.init(document.getElementById('ageAnalysis'));
        var datas = ageValue;
        var dataList = []
        var sum = 0
        ageValue.forEach(item => {
            sum += (item / 10000)
        })
        ageValue.forEach(item => {
            dataList.push((item / 100) / sum)
        })
        var myColor = ['#0ecdf8', '#0ecdf8', '#128aff', '#06fba9', '#ffc316'];
        var max = Math.max.apply(null, dataList) / 0.85;
        var maxList = []
        ageValue.forEach(res => {
            maxList.push(max)
        });
        option = {
            grid: {
                left: '13%',
                right: '1%',
                bottom: '3%',
                top: '6%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisTick: {show: true},
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '000',
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'none',
                    }
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: [
                {
                    type: 'category',
                    data: ['0-18岁', '19-30岁', '31-40岁', '41-60岁', '60岁以上'],
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
                        padding: [0, 0, -6, -60],
                        fontWeight: 'bolder',
                        color: '#252830',
                        fontSize: '12'
                    }

                },

            ],

            series: [
                {
                    type: 'bar',
                    data: dataList,
                    barWidth: 10,
                    z: 30,
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            offset: [300, -10],
                            fontWeight: 'bolder',
                            color: '#252830',
                            fontSize: '12',
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
                    data: maxList,
                    barWidth: 10,
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false,
                            offset: [100, -15],
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
    //性别
    secenyAnalysis: function () {
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
                    x: 145,
                    // y: 180,
                    textAlign: 'center',
                    width: 50,
                    height: 50,
                    fontSize: 16,
                    fill: '#057bff'
                },
            },
            legend: {
                orient: 'vertical',
                itemGap: 6,
                itemHeight: 8,
                itemWidth: 18,
                x: '70%',
                y: '40%',
                data: sexNames
            },
            series: [{
                name: '',
                type: 'pie',
                radius: ['60%', '70%'],
                center: ['38%', '52%'],
                label: {
                    normal: {
                        show: true,
                        // color: '#000',
                        formatter: '{b}\n{d}%'
                    }
                },
                labelLine: {
                    normal: {
                        length: 10 //指示线长度
                    }
                },
                data: sexValues
            }]
        };
        myChart.setOption(option);
    },
    //消费分析
    consumption: function () {
        var myChart = echarts.init(document.getElementById('consumption'))
        option = {
            title: {
                text: '',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#057bff',
                    x: 50,
                    y: 10
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: []
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
                        // color: '#000',
                        formatter: '{b}\n{d}%'
                    }
                },
                labelLine: {
                    normal: {
                        length: 5
                    }
                },
                data: moneyValue
            }]
        };
        myChart.setOption(option);
    },
    //行程时长分析
    travelTime: function () {
        var myChart = echarts.init(document.getElementById('travelTime'))
        option = {
            title: {
                text: '',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#057bff',
                    x: 50,
                    y: 10
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 10,
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
                name: '行程时长',
                type: 'pie',
                radius: [30, 70],
                center: ['50%', '50%'],
                roseType: 'area',
                labelLine: {
                    normal: {
                        length: 5
                    }
                },
                data: travelTime
            }]
        };
        myChart.setOption(option);
    },
    // 团队排名
    teamRanking: function () {
        var myChart = echarts.init(document.getElementById('teamRanking'));
        var datas = teamRankValue.reverse();
        var max = Math.max.apply(null, datas) / 0.8;
        var myColor = ['#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#0ecdf8', '#128aff', '#06fba9', '#ffc316'];
        var maxList = []
        var indexList = []
        datas.forEach((item, index) => {
            maxList.push(max)
            indexList.push(index + 1)
        })
        option = {
            grid: {
                left: '-70%',
                right: '5%',
                bottom: '-1%',
                top: '3%',
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
                    data: teamRankName.reverse(),
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
                        padding: [0, 0, 8, 0],
                        fontWeight: 'bolder',
                        color: '#252830',
                        fontSize: '12'
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
                                    image: '../image/navIndex/01.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a2: {
                                backgroundColor: {
                                    image: '../image/navIndex/02.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a3: {
                                backgroundColor: {
                                    image: '../image/navIndex/03.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a4: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a5: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a6: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a7: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a8: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a9: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a10: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
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
                    barWidth: 10,
                    z: 30,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}/万人',
                            fontWeight: 'bolder',
                            color: '#252830',
                            fontSize: '12',
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
                    data: maxList,
                    barWidth: 10,
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false,
                            offset: [100, -15],
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
    //交通
    visiteAnalysis: function () {
        var myChart = echarts.init(document.getElementById('visiteAnalysis'));
        option = {
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
                radius: '60%',
                center: ['50%', '50%'],
                data: wayTypeValue,
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
    //团队类型
    teamtype: function () {
        var myChart = echarts.init(document.getElementById('teamtype'));

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
                data: inOut,
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
    entryNumber: function () {
        var myChart = echarts.init(document.getElementById('entryNumber'));
        option = {
            title: {
                subtext: '单位：万人',
                x: 10,
                y: -10,
                subtextStyle: {
                    color: '#000'
                }
            },
            grid: {
                top: '8%',
                left: '1%',
                bottom: '8%',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: { //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: '#233e64'
                    },
                },
                axisLabel: { //坐标轴刻度标签的相关设置
                    interval: 0,
                    // rotate: 0,倾斜角度
                    textStyle: {
                        color: '#6a9cd5',
                        margin: 0,
                    },
                },
                axisTick: {
                    show: false,
                },
                data: flowDate,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                max: 5,
                splitNumber: 7,
                splitLine: {
                    show: true,
                    // lineStyle: {
                    //     color: '#233e64'
                    // }
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        color: '#6a9cd5',

                    },
                },
                axisTick: {
                    show: false,
                },
            }],
            series: [{
                name: '',
                type: 'line',
                smooth: false, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#6c9bfe" // 线条颜色
                    }
                },
                areaStyle: { //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#8daafc'
                        },
                            {
                                offset: 0.7,
                                color: '#cfdcfd'
                            }
                        ], false),

                        // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                        // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    }
                },
                data: flowValue
            }]
        };
        myChart.setOption(option);
    },
    //入境游客来源地TOP5
    teamEntrytourist: function () {
        var myChart = echarts.init(document.getElementById('teamEntrytourist'));
        //var datas = topFivValue;
        var datas = topFivValue.reverse();
        var max = Math.max.apply(null, datas) / 0.85;
        var myColor = ['#0ecdf8', '#0ecdf8', '#128aff', '#06fba9', '#ffc316'];
        var maxList = []
        var indexList = []
        datas.forEach((item, index) => {
            maxList.push(max)
            indexList.push(index + 1)
        })
        console.log(indexList);
        option = {
            grid: {
                left: '-2.5%',
                right: '5%',
                bottom: '2%',
                top: '3%',
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
                    data: topFivDate,
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
                        padding: [0, 0, 7, 0],
                        fontWeight: 'bolder',
                        color: '#252830',
                        fontSize: '12'
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
                                    image: '../image/navIndex/01.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a2: {
                                backgroundColor: {
                                    image: '../image/navIndex/02.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a3: {
                                backgroundColor: {
                                    image: '../image/navIndex/03.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a4: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a5: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a6: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a7: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a8: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a9: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
                                fontSize: 16
                            },
                            a10: {
                                backgroundColor: {
                                    image: '../image/navIndex/04.png'
                                },
                                height: 25,
                                width: 25,
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
                    barWidth: 10,
                    z: 30,
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            offset: [320, -10],
                            fontWeight: 'bolder',
                            color: '#252830',
                            fontSize: '12',
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
                    data: maxList,
                    barWidth: 10,
                    barGap: '-100%',
                    label: {
                        normal: {
                            show: false,
                            offset: [100, -15],
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
        // option = {
        //     title: {
        //         text: ''
        //     },
        //     xAxis: {
        //         type: 'value',
        //         max: max,
        //         splitLine: {
        //             show: false
        //         },
        //         axisLabel: {
        //             show: false
        //         },
        //         axisLine: {
        //             show: false
        //         },
        //         axisTick: {
        //             show: false
        //         }
        //     },
        //     yAxis: {
        //         type: 'category',
        //         data: topFivDate.reverse(),
        //         splitLine: {
        //             show: false
        //         },
        //         axisLine: {
        //             show: false
        //         },
        //         axisTick: {
        //             show: false,
        //         },
        //         axisLabel: {
        //             show: true,
        //             margin: -4,
        //             align: 'left',
        //             verticalAlign: 'bottom',
        //             padding: [0, 0, 10, 0]
        //         }
        //
        //     },
        //
        //     series: [{
        //         type: 'bar',
        //         data: datas,
        //         barWidth: 10,
        //         z: 30,
        //         label: {
        //             normal: {
        //                 show: true,
        //                 position: 'left',
        //                 color: '#000',
        //                 //TODO
        //                 offset: [255, -10],
        //                 formatter: '{c}'
        //             }
        //         },
        //         itemStyle: {
        //             normal: {
        //                 color: function (params) {
        //                     var num = myColor.length;
        //                     return myColor[params.dataIndex]
        //                 },
        //                 barBorderRadius: 4,
        //                 // color: '#0ecdf8'
        //             }
        //         }
        //     }, {
        //         type: 'bar',
        //         data: [max, max, max, max, max],
        //         barWidth: 10,
        //         barGap: '-90%',
        //         label: {
        //             normal: {
        //                 show: false
        //             }
        //         },
        //         itemStyle: {
        //             normal: {
        //                 barBorderRadius: 20,
        //                 color: '#def1ff'
        //             }
        //         }
        //     }]
        // };
        myChart.setOption(option);
    }
}
entry.init();
