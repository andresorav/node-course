const request = require('request');

const googleMapsAPI = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleMapsAPIKey = 'AIzaSyBs-LgEO-IVtjYWr6_0lS2WgcdJKBvmFoM';

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        request({
            json: true,
            url: googleMapsAPI,
            qs: {
                key: googleMapsAPIKey,
                address: encodeURIComponent(address)
            }
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Failed to find defined address');
            } else if (body.status === 'OK') {
                var geodata = body.results[0];

                resolve({
                    address: geodata.formatted_address,
                    lat: geodata.geometry.location.lat,
                    lng: geodata.geometry.location.lng
                });
            }
        })
    });
};

var address = '227 Paldiski mnt Tallinn Estonia';
geocodeAddress(address).then((location) => {
    console.log('Location data:');
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log('Got error: %s', errorMessage);
})