const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=2b4e1af373f74ba5d1f08bbe08b53a5b&lat=&query=' +
    latitude +
    ',' +
    longitude

  console.log(url)
  request({ url: url, json: true }, (error, response) => {
    console.log(response)
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(
        undefined,
        ' It is currently ' +
          response.body.current.temperature +
          ' degress out. There is a ' +
          response.body.current.precip +
          '% chance of rain.'
      )
    }
  })
}

module.exports = forecast
