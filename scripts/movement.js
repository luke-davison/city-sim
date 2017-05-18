var g = require('./global.js')

var pathfinding = require('./pathfinding')

module.exports = {
  moveCars,
  setRoute,
  getDirection
}

function getPosition (posOne, posTwo) {
  const direction = getDirection(posOne, posTwo)
  switch (direction) {
    case 0:
      return {
        xpos: g.arrays.map[posOne].xpos + g.lanePosition,
        ypos: g.arrays.map[posOne].ypos
      }
    case 1:
      return {
        xpos: g.arrays.map[posOne].xpos + 1 - g.carLength,
        ypos: g.arrays.map[posOne].ypos + g.lanePosition
      }
    case 2:
      return {
        xpos: g.arrays.map[posOne].xpos + 1 - g.lanePosition - g.carWidth,
        ypos: g.arrays.map[posOne].ypos + 1 - g.carLength
      }
    case 3:
      return {
        xpos: g.arrays.map[posOne].xpos,
        ypos: g.arrays.map[posOne].ypos + 1 - g.lanePosition - g.carWidth
      }
  }
}

function getDirection (posOne, posTwo) {
  // 0 up, 1 left, 2 down, 3 right
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
  // console.log(g.arrays.cars)
  g.arrays.cars.forEach((car, i) => {
    // only move the car if it is its turn on the desired tile
    if (car.moving) {
      // move the car div to its current position

      // move the car towards the next position on its route
      // if it has got to its next position
      if (moveTowardsDestination(car)) {
        if (car.route[0].car === -1 || car.route[0].car.id === car.id) {
          car.tiles.unshift(car.route.shift())
          car.xpos2 = car.tiles[0].xpos
          car.ypos2 = car.tiles[0].ypos
          car.moving = true
          car.tiles[0].car = car
          if (car.tiles.length > 2) {
            updateTileQueue(car.tiles[2])
            car.tiles.pop()
          }
        } else {
          car.moving = false
          car.speed = 0
          car.route[0].queue.push(car)
          if (car.tiles.length > 1) {
            updateTileQueue(car.tiles[1])
            car.tiles.pop()
          }
        }
        if (car.route.length === 1) {
          if (car.route[0].parent.id === car.home.id) {
            car.moving = false
            car.speed = 0
            car.tiles.forEach(updateTileQueue)
          } else {
            setRouteHome(car, car.route[0].parent, car.route[0])
          }
        }
      }
    }
  })
}

function updateTileQueue (tile) {
  if (tile.queue.length > 0) {
    tile.car = tile.queue.shift()
    tile.car.tiles.unshift(tile.car.route.shift())
    tile.car.xpos2 = tile.car.tiles[0].xpos
    tile.car.ypos2 = tile.car.tiles[0].ypos
    tile.car.moving = true
  } else {
    tile.car = -1
  }
}

function moveTowardsDestination (car) {
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  if (car.speed < car.maxSpeed) {
    car.speed += car.acceleration
  }
  let ratio = (car.speed * g.tileDimension) / (h || 0.001)
  if (ratio > 0.7) {
    car.xpos = car.xpos2
    car.ypos = car.ypos2
    let div = document.getElementsByClassName('car' + car.id)[0]
    div.style.left = (car.xpos - g.carWidth * g.tileDimension / 2) + 'px'
    div.style.top = (car.ypos - g.carWidth * g.tileDimension / 2) + 'px'
    return true
  }
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  let div = document.getElementsByClassName('car' + car.id)[0]
  div.style.left = (car.xpos - g.carWidth * g.tileDimension / 2) + 'px'
  div.style.top = (car.ypos - g.carWidth * g.tileDimension / 2) + 'px'
  return false
}

function setRoute (car, from, fromTile) {
  let to = car.home
  if (fromTile.parent === car.home || Math.random() * 5 < 4) {
    to = getRandomBusiness(from)
  }
  car.route = pathfinding.getRoute(from, to, fromTile)
}

function setRouteHome (car, from, fromTile) {
  let to = car.home
  car.route = pathfinding.getRoute(from, to, fromTile)
}

function getRandomBusiness (home) {
  let to = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  while (to.nearbys.find(x => x.id === home.id || to.id === home.id)) {
    to = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  }
  return to
}
