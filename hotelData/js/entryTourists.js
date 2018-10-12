var entrys = {
    init: function () {
        var that = this
        that.entryTourists()
    },
    entryTourists: function () {
        var myChart = echarts.init(document.getElementById('entryTourists'));
        var dataDomestics =[];
        var dataAbroads =[];
        var header =[];

        var linkYear;
        if(linkTime == null) {
            var date = new Date();
            linkYear = date.getFullYear();

        } else {
            linkYear = linkTime.getFullYear();
        }
        // var defaultAddressCode = 53470;
        if(linkAddressCode != null) {
            defaultAddressCode = linkAddressCode;
        }

        $.ajax({
            type: "GET",
            async:false,
            url: zhushu_url+"livingStatistics/findDomesticAndAbroad",
            data: {year: linkYear,addressCode:defaultAddressCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    console.log(data.data)
                    $.each(data.data.domestic, function (index, item) {
                        dataDomestics.push({
                            value: (item.sum/10000).toFixed(2)
                        });
                        header.push({
                            value: item.type
                        });
                    });
                    $.each(data.data.abroad, function (index, item) {
                        dataAbroads.push({
                            value: (item.sum/10000).toFixed(2)
                        });

                    });
                }
            }
        });
        option = {
            title: {
                text: '',
                subtext: '单位：万人',
                subtextStyle: {
                    color: '#000'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['国内', '国外'],
                x:100,
                y:10,
                itemHeight:10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:'20%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: [0, 0.01],
                data: header,
                axisTick: {       //x轴刻度线
                    "show": false
                },
                axisLine:{
                    'show':false
                }
            },
            yAxis: {
                type: 'value',
                axisTick: {       //Y轴刻度线
                    "show": false
                },
                axisLine:{
                    'show':false
                },
                splitLine:{
                    lineStyle:{
                        color:'#efefef'
                    }
                }
            },
            series: [
                {
                    name: '国内',
                    type: 'bar',
                    barWidth: 10,
                    itemStyle:{
                        normal: {
                            color:'#36d9fc',
                            barBorderRadius:[6, 6, 0, 0],
                        }
                    },
                    data: dataDomestics
                },
                {
                    name: '国外',
                    barWidth: 10,
                    type: 'bar',
                    itemStyle:{
                        normal: {
                            color:'#487efe',
                            //柱形图圆角，初始化效果
                            barBorderRadius:[6, 6, 0, 0],
                        }
                    },
                    data: dataAbroads
                }
            ]
        };
        myChart.setOption(option);
    }
}
entrys.init();
