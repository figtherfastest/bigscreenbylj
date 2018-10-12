var roomdays = {
    init: function () {
        var that = this
        that.roomday()
    },
    roomday: function () {
        var myChart = echarts.init(document.getElementById('roomday'));
        var dataMeet = [];
        var dataHotel = [];
        var header = [];
        var linkYear;
        if (linkTime == null) {
            var date = new Date();
            linkYear = date.getFullYear();
        } else {
            linkYear = linkTime.getFullYear();
        }
        if (linkAddressCode != null) {
            defaultAddressCode = linkAddressCode;
        }
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "livingStatistics/findMeetAndHotel",
            dataType: "json",
            data: {year: linkYear, addressCode: defaultAddressCode},
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data.meets, function (index, item) {
                        dataMeet.push({
                            value: (item.meetCount / 10000).toFixed(2)
                        });
                        header.push({
                            value: item.type
                        });
                    });
                    $.each(data.data.hotels, function (index, item) {
                        dataHotel.push({
                            value: (item.hotelCount / 10000).toFixed(2)
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
                data: ['接待人数', '住宿量'],
                x: 100,
                y: 10,
                itemHeight: 10
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
                    name: '接待人数',
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            color: '#fc7600',
                            //柱形图圆角，初始化效果
                            barBorderRadius: [6, 6, 0, 0],
                        }
                    },
                    data: dataMeet
                },
                {
                    name: '住宿量',
                    barWidth: 10,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#487efe',
                            //柱形图圆角，初始化效果
                            barBorderRadius: [6, 6, 0, 0],
                        }
                    },
                    data: dataHotel
                }
            ]
        };
        myChart.setOption(option);
    }
}
roomdays.init();
