console.log('Application loaded');

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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


geocode.geocodeAddress(argv.address, (error, address) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Get temperature for: %s', address.address);
        weather.getWeather(address, (error, weather) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Temperature: ${weather.temperature}, it feels like: ${weather.apparentTemperature}`);
            }
        });
    }
});