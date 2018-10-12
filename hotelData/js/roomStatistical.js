levels = [];
var rooms = {
    init: function () {
        var that = this
        that.roomStatistical()
    },
    roomStatistical: function () {
        var myChart = echarts.init(document.getElementById('roomStatistical'));
        var firstDay;
        var lastDay;
        if (linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当年第一天
            lastDay = getLastDay(date.getFullYear(), date.getMonth() + 1);
        } else {
            firstDay = new Date(linkTime.getFullYear(), linkTime.getMonth(), 1); //当年第一天
            // lastDay = new Date(linkTime.getFullYear()+1, 0, 1); //当年最后一天
            lastDay = getLastDay(linkTime.getFullYear(), linkTime.getMonth() + 1);
        }
        // var defaultAddressCode = 53470;
        if (linkAddressCode != null) {
            defaultAddressCode = linkAddressCode;
        } else {
            defaultAddressCode = "";
        }
        console.log(defaultAddressCode)
        $.ajax({
            type: "GET",
            async: false,
            url: zhushu_url + "livingStatistics/findSexByAreaAndTime",
            data: {startTime: firstDay.getTime(), endTime: lastDay.getTime(), addressCode: defaultAddressCode},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    if (levels.length != 0) {
                        levels = [];
                    }
                    $.each(data.data, function (index, item) {
                        levels.push({
                            name: item.level,
                            value: item.num,
                            itemStyle: {color: pillarColor[index]}
                        });
                    });

                }
            }
        });
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
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '52%'],
                    data: levels,
                    label: {
                        normal: {
                            position: 'outside',
                            formatter: "{b}\n{d}%"
                        }
                    },
                    labelLine:{
                        normal:{
                            length:3,

                        },
                        lineStyle:{
                            smooth:0.9
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
}
rooms.init();
