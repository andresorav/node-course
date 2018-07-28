console.log('Geocode component loaded');

const request = require('request');

const googleMapsAPI = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleMapsAPIKey = 'AIzaSyBs-LgEO-IVtjYWr6_0lS2WgcdJKBvmFoM';

var geocodeAddress = (address, callback) => {
    var qs = {
        address: encodeURIComponent(address),
        key: googleMapsAPIKey
    };

   // console.log(qs);
    request({
        url: googleMapsAPI,
        qs: qs,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Failed to connect to Maps API');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Failed to find defined address');
        } else if (body.status === 'OK') {
            var geodata = body.results[0];

            //console.log(geodata);

            callback(undefined, {
                address: geodata.formatted_address,
                lat: geodata.geometry.location.lat,
                lng: geodata.geometry.location.lng
            });
        }
    });
};


module.exports = {
    geocodeAddress
};