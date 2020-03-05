var date = moment().format("MMM Do YYYY");

var apiKey = "822b33dfe86125868db1209227685afc";

var userSearch;

$(document).ready(function () {

    function search() {
        event.preventDefault();

        $ (".currentWeather").empty();

        userSearch = $(".citySearch").val()

        var weatherURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + userSearch + "&appid=" + apiKey;

        $.ajax({
            url: weatherURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            searchResults(response);
            forcast(userSearch);
        })
    };

    function citiesSearchBar() {

        var searchForm = $("<form>");
        var searchInput = $("<input>").addClass("citySearch");
        var searchButton = $("<button>").text("Search").on("click", search);


        $(searchForm).append(searchInput, searchButton);
        $(".search").append(searchForm);
    }

    function searchResults(cityResponse) {
        var nameDiv = $("<h1>").text(userSearch + " (" + date + ")");
        var tempDiv = $("<div>").text("Temperature: " + cityResponse.main.temp + "F");
        var humidity = $("<div>").text("Humidity: " + cityResponse.main.humidity + "%");
        var wind = $("<div>").text("Wind Speed: " + cityResponse.wind.speed + " MPH");

        $(".currentWeather").append(nameDiv, tempDiv, humidity, wind);

        var lat = cityResponse.coord.lat;
        var lon = cityResponse.coord.lon;
        UVSearch(lat, lon);

    };

    function UVSearch(lat, lon) {
        var UVURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: UVURL,
            method: "GET"
        }).then(function (UV) {
            console.log(UV);
            $(".currentWeather").append("UV Index: " + UV.value);

        })
    };

    function forcast() {
        var forcastURL = "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=" + apiKey;

        $.ajax({
            url: forcastURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        })
    }

    citiesSearchBar();

});