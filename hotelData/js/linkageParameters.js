var currentTime = new Date();//当前时间

var linkTime; //变化时间

var publicOpinionTime;

var linkAddressCode; //地区联动

var defaultAddressCode = ''; //默认地区

//年选择器
/*laydate.render({
    elem: '#yearInput',
    type: 'year',
    event: 'click'
});*/

function changeTime(yearId, monthId) {
    var year = document.getElementById(yearId).value;
    var month = document.getElementById(monthId).value - 1;
    var trs = /^\d{4}$/;
    if (!trs.test(year)) {
        alert("请选择年份");
        return;
    }
    linkTime = new Date(parseInt(year), month, 1);
    rooms.init();
    hotelData.init();
    asia.init();
    progress1.init();
    americas.init();
    progress2.init();
    oceania.init();
    progress3.init();
    european.init();
    progress4.init();
    africa.init();
    progress5.init();
    china.init();
    progress6.init();
    footone.init();

}

function changeYear(yearId) {
    var year = document.getElementById(yearId).value;
    var trs = /^\d{4}$/;
    if (!trs.test(year)) {
        alert("请选择年份");
        return;
    }
    linkTime = new Date(parseInt(year), 0, 1);
    entrys.init();
    roomdays.init();
}

function changeDay(year, month, day) {
    var year = document.getElementById(year).value;
    var trs = /^\d{4}$/;
    if (!trs.test(year)) {
        alert("请选择年份");
        return;
    }

    var month = document.getElementById(month).value;
    var trs = /^\d{1,2}$/;
    if (!trs.test(month)) {
        alert("请选择月份");
        return;
    }
    var day = document.getElementById(day).value;
    var trs = /^\d{1,2}$/;
    if (!trs.test(month)) {
        alert("请选择日期");
        return;
    }

    if (month < 10) {
        monthstr = "0" + month;
        if (day < 10) {
            daystr = "0" + day;
            publicOpinionTime = year + monthstr + daystr
        } else {
            publicOpinionTime = year + monthstr + day
        }
    } else {
        if (day < 10) {
            daystr = "0" + day;
            publicOpinionTime = year + month + daystr
        } else {
            publicOpinionTime = year + month + day
        }

    }

    hotelPublicOpinion.init()

}
