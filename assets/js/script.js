//location search by city
// location element
// current weather icon
// current weather description
// 5 day forecast for same location
// history of cities searched on left hand side of page. When the city is clicked on is again displays the current weather and forecast.

//global variable to store the data for the cities json
var cities = "";

//load the cities.json file into memory
$.getJSON("../data/cities.json", function(json) {
    cities = json
});


//example city object
// {
//     "id": 6101645,
//     "name": "Peterborough",  peterborough
//     "state": "",
//     "country": "CA",
//     "coord": {
//         "lon": -78.316231,
//         "lat": 44.300121
//     }
// },

//get the object for the city that matches the search term
function getCityByName(city) {
    return cities.filter(
        function(cities){ return cities.name.toLowerCase() == city.toLowerCase() }
    );
}

function search(searchTerm){
    //take the search term 
    var cityObject = getCityByName(searchTerm);
    var cityID = cityObject.id;
    var cityName = cityObject.name; //use this for history

    getCurrentForecast(cityID);
    getFiveDayForecast(cityID);
    //save the search term history probably in local storage
}

function getCurrentForecast(cityID){
    //hit current forecast endpoint for the city and append to currentForecast row
    //https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
}

function getFiveDayForecast(cityID){
    //hit 5day forecast for the city and append to 5day row
    //https://api.openweathermap.org/data/2.5/forecast?id={city ID}&appid={API key}
}


$(document).on('click', '#searchButton', function(){
    //get the value from your search bar

    search(searchTerm) 
});
//5-day forecast

// for loop through the data and append this

// ` <div class="col-2 ">
// <div class="row Temp">
//     ${temp}
// </div>
// <div class="row pressure">
//     ${pressure}
// </div>
// </div>
// `
// to the 5day row, filling in the variables from the response


<!--API KEY-->
28e329e5a233f8895f3d779ee68543b9