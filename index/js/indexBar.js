var bars = {
    init: function () {
        var that = this
        that.indexBar()
    },
    indexBar: function () {
        var values = [];
        var keys = [];
        var firstDay;
        var lastDay;
        if(linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当月第一天
            // lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //当月最后一天
            lastDay= getLastDay(date.getFullYear(),date.getMonth()+1);
        } else{
            firstDay = new Date(linkTime.getFullYear(), linkTime.getMonth(), 1); //当月第一天
            // lastDay = new Date(linkTime.getFullYear(), linkTime.getMonth() + 1, 1); //当月最后一天
            lastDay= getLastDay(linkTime.getFullYear(),linkTime.getMonth()+1);
        }

        $.ajax({
            url:index_url+"/firstPage/findTopTenByAreaAndTime",
            contentType:"application/json",
            type:"GET",
            async:false,
            data:"startTime="+firstDay.getTime()+"&endTime="+lastDay.getTime(),
            success:function(result){
                var array = result.data;
                array.forEach(function (e) {
                    keys.push(e.provinceName);
                    values.push((Math.floor(e.totalMoney/10000*100))/100);
                })
            },
        })
        console.log(keys)
        var myChart = echarts.init(document.getElementById('indexBar'));
        option = {
            color: ['#3398DB'],
            title: {
                text: '',
                subtext: '单位:万元',
                y: -10,
                subtextStyle: {
                    color: '#000'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '0',
                top: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: keys,
                    axisLabel: {
                        interval: 0,
                        rotate: 40,
                        textStyle: {
                            color:'#252830',
                        }
                    },
                    axisTick: {       //x轴刻度线
                        "show": false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        textStyle: {
                            color:'#252830',
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    show: true,
                    axisTick: {       //y轴刻度线
                        "show": false
                    },
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: '35%',
                    color: '#4b7efe',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 0, 0],

                            label: {
                                normal: {
                                    show: false,
                                }
                            },
                        }
                    },
                    data: values
                }
            ]
        };
        myChart.setOption(option);
    }
}
bars.init();
