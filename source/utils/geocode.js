const request = require('request');
const geocode = (address, callback) => {
    const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2xheWVybWQiLCJhIjoiY2s5eDZzYjhzMDhqMTNvbGk4cGc4OGZjdiJ9.RMvJPhwWQVgiTyD9DtuS_A&limit=1';
    request({
        url: url1,
        json: true
    }, (error, {
        body
    }) => {
        if (error)
            console.log("No net")
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name


            })
        }
    })
}
module.exports = geocode