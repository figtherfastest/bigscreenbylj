var roomdays = {
    init: function () {
        var that = this
        that.roomday()
    },
    roomday: function () {
        var myChart = echarts.init(document.getElementById('roomday'));
        var dataMeet =[];
        var dataHotel =[];
        var header =[];
        var linkYear;
        if(linkTime == null) {
            var date = new Date();
            linkYear = date.getFullYear();
            /*firstDay = new Date(date.getFullYear(), 0, 1); //当月第一天
            lastDay = new Date(date.getFullYear()+1, 0, 1); //当月最后一天*/
        } else {
            linkYear = linkTime.getFullYear();
            /*firstDay = new Date(linkTime.getFullYear(), 0, 1); //当月第一天
            lastDay = new Date(linkTime.getFullYear()+1, 0, 1); //当月最后一天*/
        }
        // var defaultAddressCode = 53470;
        if(linkAddressCode != null) {
            defaultAddressCode = linkAddressCode;
        }
        $.ajax({
            type: "GET",
            async:false,
            url: zhushu_url+"livingStatistics/findMeetAndHotel",
            dataType: "json",
            data: {year: linkYear,addressCode:defaultAddressCode},
            success: function (data) {
                if (data.code == "OK") {
                    $.each(data.data.meets, function (index, item) {
                        dataMeet.push({
                            value: (item.meetCount/10000).toFixed(2)
                        });
                        header.push({
                            value: item.type
                        });
                    });
                    $.each(data.data.hotels, function (index, item) {
                        dataHotel.push({
                            value: (item.hotelCount/10000).toFixed(2)
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
                x:140,
                y:10,
                itemHeight:10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: [0, 0.01],
                data: header,
                axisTick:{       //x轴刻度线
                    "show":false
                },
            },
            yAxis: {
                type: 'value',
                axisTick:{       //Y轴刻度线
                    "show":false
                },
            },
            series: [
                {
                    name: '接待人数',
                    type: 'bar',
                    barWidth: 10,
                    itemStyle:{
                        normal: {
                            color:'#fc7600',
                            //柱形图圆角，初始化效果
                            barBorderRadius:[6, 0, 0, 0],
                        }
                    },
                    data: dataMeet
                },
                {
                    name: '住宿量',
                    barWidth: 10,
                    type: 'bar',
                    itemStyle:{
                        normal: {
                        color:'#487efe',
                            //柱形图圆角，初始化效果
                            barBorderRadius:[6, 0, 0, 0],
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
