'use strict'

const express = require('express'),
      request = require('request'),
      app = express(),
      port = 3000

app
  .set('view engine', 'ejs')
  .set('views', 'views')

  .use(express.static('public'))

  .get('/', homePage)

  .listen(process.env.PORT || port)

function homePage(req, res) {
  request('http://mirabeau.denniswegereef.nl/api/v1/rooms', (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    // console.log('body:', body)

    let data = JSON.parse(body)

    res.render('pages/index.ejs', {data: data.data})
  })
}
