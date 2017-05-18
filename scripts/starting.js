module.exports = setupScripts

var g = require('./global.js')

const pathfinding = require('./pathfinding.js')
const movement = require('./movement.js')

const streetArray = require('./map.js')
function setupScripts () {
  // sets the frame rate - which also controls how fast everything travels
  window.frameRate(30)
  // determines how big the tiles can be for everything to fit on the screen
  g.tileDimension = setTileDimension()
  // adds all the map divs to the page
  drawMap()
  // builds all the arrays
  getArrays()
  // adds some cars
  g.arrays.hm.forEach(createCar)
}

function setTileDimension () {
  const maxTileHeight = Math.floor((window.innerHeight - 2 * g.border) / g.mapHeight)
  const maxTileWidth = Math.floor((window.innerWidth - 2 * g.border) / g.mapWidth)
  return Math.min(maxTileHeight, maxTileWidth)
}

function forEachInStreetArray (func) {
  for (let i = 0; i < g.mapHeight; i++) {
    for (let j = 0; j < g.mapWidth; j++) {
      func(i * g.mapWidth + j, i, j)
    }
  }
}

function drawMap () {
  forEachInStreetArray((i, ypos, xpos) => {
    let div = document.createElement('div')
    div.style.width = g.tileDimension + 'px'
    div.style.height = g.tileDimension + 'px'
    div.style.left = (xpos * g.tileDimension + g.border) + 'px'
    div.style.top = (ypos * g.tileDimension + g.border) + 'px'
    div.style.position = 'absolute'
    div.classList.add(streetArray[i])
    div.classList.add('id' + i)
    div.classList.add('tile')
    document.getElementById('main').appendChild(div)
  })
}

function getArrays () {
  forEachInStreetArray((i, ypos, xpos) => {
    let newSquare = {xpos: xpos, ypos: ypos, id: i, type: streetArray[i]}
    g.arrays.map.push(newSquare)
    g.arrays[streetArray[i]].push(newSquare)
    let tile1 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.25) * g.tileDimension + g.border, ypos: (ypos + 0.25) * g.tileDimension + g.border, place: 0, parent: newSquare}
    g.arrays.tiles.push(tile1)
    let tile2 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.75) * g.tileDimension + g.border, ypos: (ypos + 0.25) * g.tileDimension + g.border, place: 1, parent: newSquare}
    g.arrays.tiles.push(tile2)
    let tile3 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.75) * g.tileDimension + g.border, ypos: (ypos + 0.75) * g.tileDimension + g.border, place: 2, parent: newSquare}
    g.arrays.tiles.push(tile3)
    let tile4 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.25) * g.tileDimension + g.border, ypos: (ypos + 0.75) * g.tileDimension + g.border, place: 3, parent: newSquare}
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
  let car = {speed: 0, moving: true, maxSpeed: 0.1, acceleration: 0.003}
  car.home = home // g.arrays.hm[Math.floor(Math.random() * g.arrays.hm.length)]
  car.id = g.arrays.cars.length
  car.tiles = []
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
  let div = document.createElement('div')
  div.style.width = Math.floor(g.tileDimension * g.carWidth) + 'px'
  div.style.height = Math.floor(g.tileDimension * g.carLength) + 'px'
  div.style.left = car.xpos + 'px'
  div.style.top = car.ypos + 'px'
  div.style['background-color'] = 'black'
  div.style.position = 'absolute'
  div.classList.add('car')
  div.classList.add('car' + car.id)
  document.getElementById('main').appendChild(div)
}
