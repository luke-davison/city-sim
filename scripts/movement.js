var g = require('./global.js')

var pathfinding = require('./pathfinding')

module.exports = {
  moveCars,
  setRoute,
  getDirection
}

function getDirection (posOne, posTwo) {
  // 0 up, 1 left, 2 down, 3 right
  console.log('this happened')
  if (posOne.xpos > posTwo.xpos) {
    return 3
  } else if (posOne.xpos < posTwo.xpos) {
    return 1
  } else if (posOne.ypos < posTwo.ypos) {
    return 2
  }
  return 0
}

function moveCars () {
  //console.log('tile', g.arrays.tiles.find(tile => tile.id === 768).queue)
  g.arrays.cars.forEach((car, i) => {
    // only move the car if it is its turn on the desired tile
    if (car.moving) {
      // move the car div to its current position

      // move the car towards the next position on its route
      // if it has got to its next position
      if (moveTowardsDestination(car)) {
        if (car.route[0].car === -1 || car.route[0].car.id === car.id) {
          if (moveOntoTile(car.route[0], car)) {
            if (car.route[0].queue.length === 0) {
              car.tiles.unshift(car.route.shift())
              car.xpos2 = car.tiles[0].xpos
              car.ypos2 = car.tiles[0].ypos
              car.tiles[0].car = car
              while (car.tiles.length > 2) {
                updateTileQueue(car.tiles[car.tiles.length - 1])
                car.tiles.pop()
              }
            } else if (car.route[0].queue[0].id === car.id) {
              car.route[0].queue.shift()
              car.tiles.unshift(car.route.shift())
              car.xpos2 = car.tiles[0].xpos
              car.ypos2 = car.tiles[0].ypos
              car.tiles[0].car = car
              while (car.tiles.length > 2) {
                updateTileQueue(car.tiles[car.tiles.length - 1])
                car.tiles.pop()
              }
            } else {
              car.speed = 0
              if (!car.route[0].queue.find(queuedCar => queuedCar.id === car.id)) {
                car.route[0].queue.push(car)
              }
            }
          } else {
            car.speed = 0
            if (!car.route[0].queue.find(queuedCar => queuedCar.id === car.id)) {
              car.route[0].queue.push(car)
            }
            if (car.route[0].queue[0].tiles[0].parent !== car.route[0].parent) {
              car.route[0].queue.push(car.route[0].queue.shift())
            }
          }
        } else {
          // car.moving = false
          car.speed = 0
          if (!car.route[0].queue.find(queuedCar => queuedCar.id === car.id)) {
            //console.log('car2', car)
            car.route[0].queue.push(car)
          }
          while (car.tiles.length > 1) {
            updateTileQueue(car.tiles[car.tiles.length - 1])
            car.tiles.pop()
          }
        }
        if (car.route.length === 1) {
          if (car.route[0].parent.id === car.home.id) {
            //car.moving = false
            car.speed = 0
            car.tiles.forEach(updateTileQueue)
          } else {
            setRoute(car, car.route[0].parent, car.route[0])
          }
        }
      }
    }
  })
}

function updateTileQueue (tile) {
  if (tile.queue.length > 0) {
    tile.queue[0].moving = true
  }
  tile.car = -1
}

function moveTowardsDestination (car) {
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  if (car.speed < car.maxSpeed) {
    car.speed += car.acceleration
    // checkAhead(car)
  }
  let ratio = (car.speed * g.tileDimension) / (h || 0.001)
  if (ratio > 0.7) {
    car.xpos = car.xpos2
    car.ypos = car.ypos2
    let div = document.getElementsByClassName('car' + car.id)[0]
    div.style.left = xPosition(car.xpos, car.ypos)
    div.style.top = yPosition(car.xpos, car.ypos)
    return true
  }
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  let div = document.getElementsByClassName('car' + car.id)[0]
  div.style.left = xPosition(car.xpos, car.ypos)
  div.style.top = yPosition(car.xpos, car.ypos)
  return false
}

function setRoute (car, from, fromTile) {
  let to = car.home
  if (fromTile.parent === car.home || Math.random() * 10 < 11) {
    to = getRandomBusiness(from)
  }
  car.route = pathfinding.getRoute(from, to, fromTile)
  car.directions = pathfinding.getRouteDirections(car.route, fromTile)
}

function setRouteHome (car, from, fromTile) {
  let to = car.home
  console.log('it did this')
  car.route = pathfinding.getRoute(from, to, fromTile)
  car.directions = pathfinding.getRouteDirections(car.route, fromTile)
}
var myCounter = 0
function getRandomBusiness (home) {
  myCounter++
  if (myCounter > g.arrays.wk.length - 1) {
    myCounter = 0
  }
  let to = g.arrays.wk[myCounter]
  //let to = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  while (to.nearbys.find(x => x.id === home.id || to.id === home.id)) {
    to = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  }
  return to
}

function xPosition (xpos, ypos) {
  return (xpos - g.carWidth * g.tileDimension / 2) + 'px'
}

function yPosition (xpos, ypos) {
  return (ypos - g.carWidth * g.tileDimension / 2) + 'px'
}

// if a car is at full speed, this function checks the next two tiles to see if they are free
// if they are, those tiles are either reserved or this car is put at the front of the queue
function checkAhead (car) {
  console.log('this should not be running')
  for (let i = 0; i < 5; i++) {
    if (car.route.length > i) { // if the route tile exists
      if (car.route[i].car === -1) {
        car.route[i].car = car
        /*if (car.route[i].car !== car.id) {
          if (!car.route[i].queue.find(queuedCar => queuedCar.id === car.id)) {
            car.route[i].queue.push(car)
          }
          return
        }*/
      } else {
        if (car.route[i].car.id !== car.id) {
          if (!car.route[i].queue.find(queuedCar => queuedCar.id === car.id)) {
            car.route[i].queue.push(car)
          }
        }
        return
      }
    }
  }
}

function moveOntoTile (tile, car) {
  let count = 0
  if (car.tiles[0].parent.id !== tile.parent.id) {
    tile.parent.tiles.forEach(tile => {
      if (tile.car !== -1 && tile.car.tiles[0].id === tile.id) {
        if (tile.car.id !== car.id) {
          count++
        }
      }
    })
  }
  return count < 3
}
