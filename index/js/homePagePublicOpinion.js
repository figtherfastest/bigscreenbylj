var datesTime

var homePagePublicOpinion = {
    init: function () {
        var that = this
        that.publicOpinion()
    },
    publicOpinion: function () {

        if (publicOpinionTime == null) {
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
        } else {
            datesTime = publicOpinionTime
        }
        $.ajax({
            url: homepage_public_opinion_url,
            contentType: "application/json",
            type: "GET",
            async: false,
            data: {
                "daysTime": datesTime
            },
            success: function (result) {
                var array = result.data;
                var str = "";
                if (array.length > 0) {
                    $.each(array, function (i, n) {
                        var j = i + 1
                        var num = j
                        str += '<div class="numberWap">' +
                            '<div class="number" id="number">' + num + '</div>' +
                            '<div class="tittle" title="' + n.title + '">' + n.title + '</div>' +
                            '<div class="count">' + n.viewCount + '</div>' +
                            '</div>'
                    });
                } else {
                    str += '<div class="numberWap">' +
                        '<div class="number" id="number">0</div>' +
                        '<div class="tittle">暂无数据</div>' +
                        '<div class="count">0</div>' +
                        '</div>'
                }
                $('.numberBox').html(str)
            }
        });

    }
}

homePagePublicOpinion.init()

