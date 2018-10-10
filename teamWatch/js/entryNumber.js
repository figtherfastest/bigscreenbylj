/*var entry = {
    init: function () {
        var that = this
        that.entryNumber()
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
                // right: '1%',
                bottom: '8%',
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
                        color: '#233e64'
                    },
                },
                axisLabel: {//坐标轴刻度标签的相关设置
                    interval: 0,
                    // rotate: 0,倾斜角度
                    textStyle: {
                        color: '#6a9cd5',
                        margin: 0,
                    },
                },
                axisTick: {show: false,},
                data: ['第一季度', '第二季度', '第三季度', '第四季度'],
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
                axisLine: {show: false,},
                axisLabel: {
                    margin: 15,
                    textStyle: {
                        color: '#6a9cd5',

                    },
                },
                axisTick: {show: false,},
            }],
            series: [{
                name: '',
                type: 'line',
                smooth: false, //是否平滑曲线显示
// 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#6c9bfe"   // 线条颜色
                    }
                },
                areaStyle: { //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: '#8daafc'},
                            {offset: 0.7, color: '#cfdcfd'}
                        ], false),

                        // shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                        // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    }
                },
                data: [4, 3, 4, 2, 4]
            }]
        };
        myChart.setOption(option);
    }
}
entry.init();

*/