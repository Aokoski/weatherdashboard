


  $("button").on("click",function(){
    let inputText = $("input").val()
    var APIKey = "a70a72d7bf38c63dccd71c306a1c86a4";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+inputText + "&units=imperial&appid=" + "&apikey=" + APIKey;

    console.log(inputText);
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
    
    // Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".temp").text("Temperature (F) " + response.main.temp);
    $(".uvIndex").text("uvIndex:" + response.coord.value);

    uvIndex(response.coord.lat,response.coord.lon);
    console.log(response);
    
        })
    
  })

function uvIndex(lat,lon){
    var appid= "a70a72d7bf38c63dccd71c306a1c86a4";
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid="+appid+"&lat="+lat+"&lon="+lon;

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        // We store all of the retrieved data inside of an object called "response"
        .then(function(response) {
            console.log(response);
            $(".uvIndex").text("uvIndex:" + response.value);

        })
}
