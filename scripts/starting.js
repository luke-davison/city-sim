module.exports = setupScripts

var g = require('./global.js')

const pathfinding = require('./pathfinding.js')
const movement = require('./movement.js')
const buildMap = require('./buildmap.js')

const streetArray = require('./map.js')
function setupScripts () {
  // sets the frame rate - which also controls how fast everything travels
  window.frameRate(30)
  // determines how big the tiles can be for everything to fit on the screen
  g.tileDimension = setTileDimension()
  // adds all the map divs to the page
  buildMap()
  // builds all the arrays
  getArrays()
  // adds some cars
  g.arrays.hm.forEach((car, i) => i % 2 === 0 && setTimeout(() => createCar(car), Math.random() * 50000))

  console.log(g.arrays)
}

function setTileDimension () {
  // const maxTileHeight = Math.floor((window.innerHeight - 2 * g.border) / g.mapHeight)
  // const maxTileWidth = Math.floor((window.innerWidth - 2 * g.border) / g.mapWidth)
  // return Math.min(maxTileHeight, maxTileWidth)
  return 20
  // return Math.floor(Math.sqrt(33 * 33 + 66 * 66))
}

function forEachInStreetArray (func) {
  for (let i = 0; i < g.mapHeight; i++) {
    for (let j = 0; j < g.mapWidth; j++) {
      func(i * g.mapWidth + j, i, j)
    }
  }
}

function getArrays () {
  forEachInStreetArray((i, ypos, xpos) => {
    let newSquare = {xpos: xpos, ypos: ypos, id: i, type: streetArray[i][0]}
    g.arrays.map.push(newSquare)
    g.arrays[streetArray[i][0]].push(newSquare)
    let tile1 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.25), ypos: (ypos + 0.25), place: 0, parent: newSquare}
    g.arrays.tiles.push(tile1)
    let tile2 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.75), ypos: (ypos + 0.25), place: 1, parent: newSquare}
    g.arrays.tiles.push(tile2)
    let tile3 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.75), ypos: (ypos + 0.75), place: 2, parent: newSquare}
    g.arrays.tiles.push(tile3)
    let tile4 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.25), ypos: (ypos + 0.75), place: 3, parent: newSquare}
    g.arrays.tiles.push(tile4)
    newSquare.tiles = [tile1, tile2, tile3, tile4]
  })
  g.arrays.map.forEach((cell, i) => {
    cell.nearbys = g.arrays.map.filter(x => {
      return x.xpos === cell.xpos && (x.ypos === cell.ypos + 1 || x.ypos === cell.ypos - 1) || x.ypos === cell.ypos && (x.xpos === cell.xpos + 1 || x.xpos === cell.xpos - 1)
    })
  })
}

function createCar (home) {
  let car = {speed: 0, moving: true, maxSpeed: 0.06, acceleration: 0.0015, waiting: 0}
  car.home = home // g.arrays.hm[Math.floor(Math.random() * g.arrays.hm.length)]
  car.id = g.arrays.cars.length
  car.tiles = []
  car.color = Math.floor(Math.random() * 12)
  car.direction = 0
  g.arrays.cars.push(car)
  drawCar(car)
  movement.setRoute(car, car.home, car.home.tiles[0])
  car.tiles.unshift(car.route.shift())
  car.tiles.unshift(car.route.shift())
  car.tiles[0].car = car
  car.tiles[1].car = car
  car.xpos = car.tiles[1].xpos
  car.ypos = car.tiles[1].ypos
  car.xpos2 = car.tiles[0].xpos
  car.ypos2 = car.tiles[0].ypos
}
function drawCar (car) {
  let img = document.createElement('img')
  img.src = './sprites/vehicles/carBlue3_010.png'
  img.style.position = 'absolute'
  img.classList.add('car')
  img.classList.add('car' + car.id)
  document.getElementById('main').appendChild(img)
  img.onload = function () {
    img.style.left = movement.carXposToIsometric(car.xpos, car.ypos) + 'px'
    img.style.top = movement.carYposToIsometric(car.xpos, car.ypos) + 'px'
    img.style.zIndex = car.ypos + car.ypos + 5
  }
}

function drawExampleCar () {
  let img = document.createElement('img')
  img.src = './sprites/vehicles/carBlue3_010.png'
  img.style.position = 'absolute'
  document.getElementById('main').appendChild(img)
  img.onload = function () {
    img.style.left = movement.carXposToIsometric(0, 0) + 'px'
    img.style.top = movement.carYposToIsometric(0, 0) + 'px'
  }
}
