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
        sortedData = sortData(data)

    res.render('pages/index.ejs', {data: sortedData})
  })
}

function sortData(e) {
  let allData = e

  let sortedOccupancy = allData.data.sort((a, b) => {
    return (a.measurements.occupancy === b.measurements.occupancy) ? 0 : a.measurements.occupancy ? 1 : -1
  })

  return sortedOccupancy
}
