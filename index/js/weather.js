$.ajax({
    url:index_url+"/weather/weatherDayInfo",
    contentType:"application/json",
    type:"GET",
    async:false,
    success:function(result){
        var data = result.data.dayWeather;
        $("#date").html(data[0].date);
        $("#dateweek").html(data[0].dateweek);
        $("#dayPictureUrl").attr("src",data[0].dayPictureUrl);
        $("#nightPictureUrl").attr("src",data[0].nightPictureUrl);
        $(".temperature").html(data[0].temperature);
        $(".weather").html(data[0].weather);
    }
})