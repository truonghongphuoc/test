const request = require('request') 

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHJ1b25naG9uZ3BodW9jIiwiYSI6ImNrMnVsNTUwcjE1c3Mzb254OWdjdmp3dzUifQ.Qcf3qv4TC8akhBc1YrdRDQ&limit=1'

    request({url: url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode