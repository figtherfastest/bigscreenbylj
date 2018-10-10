
var totalPeople = {
    init:function () {
        var that = this
        that.totalMonthPeople()
    },
    totalMonthPeople:function () {

        if(linkTime == null) {
            var date = new Date();
            firstDay = new Date(date.getFullYear(), date.getMonth(), 1); //当月第一天
            lastDay= getLastDay(date.getFullYear(),date.getMonth()+1);
            // lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); //当月最后一天
        } else {
            firstDay = new Date(linkTime.getFullYear(), linkTime.getMonth(), 1); //当月第一天
            lastDay= getLastDay(linkTime.getFullYear(),linkTime.getMonth()+1);
            // lastDay = new Date(linkTime.getFullYear(), linkTime.getMonth() + 1, 1); //当月最后一天
        }
        var totalPeople = 0;
        $.ajax({
            url:index_url+"/teamStatistics/findWayTypeByTime",
            contentType:"application/json",
            type:"GET",
            async:false,
            data:"startTime="+firstDay.getTime()+"&endTime="+lastDay.getTime(),
            success:function(result){
                var array = result.data;
                array.forEach(function (e) {
                    // console.log(e)
                    totalPeople = totalPeople + e.peopleNum;
                });
            }
        });
        $("#totalPeopleMonth").html(totalPeople)
    }
}

totalPeople.init()

