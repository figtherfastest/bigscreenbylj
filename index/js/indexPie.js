var index = {
    init: function () {
        var that = this
        that.indexPie()
    },
    indexPie: function () {
        //产生随机颜色
        function randomHexColor() { //随机生成十六进制颜色
            var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
            while(hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
                hex = '0' + hex;
            }
            return '#' + hex; //返回‘#'开头16进制颜色
        };
        var i = 0;
        var values = [];
        var keys = [];
        var firstDay;
        var lastDay;
        if(linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当月第一天
            lastDay= getLastDay(date.getFullYear(),date.getMonth()+1);
            // lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //当月最后一天
        } else {
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
                    keys.push(e.provinceName.slice(0,3));

                    function color(color) {
                        this.color = color;
                    }

                    function data(value,name,itemStyle) {
                        this.value = value;
                        this.name = name.slice(0,3)
                        this.itemStyle = itemStyle;
                    }
                    values.push(new data(e.totalMoney,e.provinceName,new color(ringColor[i++])))
                });
            }
        })
        console.log(values)
        console.log(keys);
        var myChart = echarts.init(document.getElementById('indexPie'));
        option = {
            tooltip: {
                show: false
            },
            legend: {
                itemGap: 5,
                orient: 'vertical',
                icon: 'roundRect',
                itemWidth:20,
                itemHeight:10,
                bottom: 40,
                x: '2',
                y: '8',
                textStyle: {
                    fontSize: 13,
                    fontWeight:'bold'
                },
                data: keys
            },

            series: [{
                type: 'pie',
                radius: ['20%', '60%'],
                roseType: 'area',
                center: ['63%', '50%'],
                zlevel: 2,
                labelLine: {
                    normal: {
                        length: 10
                    }
                },
                label: {
                    normal: {
                        show: true,
                        color: '#000',
                        fontSize: 13,
                        fontWeight:'bold',
                        formatter: '{b}\n{d}%'
                    }
                },
                data: values
            }]
        };
        myChart.setOption(option);
    }
};

index.init();
