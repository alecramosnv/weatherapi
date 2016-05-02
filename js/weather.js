$(document).ready(function(){

	$('#go').on("click", weather)
	$('#reset').on("click", again)

	$('#results').hide();
	$('#reset').hide();

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

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	var key = getCookie("key");
	if (key == "") {
		key = prompt("Please enter your key:", "");
		if (key != "" && key != null) {
			setCookie("key", key, 365);
		}
	}

	function weather (event) {
		forecast();
		currentWeather();
		air();
	}


	function currentWeather (event) {
		var code = $('#code').val();
		if (key != null) {
			$.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + code + ',us&appid=' + key + '&units=imperial', function(data){
				$('#results').show();
				$('.location').text(data.name);
				$('#country').text(', ' + data.sys.country);
				$('#temp').text(data.main.temp + ' °F');
				$('#humidity').text(data.main.humidity + '%');
				$('#pressure').text(data.main.pressure + ' HPA');
				$('#clouds').text(data.weather[0].description);
				$('#wind').text(data.wind.speed + '  mph from the ' + degToCompass(data.wind.deg));
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

	function forecast (event) {
		var code = $('#code').val();
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + code + ',us&appid=' + key + '&units=imperial', function(data){
			var city = data.name;
			$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=imperial&cnt=7&appid=' + key, function(forecast){
				$('#temp_max').text(forecast.list[0].temp.max + ' °F');
				$('#temp_min').text(forecast.list[0].temp.min + ' °F');
				$('#icon').attr('src', 'http://openweathermap.org/img/w/' + forecast.list[0].weather[0].icon + '.png');
				var id = forecast.city.id;
			})
		})
	}

	var key2 = getCookie("key2");
	if (key2 == "") {
		key2 = prompt("Please enter your second key:", "");
		if (key2 != "" && key2 != null) {
			setCookie("key2", key2, 365);
		}
	}

	function air (event) {
		var code = $('#code').val();
		$.getJSON('http://api.openweathermap.org/data/2.5/weather?zip=' + code + ',us&appid=' + key + '&units=imperial', function(data){
			var city = data.name;
			var lat = data.coord.lat;
			var lon = data.coord.lon;
			$.getJSON('https://api.breezometer.com/baqi/?lat=' + lat + '&lon=' + lon + '&key=' + key2, function(air){
				$('#air').text(air.breezometer_description);
				$('#air').css('color', air.breezometer_color);
				$('#children').text(air.random_recommendations.children);
				$('#health').text(air.random_recommendations.health);
				$('#inside').text(air.random_recommendations.inside);
				$('#outside').text(air.random_recommendations.outside);
				$('#sport').text(air.random_recommendations.sport);
			})
		})
	}

	// first key: 01671288806d7d8df40c5f847b77021c
	// second key: 07dd79e6867f4949b83c77b59fedfe81

});