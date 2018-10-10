
var stay = {
    init:function () {
        var that = this
        that.stayLive()
    },
    stayLive:function(){
        if(linkAddressCode != null) {
            defaultAddressCode = linkAddressCode
        }
        $.ajax({
            type: "GET",
            async:false,
            url: zhushu_url+"livingStatistics/getDateSlotNumber",
            data: {addressCode:defaultAddressCode},
            dataType: "json",
            success: function (data) {
                if(data.code=="OK"){
                    $("#dayCount").html(formatMoney(data.data.today,0));
                    $("#mouthCount").html(formatMoney(data.data.month,0));
                    $("#yearCount").html(formatMoney(data.data.year,0));
                }
            }
        });
    }
}

stay.init();
