const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))  


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Phuoc'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Phuoc'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        msg: 'How can we help you?',
        name: 'Phuoc'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }

    geocode(req.query.address, (error, response) => {

        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(response.latitude, response.longitude, (error, forecatData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            const weatherData = {
                address: req.query.address,
                forecast: forecatData,
                location: response.location
            }
            res.send(weatherData)
          })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        msg: 'The Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        msg: 'The page that you are looking not exists in our website!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})