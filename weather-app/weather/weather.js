const request = require('request');

const darkSkyAPI = 'https://api.darksky.net/forecast/87eb2e1ba6657d3ec3d0bb54a92b1ab6'

var getWeather = (address, callback) => {
    request({
        url: `${darkSkyAPI}/${address.lat},${address.lng}`,
        json: true,
        qs: {
            units: 'si',
            lang: 'et'
        }
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                apparentTemperature: body.currently.apparentTemperature,
                temperature: body.currently.temperature
            });
        } else {
            callback('Got error: unable to connect to forecast server')
        }
    })
};

module.exports = {
    getWeather
};