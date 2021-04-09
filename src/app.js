const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

console.log(__dirname)

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Anjana'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Anjana'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'please provide address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send(error)
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if (err) {
        return res.send(err)
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about',
    name: 'Anjana'
  })
})

app.get('*', (re, res) => {
  res.render('404', {
    title: 'Error',
    errorStatus: '404',
    errorMessage: 'Not Found'
  })
})

app.listen(port, () => {
  console.log('server is up and running!!!')
})
