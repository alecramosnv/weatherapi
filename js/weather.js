$(document).ready(function(){

	$('#go').on("click", weather)
	$('#reset').on("click", again)

	$('#results').hide();
	$('#reset').hide();

	var key = prompt("Please enter your API Key");

	$('#code').on("keypress", function (e) {
		if (e.which === 13) {
			weather();
			e.preventDefault();
		}
	});

	function again (event) {

		$('#results').hide();
		$('#reset').hide();
		$('#go').show();
	}

	function weather (event) {

		if (key != null) {
			var code = $('#code').val();
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + code + ',us&appid=' + key + '&units=imperial', function(data){
				console.log(data);
				$('#results').show();
				$('.location').text(data.name);
				$('#country').text(', ' + data.sys.country);
				$('#temp').text(data.main.temp + ' °F');
				$('#temp_max').text(data.main.temp_max + ' °F');
				$('#temp_min').text(data.main.temp_min + ' °F');
				$('#humidity').text(data.main.humidity + '%');
				$('#pressure').text(data.main.pressure + ' HPA');
				$('#clouds').text(data.clouds.all + '% Cover');
				$('#wind').text(data.wind.speed + '  mph');
				$('#weather').text(data.weather.main);
				var conditions = $('#weather').text();
				if (conditions = null) {
					$('#conditions').hide();
				}
				$('#sunrise').text(data.sys.sunrise);
				$('#sunset').text(data.sys.sunset);
				$('#coord').text('Latitude: ' + data.coord.lat + ', Longitude: ' + data.coord.lon);
				$('#coord').attr('href', 'https://www.google.com/maps/@' + data.coord.lat + ',' + data.coord.lon + ',15z');
				$('#go').hide();
				$('#code').val('');
				$('#reset').show();
			})
		}
	}

});