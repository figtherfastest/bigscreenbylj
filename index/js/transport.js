
var passenger = {
    init: function () {
        var that = this
        that.passengerTran()
    },
    passengerTran:function () {
        var now  = new Date();
        var today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
        var tomorrow = new Date(now.getFullYear(),now.getMonth(),now.getDate());
        tomorrow.setDate(tomorrow.getDate()+1);
        var totalPeople = 0;
        $.ajax({
            url:index_url+"/teamStatistics/findWayTypeByTime",
            contentType:"application/json",
            type:"GET",
            async:false,
            data:"startTime="+today.getTime()+"&endTime="+tomorrow.getTime(),
            success:function(result){
                var array = result.data;
                console.log(array)
                array.forEach(function (e) {
                    totalPeople = totalPeople + e.peopleNum;
                    if(e.wayType == "其他") {
                        $("#other").text(e.peopleNum)
                    } else if(e.wayType == "汽车") {
                        $("#railway").text(e.peopleNum)
                    } else if(e.wayType == "轮船") {
                        $("#highway").text(e.peopleNum)
                    } else if(e.wayType == "飞机") {
                        $("#airplane").text(e.peopleNum)
                    }
                });
            }
        });
        $("#totalPeople").text(totalPeople)
    }
}

passenger.init();
