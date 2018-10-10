
var http = 'http://192.168.2.142:8869/';
var baseHttp = 'http://192.168.2.128:8869/';
/*刚刚*/
/*-- 基础数据 ---------*/

getBaseDataList = baseHttp+ "modelBaseData/getBaseDataStatistics";
getIndustryDataList = baseHttp +"modelBaseData/getIndustryInfo";

/*-- 景区详情 ---------*/
getTodayWetherInfo = http+"weather/weatherDayInfo";
scenic_detail_url = http+"modelScenicDetail/getScenicDetailInfo";
scenic_newest_public_opinion_url = http+"publicOpinion/getScenicNewestPublicOpinion";
scenic_negative_public_opinion_url = http+"publicOpinion/getScenicNegativePublicOpinion"

/*-- 景区运营监测 ---------*/
scenic_monitor_url = http+"modelScenicMonitor/getScenicParkingAndFlow";
All_Area_Public_Opinion = http+"publicOpinion/getAllAreaPublicOpinion"

/*-- 节假日数据 ---------*/
getHolidayAccount = http+"modelHolidayView/getAccountByHoliday";
getHolidayFlow =http+ "modelHolidayView/getFlowByHoliday";
getFlowByYear = http+"modelHolidayView/getFlowByYear";
getAccountByYear = http+"modelHolidayView/getAccountByYear";
getEveryHolidayFlow = http+"modelHolidayView/getFlowByEveryHoliday";

/**----------住宿舆情top10---------------*/
hotel_public_opinion_url = http+"publicOpinion/getHotelPublicOpinion"

/**------------ 首页舆情top10 -------*/
homepage_public_opinion_url =http+ "publicOpinion/getHomePagePublicOpinion"
/*-------------------------------------------------------------------*/

/**/
/*尹杰----------------------------------start---------------------------------------------------*/
//var getVisitorsInfPage="http://192.168.2.133:8333/modelHolidayView/getTouristGenderSituation";
var getVisitorsInfPage=http+"modelHolidayView/getTouristGenderSituation"


//========================================绝世好男人=============================================================

var myUrl=[
    http+"weather/weatherInfo",
    http+"teamStatistics/info"

];

/*温东山-----------------------------------end----------------------------------------------------*/
zhushu_url=http;

//翁剑军-----------------------------------------------
index_url = "http://192.168.2.142:8869"



//=============================================================================
/**
 * 7-10数据 baseColor
 * 环形和扇形
 * @type {string[]}
 */
var baseColor=["#ff473e","#fc7600","#fca400","#fec400","#fce300","#4c6ffc","#4b7efe","#4997fc","#4bdaac","#4ad970"];
var ringColor=['#ff473e','#fc7600',"#fec400","#fce300","#a05dfd"," #785dfc","#4b7efe","#4698f0","#4ad970","#13a02d"];
/**
 * 实心圆颜色<7环形
 * @type {string[]}
 */
var pillarColor=['#4B7EFE','#FEC400','#FC7600','#4AD970'," #13A02D","#36D9FC","#4698f0"];

/**
 * 金额带小数
 * @param money
 * @returns {string}
 */
 function dealNumber(money) {
    if (money && money != null) {
        money = String(money);
        var left = money.split('.')[0], right = money.split('.')[1];
        right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
        var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
        return (Number(money) < 0 ? "-" : "") + temp.join(',').split('').reverse().join('') + right;
    } else if (money === 0) {   //注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
        return '0.00';
    } else {
        return "";
    }
}

/**
 * 可以指定是否带有小数
 * @param s
 * @param type 指定小数位置
 * @returns {string}
 */
function formatMoney(s, type) {
    if (/[^0-9\.]/.test(s))
        return "0";
    if (s == null || s == "")
        return "0";
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    if (type == 0) {// 不带小数位(默认是有小数位)
        var a = s.split(".");
        if (a[1] == "00") {
            s = a[0];
        }
    }
    return s;
}
function getLastDay(year,month) {
    var new_year = year; //取当前的年份
    var new_month = month;//取下一个月的第一天，方便计算（最后一天不固定）
    if(month==12) {
        new_month =0; //月份减
        new_year++; //年份增
    }
    var new_date = new Date(new_year,new_month,1); //取当年当月中的第一天
    return new Date(new_date.getTime()/*-1000*60*60*24*/);//获取当月最后一天日期
}

