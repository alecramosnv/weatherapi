$(document).ready(function(){

	$('#go').on("click", weather)

	function weather (event) {

		var key = prompt("Please enter your API Key");
		if (key != null) {
			var code = prompt("Please enter your zip code", "89511");
			if (code != null) {
				$.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + code + ',us&appid=' + key + '&units=imperial', function(data){
					console.log(data);
					$('#temp').text('Current Temp: ' + data.main.temp + ' °F');
					$('#temp_max').text('Max. Temp: ' + data.main.temp_max + ' °F');
					$('#temp_min').text('Min. Temp: ' + data.main.temp_min + ' °F');
					$('#humidity').text('Humidity: ' + data.main.humidity + ' %');
					// $('#weather').text(data.weather.0.description);
				})
			}
		}
	}

});