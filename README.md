# Project 2 @cmda-minor-web · 2018-2019 ⚙️

This is my repo the __Mirabeau Smart Office__ project.

![Project 2 screenshot](https://i.imgur.com/D0JIbcs.png)
> Homepage

## Table of Contents 🗃
* [To Do](#to-do-)
* [Description](#description-)
* [Installing](#installing-)
  * [Packages and Technologies](#packages-and-technologies)
* [API](#api-)
* [Research](#research-)
* [How It Works](#how-it-works-️)
  * [Clean Data](#clean-data)
  * [Filter Data](#filter-data)
* [Sources](#sources-)
  * [Honourable Mentions](#honourable-mentions)
* [Licence](#licence-)

## To Do 📌
This is a list of things I want to do in this project:

- [X] Create a server side app using Node.js
- [X] Use optimization technics like minify, compression and caching.
- [X] Make the app work without Javascript.
- [ ] Display a offline page using a service worker.

## Description 📝
The description of the project is as follows:

> We would like to see what you, as a T-shaped front-end developer, can build from scratch to make the life of Mirabeau people better! You are encouraged to be creative in what this will be. We provide you with the measurement data. Build a creative web-application that gives insights into these measurements.

The data used is from __MiraRooms__. MiraRooms show which meeting rooms are booked, booked but available, not booked and available, and not booked but unavailable. This makes it easier for Mirabeau people to quickly see where they can have a meeting or a call.

My app shows the rooms based on their occupation status, the amount of noise and the amount of light. Users have the ability to filter the rooms and show the room with the least noise or light based on the users needs.

## Installing 🔍
To install this application enter the following into your terminal:
```
git clone https://github.com/BasPieren/project-2-1819.git

cd project-2-1819

npm install

npm run server
```

### Packages and Technologies
This project makes use of the following packages and technologies:

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [EJS](https://ejs.co/)
* [Request](https://www.npmjs.com/package/request)
* [Compression](https://www.npmjs.com/package/compression)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [gulp](https://www.npmjs.com/package/gulp)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat-css)
* [gulp-cssnano](https://www.npmjs.com/package/gulp-cssnano)

## API 🐒
I made use of the following API for this project:

  * [Mirabeau Smart Office](https://bitbucket.org/davebitter/mirabeau-smart-office)

The API uses the following online endpoint, thanks to [Dennis Wegereef](https://github.com/denniswegereef):

`http://mirabeau.denniswegereef.nl/api/v1/rooms`

The JSON structure looks like this:

```js
{
   "data":[
      {
         "timestamp":1553765484.630674,
         "hwaddr":"00:0b:57:be:54:0d",
         "room_name":"Lippershey",
         "measurements":{
            "bapLevel":1149337663,
            "temperature":22834,
            "batt":100,
            "mic_level":2564,
            "ambient_light":13641,
            "humidity":19329,
            "co2":438,
            "occupancy":true,
            "uv_index":0,
            "voc":1280
         }
      }
   ],
   "error":null
}
```

## How It Works 🛠️
Here I explain the core features of this project.

### Clean Data
First whe clean the data using `.filter`, `.map`, and `.sort`. First whe remove Desk Area 1 and 2 from the data because this aren't real meeting rooms using `.filter`. Then we `.map` over the data to return only the things we need into a new object. Here we also use `Math.round` to convert the `mic_level` into readable decibel units. Finally we `.sort` the data based on the `occupancy` status.

```js
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
```

### Filter Data
Then when the user wants to filter the rooms, based on either the lowest noise or light value, we use the `filterHomePage()` function. The function gets called when there's an `.post` request.  Here we also use `.filter` and `.sort` and use `if` `else` statements to see when to return true based on the `filterValue`.

```js
function filterHomePage(req, res) {
  request('http://mirabeau.denniswegereef.nl/api/v1/rooms', (error, response, body) => {
    console.log('error:', error)
    console.log('statusCode:', response && response.statusCode)
    // console.log('body:', body)

    let filterValue = req.body.filter,
        data = JSON.parse(body),
        cleanedData = cleanData(data),
        filterData = cleanedData.filter(e => {
          if (filterValue === 'geluid' && e.measurements.occupancy === false) {
            return true
          } else if (filterValue === 'licht' && e.measurements.occupancy === false) {
            return true
          }
        }),
        sortData = filterData.sort((a, b) => {
          if (filterValue === 'geluid') {
            return a.measurements.mic_level - b.measurements.mic_level
          } else if (filterValue === 'licht'){
            return a.measurements.ambient_light - b.measurements.ambient_light
          }
        })

    // console.log(filterData)

    res.render('pages/filter.ejs', {data: sortData, filterValue: filterValue})
  })
}
```

## Sources 📚
This is a list of all the sources I used during this project:

  * [Javascript sort array of objects by a boolean property](https://stackoverflow.com/questions/17387435/javascript-sort-array-of-objects-by-a-boolean-property)

### Honourable Mentions

  * [Dennis Wegereef](https://github.com/denniswegereef) for the API online endpoint
  * [Jeroen van Berkum](https://github.com/jeroentvb) for help with the `cleanData()` function

## Licence 🔓
MIT © [Bas Pieren](https://github.com/BasPieren)
