var datesTime

var hotelPublicOpinion = {
    init:function () {
        var that = this
        that.publicOpinion()
    },
    publicOpinion:function () {

        if(publicOpinionTime == null ){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            datesTime = year + month + strDate;
        }else{
            datesTime = publicOpinionTime
        }
        $.ajax({
            url:hotel_public_opinion_url,
            contentType:"application/json",
            type:"GET",
            async:false,
            data:{
                "daysTime":datesTime
            },
            success:function(result){
                var array = result.data;
                console.log(array)
                var str = "";
                var number = "";
                var count = "";
                if(array.length > 0){
                    $.each(array,function(i,n){
                        var j = i+1
                        var num = j
                            number += '<div>'+num+'</div>';
                            str += '<div title="'+n.title+'">'+n.title.slice(0,20)+'...'+'</div>';
                            count += '<div>'+n.viewCount+'</div>';
                    });
                    $("#number").html(number)
                    $("#content").html(str)
                    $("#count").html(count)
                }else{
                    $("#number").text("0")
                    $("#content").text("暂无数据")
                    $("#count").text("0")
                }
            }
        });

    }
}

hotelPublicOpinion.init()

