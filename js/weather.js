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

	function formatTime (time) {
		var date = new Date(time*1000);
		var hours = date.getHours();
		var minutes = "0" + date.getMinutes();
		var seconds = "0" + date.getSeconds();
		return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}

	function degToCompass(num) {
		var val = Math.floor((num / 22.5) + 0.5);
		var arr = ["North ", "North North East ", "North East ", "East North East ", "East ", "East South East ", "South East ", "South South East ", "South ", "South South West ", "South West ", "West South West ", "West ", "West North West ", "North West ", "North North West "];
		return arr[(val % 16)];
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
				$('#clouds').text(data.weather[0].description);
				$('#wind').text(data.wind.speed + '  mph from the ' + degToCompass(data.wind.deg));
				$('#weather').text(data.weather[0].main);
				var conditions = $('#weather').text();
				if (conditions == null) {
					$('#conditions').hide();
				}
				$('#sunrise').text(formatTime(data.sys.sunrise));
				$('#sunset').text(formatTime(data.sys.sunset));
				$('#coord').text('Latitude: ' + data.coord.lat + ', Longitude: ' + data.coord.lon);
				$('#coord').attr('href', 'https://www.google.com/maps/@' + data.coord.lat + ',' + data.coord.lon + ',15z');
				$('#go').hide();
				$('#code').val('');
				$('#reset').show();
			})
		}
	}

});