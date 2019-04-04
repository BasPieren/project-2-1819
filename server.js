'use strict'

const express = require('express'),
      request = require('request'),
      compression = require('compression'),
      bodyParser = require('body-parser'),
      app = express(),
      port = 3000

app
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(express.static('public'))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(compression())

  .get('/', homePage)

  .post('/filter', filterHomePage)

  .listen(process.env.PORT || port)

function homePage(req, res) {
  request('http://mirabeau.denniswegereef.nl/api/v1/rooms', (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    // console.log('body:', body)

    let data = JSON.parse(body),
        cleanedData = cleanData(data)

    // console.log(cleanedData)

    res.render('pages/index.ejs', {data: cleanedData})
  })
}

function filterHomePage(req, res) {
  request('http://mirabeau.denniswegereef.nl/api/v1/rooms', (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    // console.log('body:', body)

    let filterValue = req.body.filter,
        data = JSON.parse(body),
        cleanedData = cleanData(data),
        filterData = cleanedData.filter(e => {
          if (filterValue === 'sound' && e.measurements.occupancy === false) {
            return true
          } else if (filterValue === 'light' && e.measurements.occupancy === false) {
            return true
          }
        }),
        sortData = filterData.sort((a, b) => {
          if (filterValue === 'sound') {
            return a.measurements.mic_level - b.measurements.mic_level
          } else if (filterValue === 'light'){
            return a.measurements.ambient_light - b.measurements.ambient_light
          }
        })

    // console.log(sortData)

    res.render('pages/filter.ejs', {data: sortData})
  })
}

function cleanData(e) {
  let allData = e.data,
      filterData = allData.filter(e => {
        if (e.room_name !== 'Desk area 1' && e.room_name !== 'Desk area 2') {
          return true
        }
      }),
      mapData = filterData.map(e => {
        return {
          timestamp: e.timestamp,
          room_name: e.room_name,
          measurements: {
              mic_level: Math.round(e.measurements.mic_level / 100),
              ambient_light: e.measurements.ambient_light,
              occupancy: e.measurements.occupancy
          }
        }
      }),
      sortOccupancy = mapData.sort((a, b) => {
        return (a.measurements.occupancy === b.measurements.occupancy) ? 0 : a.measurements.occupancy ? 1 : -1
      })

  return sortOccupancy
}
