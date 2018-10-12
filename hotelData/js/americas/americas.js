var americas = {
    init: function () {
        var that = this
        that.AmericasTourists()
    },
    AmericasTourists: function () {
        var myChart = echarts.init(document.getElementById('AmericasTourists'));
        myChart.clear()
        var datas = [];
        var header = [];

        var firstDay;
        var lastDay;
        if(linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当月第一天
            // lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1); //当月最后一天
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
            async: false,
            url: zhushu_url + "livingStatistics/findByAreaAndTimeAndContinent",
            data: {startTime: firstDay.getTime(), endTime: lastDay.getTime(), addressCode: defaultAddressCode, continentId: 6},
            dataType: "json",
            success: function (data) {
                if (data.code == "OK") {
                    if(datas.length != 0){
                        datas = [];
                    }
                    if(header.length != 0){
                        header = [];
                    }
                    $.each(data.data, function (index, item) {
                        datas.push({
                            value: item.num,
                            name: item.cname,
                            itemStyle: {color: pillarColor[index]}
                        });
                        header.push(
                            item.cname
                        );
                    });

                }
            }
        });
        option = {
            tooltip: {
                show: false,
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
                bottom: "3%",
                x: "center",
                itemWidth:18,
                itemHeight:10,
                itemGap:5,
                data: header,
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: ['50%', '33.9%'],
                    avoidLabelOverlap: false,
                    hoverAnimation: false,//是否开启hover在扇形区域上放大动画效果
                    slient: true,//图形是否不响应和触发鼠标事件，默认为false，即响应和触发鼠标事件
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            fontSize: '12',
                            formatter: "{a}\n{b}\n {c}人 \n{d}%"
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                color: '#252830',
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: datas
                }
            ]
        };
        myChart.setOption(option);
        //翁剑军 2018.9.29上午 添加饼状图中间默认显示
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
    }
}
americas.init();

