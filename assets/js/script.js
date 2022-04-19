//create variable to use open weather API key
var apiKey='28e329e5a233f8895f3d779ee68543b9';


//use city name to get lat and lon
function getLatLong(cityName){
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName},CA&appid=${apiKey}`)
    //convert response into json
    .then(response => response.json())
    .then(data => {
        var lat = data[0].lat;
        var lon = data[0].lon;
        //send data to function
        getForecast({lat,lon,cityName}) 
    });
}

function search(searchTerm, type){
    //take the search term 
    getLatLong(searchTerm);
    var cityName = searchTerm; //use this for history

    //retrieve stored history if it's not empty and the search is not from history
    if(type !== 'history'){
        $("#history").append(`
            <div class="d-grid gap-2">
            <button class="btn btn-secondary historyItem">${searchTerm}</button>
            </div>
        `)
    
    
        var storedHistory = ""
        if(localStorage.getItem("history") != null){
            storedHistory = localStorage.getItem("history");
        }
        storedHistory = storedHistory + "," + cityName;
        localStorage.setItem('history', storedHistory);
    }
}
function getForecast(cityLocation){
    //hit current forecast endpoint for the city and append to appropriate rows
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLocation.lat}&lon=${cityLocation.lon}&units=metric&appid=${apiKey}`)
    //convert response to json    
    .then(response => response.json())
        .then(data => {
            //UV index 
            // 1- 2 low
            // 3- 5 moderate
            // 6- 7 high
            // 8- 10 very high
            // 11+ extreme
            var uvIndex = data.current.uvi;
            var uvIndexColor = "";
            if (uvIndex < 3) {
                uvIndexColor = 'green';
            } else if ( uvIndex < 6){
                uvIndexColor = 'yellow';
            } else if (uvIndex < 8){
                uvIndexColor = 'orange';
            } else if (uvIndex < 11){
                uvIndexColor = 'red';
            } else {
                uvIndexColor = 'purple';
            }

            //create the currentForecast html element with appropriate data
            var currentForecast = `
            <span class="border border-primary border-3 mt-1 fs-4"> 
                <div class="card-body  city">
                    ${cityLocation.cityName} (${moment(data.current.dt * 1000).format("L")})
                </div>
                <div class="card-body temperature">
                    Temp: ${data.current.temp} &#8451;
                </div>
                <div class="card-body wind">
                    Wind: ${data.current.wind_speed} KPH
                </div>
                <div class=" card-body humidity">
                    Humidity: ${data.current.humidity}
                </div>
                <div class="card-body uvIndex">
                   UV Index: <span class="card-body" style="background-color:${uvIndexColor};">${data.current.uvi}</span>
                </div>
                </span>
            `;
            //append currentForecast to currentForecast row
            $('#current').append(currentForecast);
            

            //for loop through data.daily up to 5 days and append to the fiveDay row
            for (i = 1; i < 6; i++){
                var tempData = data.daily[i];
                var forecast = `
                <div class="col-2 ">
                    <div class="bg-primary rounded card-body">
                        <div class="date">
                            ${moment(tempData.dt * 1000).format("L")}
                        </div>
                        <div class="temperature">
                            Temp: ${tempData.temp.day} &#8451;
                        </div>
                        <div class="Wind">
                            Wind: ${tempData.wind_speed} KPH
                        </div>
                        <div class="humidity">
                            Humidity: ${tempData.humidity} %
                        </div>
                    </div>
                </div>`;

                //append this days forecast to the fiveDay row
                $('#fiveDay').append(forecast);
            }

        })
}

   
// Search Bar
$(document).on('click', '#submit', function(){
    //get the value from your search bar
    var searchTerm = $('#search').val();

    //clear elements to ensure that we don't have duplicates
    $('#fiveDay').empty();
    $('#current').empty();
    $('#search').val('');

    //save this search to the history
    var type = "search";
    //call search function
    search(searchTerm, type) 
});

$(document).on("click", '.historyItem', function(){ 
    //get the value from the element being clicked
    var searchTerm = $(this).text();
    
    //clear elements to ensure that we don't have duplicates
    $('#fiveDay').empty();
    $('#current').empty();
    $('#search').val('');
    //don't create a new history element
    var type = "history";
    //call search function
    search(searchTerm, type)
})


$(document).ready(function(){
    //retrieve history from local storage
    var storedHistory = localStorage.getItem("history");
    if(storedHistory != null){
        var historyArray = storedHistory.split(",");
        historyArray.forEach(function(item){
            $("#history").append(`
                <div class="d-grid gap-2">
                    <button class="btn btn-secondary historyItem">${item}</button>
                </div>
            `)
        })
    }
});