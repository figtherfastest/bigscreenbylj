var hotelData = {
    init: function () {
        var that = this
        that.entryPie()
    },
    entryPie: function () {
        var myChart = echarts.init(document.getElementById('entryPie'));
        localAndForeign=[];

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
            url: zhushu_url+"livingStatistics/findLocalAndForeignByAreaAndTime",
            data: {startTime:firstDay.getTime() , endTime: lastDay.getTime(),addressCode:defaultAddressCode},
            dataType: "json",
            success: function (data) {
                if(data.code=="OK"){
                    if(localAndForeign.length != 0){
                        localAndForeign = [];
                    }
                    $.each(data.data.china, function (index, item) {
                        localAndForeign.push({
                            name: item.type,
                            value: item.num,
                            itemStyle:{color: '#4b7efe'}
                        });
                        $("#china").html(item.num);
                    });
                    $.each(data.data.notChina, function (index, item) {
                        localAndForeign.push({
                            name: item.type,
                            value: item.num,
                            itemStyle:{color: '#36d9fc'}
                        });
                        $("#notChina").html(item.num);

                    });
                    // localAndForeign[1].selected='true'
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
                x: 10,
                y: 100,
                data: []
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: '90%',
                    center: ['50%', '50%'],
                    data: localAndForeign,
                    label: {
                        normal: {
                            position: 'outside',
                            formatter: "{b}:{c}\n{d}%"
                        }
                    },
                    labelLine:{
                        normal:{
                            length:3,

                        },
                        lineStyle:{
                            smooth:0.1
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
hotelData.init();
