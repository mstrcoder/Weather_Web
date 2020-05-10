const request = require('request');
const forecast = (latitude, longitude, location, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&units=metric&lang=en&appid=050f033f611479da88acbec86826b755'
    request({
        url: url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback(error)
        } else {
            callback(undefined, {
                temp: body.current.temp,
                weather: body.current.weather[0].main,
                location: location
            })

        }
    })
}
module.exports = forecast