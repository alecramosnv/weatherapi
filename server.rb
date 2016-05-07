require 'bundler/setup'
require 'sinatra'
require 'httparty'
require 'json'
require 'chronic'


get '/' do
  get_weather
end

def get_weather
  api_key = '01671288806d7d8df40c5f847b77021c'
  city = 'Reno'
  our_units = 'imperial'

  response = HTTParty.get("http://api.openweathermap.org/data/2.5/weather?q=#{city}&appid=#{api_key}&units=#{our_units}")
  weather_json = JSON.parse(response.body)
  "The temperature is currently: #{weather_json['main']['temp']}° F in #{city}."

end