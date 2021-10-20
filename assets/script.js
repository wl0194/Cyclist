let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}
// weather 
var cities = [];
function init() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));
  // We are making sure that we retrieved a value before the default value for "todos"
  if (storedCities !== null) {
    cities = storedCities;
  }
}
console.log(new Date());
var searchButton = $(".searchButton");

var apiKey = "b8ecb570e32c2e5042581abd004b71bb";

// Forloop for persisting the data onto HMTL page
function displayCities() {

  for (var i = 0; i < cities.length; i++) {

    var city = cities [i];
    var cityName = (".list-group").addClass("list-group-item");
    cityName.append("<li>" + city + "</li>");
  }
}

//  local storage 
var keyCount = 0;

searchButton.on ("click", function () {
  var searchInput = $(".searchInput").val();

  var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
  // 5 day forecast working
  var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

  if (searchInput == "") {
    console.log(searchInput);
  } else {
    $.ajax({
      url: urlCurrent,
      method: "GET"
    }).then(function (response) {
      console .log (response)
      // list-group append 
      // $ for selectes
      var cityName = $ (".list-group").addClass("list-group-item");
      // cityName.append("<li>" + response.name + "</li>");
      // add to the cities 
      cities.push(response.name)
      localStorage.setItem("cities", JSON.stringify(cities));
      // Local storage
      // var local = localStorage.setItem(keyCount, response.name);
      // keyCount = keyCount + 1;
      // Current Weather append 
      var currentCard = $(".currentCard").append("<div>").addClass("card-body");
      currentCard.empty();
      var currentName = currentCard.append("<p>");
      currentCard.append(currentName);

      // Adjust Date 
      var timeUTC = new Date(response.dt * 1000);
      currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
      currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

      var currentTemp = currentName.append("<p>");
      currentName.append(currentTemp);
      currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
      //  Humidity
      currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
      // // Wind Speed: 
      currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

      // UV Index URL
      var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

      // UV Index
      $.ajax({
        url: urlUV,
        method: "GET"
      }).then(function (response) {
        var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
        currentUV.addClass("UV");
        currentTemp.append(currentUV);
      });

    });

    // / Call for 5-day forecast 
    $.ajax({
      url: urlFiveDay,
      method: "GET"
    }).then(function (response) {
      // Array for 5-days 
      var day = [0, 8, 16, 24, 32];
      var fiveDayCard = $(".fiveDayCard").addClass("card-body");
      var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
      fiveDayDiv.empty();
      // For each days
      day.forEach(function (i) {
        var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
        FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

        fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");


      })

    });
    // function reset(cityName){
    //   while (cityName.firstChild) {
    //     cityName.removeChild(cityName.firstChild);
    //   }
    // }
  }
});


init()

