const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const url = 'https://api.darksky.net/forecast/eb15f632b9d9996937fc7a7ec9ed4ad1/37.8267,-122.4233'
const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidHJ1b25naG9uZ3BodW9jIiwiYSI6ImNrMnVsNTUwcjE1c3Mzb254OWdjdmp3dzUifQ.Qcf3qv4TC8akhBc1YrdRDQ&limit=1'

// request({ url: url, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to get weather data!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability} chance of rain`)
//     }
// })

// request({url: mapboxUrl, json: true}, (error, response) => {
//     if (error) {
//         console.log('Unable to get location data')
//     } else if (response.body.features.length === 0) {
//         console.log('There is no data that match the search')
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(latitude)
//         console.log(longitude)
//     }
// })

if (!process.argv[2]) {
    console.log('Please input the location')
} else {
    geocode(process.argv[2], (error, {latitude, longitude, location}) => {

        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forecatData) => {
            if (error) {
                return console.log(error)
            }
            console.log(location)
            console.log(forecatData)
          })
    })
}
