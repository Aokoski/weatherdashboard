
function makeRow(text) {
  var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
  $(".history").append(li);
}

  $("button").on("click",function(){
    let inputText = $("input").val()
    var APIKey = "a70a72d7bf38c63dccd71c306a1c86a4";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+inputText + "&units=imperial&appid=" + "&apikey=" + APIKey;

    localStorage.setItem("history", JSON.stringify(inputText));

    $("#buttons-view").val(localStorage.getItem(inputText));
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
    forecast(inputText);
    

    
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
     
            $(".uvIndex").text("uvIndex:" + response.value);

        })
}
      // Initial array of movies
      var cities = [];

      if (localStorage.getItem("cities")) {
        cities = JSON.parse(localStorage.getItem("cities"));
      }
      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();
     

        // Looping through the array of movies
        for (var i = 0; i < cities.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("city");
          // Adding a data-attribute with a value of the city at index i
          a.attr("data-name", cities[i]);
          // Providing the button's text with a value of the city at index i
          a.text(cities[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#search-term-input").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var cities = $("#search-term-input").val().trim();
        // The movie from the textbox is then added to our array
       cities.push(cities);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();

    //function forecast(){

    function  forecast(cityName){
     
      var appid= "a70a72d7bf38c63dccd71c306a1c86a4";
      var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${appid}`
      
  
      $.ajax({
          url: queryURL,
          method: "GET"
        })
          // We store all of the retrieved data inside of an object called "response"
          .then(function(response) {
             
              for (var i = 0; i < 5; i++){
                var col = $("<div>").addClass("col-md-2")
                var card = $("<div>").addClass('card bg-primary text-white');
                var body = $("<div>").addClass("card-body p-2");

                var title = $("<h2>").addClass("card-title").text(response.list[i].dt_txt);

                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                var p1 = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max + " °F");
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + response.list[i].main.humidity + "%");
                col.append(card.append(body.append(title, img, p1, p2)));
                $(".well").append(col);
        
              }
              
  
          })
  
    }    

    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    
  for (var i = 0; i < history.length; i++){
    makeRow(localStorage.getItem("history"));
  }

