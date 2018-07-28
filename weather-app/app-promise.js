console.log('Application loaded');

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const googleMapsAPI = 'https://maps.googleapis.com/maps/api/geocode/json';
const googleMapsAPIKey = 'AIzaSyBs-LgEO-IVtjYWr6_0lS2WgcdJKBvmFoM';
const darkSkyAPI = 'https://api.darksky.net/forecast/87eb2e1ba6657d3ec3d0bb54a92b1ab6';

var encodedAddress = encodeURIComponent(argv.address);
var encodedUrl = `${googleMapsAPI}?key=${googleMapsAPIKey}&address=${encodedAddress}`;

axios.get(encodedUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find specified address');
    }

    console.log(response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    return axios.get(`${darkSkyAPI}/${lat},${lng}`);

}).then((response) => {
    console.log({
        apparentTemperature: response.data.currently.apparentTemperature,
        temperature: response.data.currently.temperature
    });
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API server');
    } else {
        console.log(e.message);
    }
});