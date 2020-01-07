const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/eb15f632b9d9996937fc7a7ec9ed4ad1/'+ latitude + ',' + longitude
    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to get weather data!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast