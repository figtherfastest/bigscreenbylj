var baseData;
var industryData;
var addresscode = "530700";
var scenicArray = new Array;
var hotelArray = new Array;
var baseDataAnalysis = {
    init: function () {
        var that = this
        baseData = that.getData().data
        industryData = that.getIndustryData().data
        that.secenyAnalysis()
        that.hotelOperate()
        that.industryInfo()
        that.anyIndustryAnalysis()
        that.anyRegionAnalysis()
        that.tirvalAgencyAnalysis()
        that.tirvalWcAnalysis()
        that.tourGuideAnalysis()
        that.foodPlaceAnalysis()
        that.shopPlaceAnalysis()
        that.entertainmentPalaceAnalysis()
        that.newBusinessAnalysis()
        that.countryTirvalAnalysis()
        that.secentCategory()
        that.hotelOperateBar()
        that.tirvalAgencyAnalysisBar()
        that.tirvalWcAnalysisBar()
        that.tourGuideAnalysisBar()
        that.lijiangmap()
    },

    lijiangmap:function() {
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
                addresscode = region
                baseDataAnalysis.init()
                that.setOption(myChart, 'yulong')
            } else if (res.name === "古城") {
                region = 530702
                addresscode = region
                baseDataAnalysis.init()
                that.setOption(myChart, 'gucheng')
            } else if (res.name === "永胜") {
                region = 530722
                addresscode = region
                baseDataAnalysis.init()
                that.setOption(myChart, 'yongsheng')
            } else if (res.name === "华坪") {
                region = 530723
                addresscode = region
                baseDataAnalysis.init()
                that.setOption(myChart, 'huaping')
            } else if (res.name === "宁蒗") {
                region = 530724
                addresscode = region
                baseDataAnalysis.init()
                that.setOption(myChart, 'ninglang')
            }
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
            aspectScale: 1.8,
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
                shadowStyle: {              // 阴影指示器样式设置
                    width: 50,         // 阴影大小
                    shadowColor: 'red', // 阴影颜色
                    shadowBlur: 50
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
    getData: function () {
        $.ajax({
            url: getBaseDataList,
            contentType: "application/json",
            data: {
                "regionCode": addresscode
            },
            type: "GET",
            async: false,
            success: function (result) {
                resultData = result
            }
        });
        return resultData
    },
    getIndustryData: function () {
        $.ajax({
            url: getIndustryDataList,
            contentType: "application/json",
            data: {
                "regionCode": addresscode
            },
            type: "GET",
            async: false,
            success: function (result) {
                industryData = result
            }
        });
        return industryData
    },
    //arg1：节点    参数2：leng   arg3：数据  arg4:leng样式 arg5:槟的粗细 arg6:srzeCenter
    loadChartsPie: function (doms, lengData, data, lengFormat, radius, srzeCenter) {
        var myChart = doms;
        myChart.clear()
        option = {
            tooltip: {
                confine: true,
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            legend: lengFormat,
            series: [
                {
                    name: name,
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
    horizonBar(dom, dataKey, dataValue, dataMax, grid) {
        var myChart = dom;
        var datas = dataValue;
        option = {
            grid: grid,
            xAxis: {
                type: 'value',
                max: dataMax,
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
                    data: dataKey,
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
                        verticalAlign: 'bottom',
                        padding: [0, 0, 10, 0]
                    },
                    yAxisIndex: 1,
                },
                {
                    type: 'category',
                    data: dataValue,
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
                        verticalAlign: 'bottom',
                        padding: [0, 0, 10, -12]
                    },
                    yAxisIndex: 1,
                }
            ],

            series: [{
                type: 'bar',
                data: datas, //名称所对应的值
                barWidth: 10,
                z: 30,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        offset: [500, 30],
                        formatter: '{c}'
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
                    data: dataMax,//最大值所对应的max
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
        myChart.setOption(option);

    },
    //1*1
    secenyAnalysis() {
        var that = this;
        scenicArray = baseData.scenic;
        var data = [];
        var lengData = [];
        var dom = echarts.init(document.getElementById('secenyAnalysis'));
        $.each(scenicArray, function (i, n) {
            data.push({value: n.scenicTotal, name: n.scenicStar, itemStyle: {color: pillarColor[i]}})
            lengData.push(n.scenicStar);
        });
        var lengFormat = {
            orient: 'horizontal',
            bottom: "6%",
            x: "center",
            data: lengData,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['center', '38%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '30%',
                    style: {
                        text: "5A景区\n共有12个\n占比6%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },
    secentCategory() {
        var that = this
        scenicArray = baseData.scenic;
        var dom = echarts.init(document.getElementById('secentCategory'))
        var dataKey = []
        var dataValue = []
        var total = 0;
        for (i = scenicArray.length - 1; i >= 0; i--) {
            dataKey.push(scenicArray[i].scenicStar)
            dataValue.push(scenicArray[i].scenicTotal)
            total = scenicArray[i].total
        }
        var max = Math.max.apply(null, dataValue) / 0.55;
        var dataMax = []
        dataValue.forEach(item=>{
            dataMax.push(max)
        })
        $('.secentCategory span').html(total).css({
            'color': 'RGBA(252, 118, 0, 1)'
        })
        var grid = {
            left: '-10%',
            right: '2%',
            bottom: '1%',
            top: '5%',
            containLabel: true
        }
        that.horizonBar(dom, dataKey, dataValue, dataMax, grid)
    },
//    2*1
    hotelOperate() {
        var that = this
        var dom = echarts.init(document.getElementById('hotelOperate'))
        hotelArray = baseData.hotel;
        var data = [];
        var lengData = [];

        $.each(hotelArray, function (i, n) {
            data.push({value: n.hotelTotal, name: n.hotelStar, itemStyle: {color: pillarColor[i]}})
            lengData.push(n.hotelStar);
        });

        var lengFormat = {
            orient: 'horizontal',
            bottom: "6%",
            x: "center",
            data: lengData,
            itemWidth: 15,
            itemHeight: 13
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['center', '38%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '30%',
                    style: {
                        text: "5A景区\n共有12个\n占比6%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },
    hotelOperateBar() {
        var that = this
        var dom = echarts.init(document.getElementById('hotelOperateBar'))
        hotelArray = baseData.hotel;
        var dataKey = []
        var dataValue = []
        var total = 0;
        for (i = hotelArray.length - 1; i >= 0; i--) {
            dataKey.push(hotelArray[i].hotelStar)
            dataValue.push(hotelArray[i].hotelTotal)
            total = hotelArray[0].total
        }
        var max = Math.max.apply(null, dataValue) / 0.85;
        var dataMax = []
        dataValue.forEach(item=>{
            dataMax.push(max)
        })
        $('.hotelOperateBar span').html(total).css({
            'color': 'RGBA(252, 118, 0, 1)'
        })
        var grid = {
            left: '-10%',
            right: '2%',
            bottom: '1%',
            top: '5%',
            containLabel: true
        }
        that.horizonBar(dom, dataKey, dataValue, dataMax, grid)
    },
    /**
     * 基础数据---行业计数
     */
    industryInfo() {
        var that = this
        var item = $('#industryInfo').html()
        var company = industryData.Company
        var shop = industryData.Shop
        var guide = industryData.Guide
        var village = industryData.Village
        var recreation = industryData.Recreation
        var scenic = industryData.Scenic
        var toilet = industryData.Toilet
        var hotel = industryData.Hotel
        var food = industryData.Food
        var entrepot = industryData.Entrepot
        var busStation = industryData.BusStation
        var tsmEmergingIndustry = industryData.tsmEmergingIndustry
        $("#t1").text(scenic.name)
        $("#to1").html(scenic.BaseScenicTotal + '<span style="font-size: 18px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t2").text(company.name)
        $("#to2").html(company.BaseCompanyTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t3").text(hotel.name)
        $("#to3").html(hotel.BaseHotelTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t4").text(toilet.name)
        $("#to4").html(toilet.ToiletTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t5").text(guide.name)
        $("#to5").html(guide.BaseGuideTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t6").text(food.name)
        $("#to6").html(food.FoodFookTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t7").text(shop.name)
        $("#to7").html(shop.BaseShopTypeTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t8").text(recreation.name)
        $("#to8").html(recreation.BaseRecreationTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t9").text(village.name)
        $("#to9").html(village.BaseVillageTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t10").text(entrepot.name)
        $("#to10").html(entrepot.BaseEntrepotTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t11").text(busStation.name)
        $("#to11").html(busStation.busStationTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
        $("#t12").text(tsmEmergingIndustry.name)
        $("#to12").html(tsmEmergingIndustry.tsmEmergingIndustryTotal + '<span style="font-size: 20px;margin-top:10px;padding-left: 5px;">' + '个' + '</span>')
    },
//    1*5
    anyIndustryAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('anyIndustryAnalysis'))

        var company = industryData.Company
        var shop = industryData.Shop
        var guide = industryData.Guide
        var village = industryData.Village
        var recreation = industryData.Recreation
        var scenic = industryData.Scenic
        var toilet = industryData.Toilet
        var hotel = industryData.Hotel
        var food = industryData.Food

        var lengData = [company.name, shop.name, guide.name, village.name, recreation.name, scenic.name, toilet.name, hotel.name, food.name]
        var data = [
            {value: company.BaseCompanyTotal, name: company.name, itemStyle: {color: '#ff473e'}},
            {value: shop.BaseShopTypeTotal, name: shop.name, itemStyle: {color: '#fc7600'}},
            {value: guide.BaseGuideTotal, name: guide.name, itemStyle: {color: '#fec400'}},
            {value: village.BaseVillageTotal, name: village.name, itemStyle: {color: '#fce300'}},
            {value: recreation.BaseRecreationTotal, name: recreation.name, itemStyle: {color: '#a05dfd'}},
            {value: scenic.BaseScenicTotal, name: scenic.name, itemStyle: {color: '#785dfc'}},
            {value: toilet.ToiletTotal, name: toilet.name, itemStyle: {color: '#4b7efe'}},
            {value: hotel.BaseHotelTotal, name: hotel.name, itemStyle: {color: '#4698f0'}},
            {value: food.FoodFookTotal, name: food.name, itemStyle: {color: '#4ad970'}}
        ]
        var lengFormat = {
            orient: 'vertical',
            y: "center",
            right: '15%',
            data: lengData,
            itemGap: 6,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['52%', '72%']
        var srzeCenter = ['30%', '55%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: '22%',
                    top: '39%',
                    style: {
                        text: "餐饮行业\n\n共有18888个\n\n占比36%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },
    //2*5
    anyRegionAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('anyRegionAnalysis'))
        businessArray = baseData.businessTotal;
        var data = [];
        var lengData = [];

        $.each(businessArray, function (i, n) {
            lengData.push(n.county);
            data.push({value: n.areaTotal, name: n.county, itemStyle: {color: pillarColor[i]}})
        });
        var lengFormat = {
            orient: 'vertical',
            y: "center",
            right: '2.5%',
            data: lengData,
            itemGap: 18,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['52%', '72%']
        var srzeCenter = ['30%', '55%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: '25%',
                    top: '43%',
                    style: {
                        text: "永胜限\n\n\n占比 38%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },
//    1*6
    tirvalAgencyAnalysis() {
        var that = this;
        var dom = echarts.init(document.getElementById('tirvalAgencyAnalysis'));
        companyArray = baseData.company;
        var data = [];
        var lengData = [];

        $.each(companyArray, function (i, n) {
            lengData.push(n.companyType);
            data.push({value: n.companyTotal, name: n.companyType, itemStyle: {color: pillarColor[i]}})
        });
        var lengFormat = {
            orient: 'horizontal',
            bottom: "5%",
            x: "center",
            data: lengData,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['center', '38%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '28%',
                    style: {
                        text: "出境旅行社\n 共76个\n 占比30%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },
    tirvalAgencyAnalysisBar() {
        var that = this
        var dom = echarts.init(document.getElementById('tirvalAgencyAnalysisBar'))
        companyArray = baseData.company;
        var dataKey = []
        var dataValue = []
        var total = 0;
        for (i = companyArray.length - 1; i >= 0; i--) {
            dataKey.push(companyArray[i].companyType)
            dataValue.push(companyArray[i].companyTotal)
            total = companyArray[i].total
        }
        var max = Math.max.apply(null, dataValue) / 0.6;
        var dataMax = []
        dataValue.forEach(item=>{
            dataMax.push(max)
        })
        $('.tirvalAgencyAnalysisBar span').html(total).css({
            'color': 'RGBA(252, 118, 0, 1)'
        })
        var grid = {
            left: '-5%',
            right: '2%',
            bottom: '1%',
            top: '5%',
            containLabel: true
        }
        that.horizonBar(dom, dataKey, dataValue, dataMax, grid)
    },
    //2*6
    tirvalWcAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('tirvalWcAnalysis'))
        toiletArray = baseData.toilet;
        var data = [];
        var lengData = [];

        $.each(toiletArray, function (i, n) {
            lengData.push(n.type);
            data.push({value: n.typeTotal, name: n.type, itemStyle: {color: pillarColor[i]}})
        });
        var lengFormat = {
            orient: 'horizontal',
            bottom: "5%",
            x: "center",
            data: lengData,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['center', '38%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: '38%',
                    top: '26%',
                    style: {
                        text: "AAA\n共76个\n占比30%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },
    tirvalWcAnalysisBar() {
        var that = this
        var dom = echarts.init(document.getElementById('tirvalWcAnalysisBar'))
        toiletArray = baseData.toilet;
        var dataKey = []
        var dataValue = []
        var total = 0;
        for (i = toiletArray.length - 1; i >= 0; i--) {
            dataKey.push(toiletArray[i].type)
            dataValue.push(toiletArray[i].typeTotal)
            total = toiletArray[0].total
        }
        var max = Math.max.apply(null, dataValue) / 0.85;
        var dataMax = [max]
        $('.tirvalWcAnalysisBar span').html(total).css({
            'color': 'RGBA(252, 118, 0, 1)'
        })
        var grid = {
            left: '-5%',
            right: '2%',
            bottom: '1%',
            top: '5%',
            containLabel: true
        }
        that.horizonBar(dom, dataKey, dataValue, dataMax, grid)
    },
//    footer 1
    tourGuideAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('tourGuideAnalysis'))
        guideArray = baseData.guide;
        var data = [];
        var lengData = [];

        $.each(guideArray, function (i, n) {
            lengData.push(n.grade);
            data.push({value: n.guideTotal, name: n.grade, itemStyle: {color: pillarColor[i]}})
        });
        var lengFormat = {
            orient: 'horizontal',
            bottom: "0",
            x: "center",
            data: lengData,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['center', '38%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: 'center',
                    top: '28%',
                    style: {
                        text: " 特级\n共76个\n占比30%",
                        fill: '#4b7efe',
                    }
                }
            ]

        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)

    },
    tourGuideAnalysisBar() {
        var that = this
        var dom = echarts.init(document.getElementById('tourGuideAnalysisBar'))
        guideArray = baseData.guide;
        var dataKey = []
        var dataValue = []
        var total = 0;
        for (i = guideArray.length - 1; i >= 0; i--) {
            dataKey.push(guideArray[i].grade)
            dataValue.push(guideArray[i].guideTotal)
            total = guideArray[0].total
        }
        var max = Math.max.apply(null, dataValue) / 0.85;
        var dataMax = []
        dataValue.forEach(item=>{
            dataMax.push(max)
        })
        $('.tourGuideAnalysisBar span').html(total).css({
            'color': 'RGBA(252, 118, 0, 1)'
        })
        var grid = {
            left: '-1%',
            right: '2%',
            bottom: '1%',
            top: '5%',
            containLabel: true
        }
        that.horizonBar(dom, dataKey, dataValue, dataMax, grid)
    },
//    footer 2
    foodPlaceAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('foodPlaceAnalysis'))
        restaurantArray = baseData.restaurant;
        var data = [];
        var lengData = [];

        $.each(restaurantArray, function (i, n) {
            lengData.push(n.type);
            data.push({value: n.typeTotal, name: n.type, itemStyle: {color: ringColor[i]}})
        });
        var lengFormat = {
            orient: 'vertical',
            y: "center",
            right: '15%',
            data: lengData,
            itemGap: 6,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['30%', '50%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: '23%',
                    top: '38%',
                    style: {
                        text: "清真菜馆\n\n共76个\n\n占比30%",
                        fill: '#4b7efe',
                    }
                }
            ]
        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)

    },
//    footer 3
    shopPlaceAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('shopPlaceAnalysis'))
        shoppingArray = baseData.shopping;
        var data = [];
        var lengData = [];

        $.each(shoppingArray, function (i, n) {
            lengData.push(n.type);
            data.push({value: n.typeTotal, name: n.type, itemStyle: {color: ringColor[i]}})
        });
        var lengFormat = {
            orient: 'vertical',
            y: "center",
            right: '18%',
            data: lengData,
            itemWidth: 18,
            itemHeight: 10
        };

        var radius = ['55%', '75%']
        var srzeCenter = ['30%', '50%']
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter)
    },
    //footer 4
    entertainmentPalaceAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('entertainmentPalaceAnalysis'))
        entertainmentArray = baseData.entertainment;
        var data = [];
        var lengData = [];

        $.each(entertainmentArray, function (i, n) {
            lengData.push(n.type);
            data.push({value: n.typeTotal, name: n.type, itemStyle: {color: ringColor[i]}})
        });
        var lengFormat = {
            orient: 'vertical',
            y: "center",
            right: '12%',
            data: lengData,
            itemGap: 6,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['30%', '50%']

        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter)
    },
    //footer 5
    newBusinessAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('newBusinessAnalysis'))
        newIndustryArray = baseData.newIndustry;
        var data = [];
        var lengData = [];

        $.each(newIndustryArray, function (i, n) {
            lengData.push(n.type);
            data.push({value: n.total, name: n.type, itemStyle: {color: pillarColor[i]}})
        });
        var lengFormat = {
            orient: 'vertical',
            y: "center",
            right: "20%",
            data: lengData,
            itemGap: 18,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['30%', '50%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: '25%',
                    top: '38%',
                    style: {
                        text: "吃\n\n\n占比30%",
                        fill: '#4b7efe',
                    }
                }
            ]
        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },
//    footer 6
    countryTirvalAnalysis() {
        var that = this
        var dom = echarts.init(document.getElementById('countryTirvalAnalysis'))
        villageArray = baseData.village;
        var data = [];
        var lengData = [];

        $.each(villageArray, function (i, n) {
            lengData.push(n.type);
            data.push({value: n.typeTotal, name: n.type, itemStyle: {color: pillarColor[i]}})
        });
        var lengFormat = {
            orient: 'vertical',
            y: "center",
            right: '10%',
            data: lengData,
            itemGap: 18,
            itemWidth: 18,
            itemHeight: 10
        };
        var radius = ['55%', '75%']
        var srzeCenter = ['30%', '50%']
        var graphic = {
            elements: [
                {
                    type: 'text',
                    left: '25%',
                    top: '38%',
                    style: {
                        text: "农场\n\n\n占比30%",
                        fill: '#4b7efe',
                    }
                }
            ]
        }
        that.loadChartsPie(dom, lengData, data, lengFormat, radius, srzeCenter, graphic)
    },

}
// baseDataAnalysis.lijiangmap()
baseDataAnalysis.init()
