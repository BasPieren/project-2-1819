# Project 2 @cmda-minor-web · 2018-2019 ⚙️

This is my repo the __Mirabeau Smart Office__ project.

![Project Image](https://i.imgur.com/ZALRBjH.png)
> Image description

## Table of Contents 🗃
* [To Do](#to-do-)
* [Description](#description-)
* [Installing](#installing-)
  * [Packages and Technologies](#packages-and-technologies)
* [API](#api-)
* [Research](#research-)
* [How It Works](#how-it-works-️)
* [Sources](#sources-)
  * [Honourable Mentions](#honourable-mentions)
* [Licence](#licence-)

## To Do 📌
This is a list of things I want to do in this project:

- [ ] .

## Description 📝
The description of the project is as follows:

> We would like to see what you, as a T-shaped front-end developer, can build from scratch to make the life of Mirabeau people better! You are encouraged to be creative in what this will be. We provide you with the measurement data. Build a creative web-application that gives insights into these measurements.

The data used is from __MiraRooms__. MiraRooms show which meeting rooms are booked, booked but available, not booked and available, and not booked but unavailable. This makes it easier for Mirabeau people to quickly see where they can have a meeting or a call.

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

  * None!

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

## Research 🕵🏻
Here I explain the research for this project.

## How It Works 🛠️
Here I explain the core features of this project.

## Sources 📚
This is a list of all the sources I used during this project:

  * [Javascript sort array of objects by a boolean property](https://stackoverflow.com/questions/17387435/javascript-sort-array-of-objects-by-a-boolean-property)

### Honourable Mentions

  * [Dennis Wegereef](https://github.com/denniswegereef) for the API online endpoint

## Licence 🔓
MIT © [Bas Pieren](https://github.com/BasPieren)
