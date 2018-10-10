
var currentTime = new Date();//当前时间

var publicOpinionTime;

var linkTime; //变化时间

//年选择器
/*laydate.render({
    elem: '#yearInput'
    ,type: 'year'
});*/

function  changeTime(yearId,monthId){
    var year =document.getElementById(yearId).value;
    var month=document.getElementById(monthId).value-1;
    var trs=/^\d{4}$/;
    if(!trs.test(year)){
        alert("请选择年份");
        return;
    }
    linkTime = new Date(parseInt(year),month,1);

    customer.init();
    index.init();
    bars.init();
    trafficrank.init();
    totalPeople.init();
}

function changeDay(year,month,day) {
    var year =document.getElementById(year).value;
    var trs=/^\d{4}$/;
    if(!trs.test(year)){
        alert("请选择年份");
        return;
    }

    var month =document.getElementById(month).value;
    var trs=/^\d{1,2}$/;
    if(!trs.test(month)){
        alert("请选择月份");
        return;
    }
    var day =document.getElementById(day).value;
    var trs=/^\d{1,2}$/;
    if(!trs.test(month)){
        alert("请选择日期");
        return;
    }

    if(month<10){
        monthstr = "0" + month;
        if(day < 10){
            daystr = "0" + day;
            publicOpinionTime = year + monthstr + daystr
        }else{
            publicOpinionTime = year + monthstr +day
        }
    }else{
        if(day < 10){
            daystr = "0" + day;
            publicOpinionTime = year + month + daystr
        }else{
            publicOpinionTime = year + month +day
        }

    }

    homePagePublicOpinion.init()

}