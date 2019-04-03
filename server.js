'use strict'

const express = require('express'),
      request = require('request'),
      compression = require('compression'),
      app = express(),
      port = 3000

app
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(express.static('public'))
  .use(compression())

  .get('/', homePage)

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
      })

  let sortOccupancy = mapData.sort((a, b) => {
    return (a.measurements.occupancy === b.measurements.occupancy) ? 0 : a.measurements.occupancy ? 1 : -1
  })

  return sortOccupancy
}
