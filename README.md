This is a Test Weather App on React

some considerations:

1. The API(https://www.weatherbit.io/api/weather-current) Free Plan only return a single day of weather. So I applied a random logic to have also the others days of the weeks.

2. I used a Provider to fetch the result and save it on state

3. The logic to retrieve the query params (lat, lon) is in the page level. Default position is Rome.

Mirko Tafuri