$(document).ready(function() {

    function weather() {
        $.getJSON(URL, function(data){
       var URL =  "https://api.weatherbit.io/v2.0/current?postal_code=19082&country=US&key=af07292d6d164b7f90a9652d0744bdca&include=hourly"
       console.log(data);
    });
    }

    weather();

     function showDetails(data){
         var city = data.city_name;
         var temp = data.temp;
         var time = data.datetime;

     }
    
     function error() {
        console.log('There was an error');
    }
});


