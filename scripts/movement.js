var g = require('./global.js')

var pathfinding = require('./pathfinding')

module.exports = {
  moveCars,
  setRoute,
  getDirection,
  carXposToIsometric,
  carYposToIsometric
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
  g.arrays.cars.forEach((car, i) => {
    // only move the car if it is its turn on the desired tile
    let distanceToNext = getDistanceToNext(car)
    if (car.moving) {
      car.waiting = 0
      moveTowardsDestination(car, distanceToNext)
    }
    if (distanceToNext > 0.7) {
      if (car.route[0].car === -1 || car.route[0].car.id === car.id) {
        whenNextTileIsClear(car)
      } else {
        if (car.moving) {
          car.moving = false
          car.speed = 0
          car.route[0].queue.push(car)
          if (car.tiles.length > 1) {
            updateTileQueue(car.tiles[1])
            car.tiles.pop()
          }
        }
      }
    }
    if (car.route.length < 1) {
      setRoute(car, car.tiles[0].parent, car.tiles[0])
    }
    if (car.speed === 0) {
      car.waiting++
      if (car.waiting === 150) {
        car.waiting = 0
        car.route[0].queue = car.route[0].queue.filter(x => x.id !== car.id)
        setRoute(car, car.tiles[0].parent, car.tiles[0])
        if (car.route[0].car === -1 || car.route[0].car.id === car.id) {
          whenNextTileIsClear(car)
        } else {
          car.route[0].queue.push(car)
        }
      }
    }
  })
}

function whenNextTileIsClear (car) {
  car.tiles.unshift(car.route.shift())
  if (car.tiles.length > 2 && getDirection(car.tiles[1], car.tiles[0]) !== getDirection(car.tiles[2], car.tiles[1])) {
    car.speed /= 2
  }
  car.xpos2 = car.tiles[0].xpos
  car.ypos2 = car.tiles[0].ypos
  car.moving = true
  car.tiles[0].car = car
  if (car.tiles.length > 2) {
    if ((car.tiles[2].parent.type !== 'rd') && (car.tiles[1].parent.type === 'rd')) {
      car.speed = 0
    }
    updateTileQueue(car.tiles[2])
    car.tiles.pop()

  }
}

function updateTileQueue (tile) {
  if (tile.queue.length > 0) {
    let car = tile.queue.find(x => x.tiles[0].parent.id === tile.parent.id)
    if (!car) {
      car = tile.queue.shift()
    } else {
      tile.queue = tile.queue.filter(x => x.id !== car.id)
    }
    whenNextTileIsClear(car)
  } else {
    tile.car = -1
  }
}

function getDistanceToNext (car) {
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  return (car.speed || car.acceleration) / (h || 0.001)
}

function moveTowardsDestination (car, ratio) {
  if (car.speed < car.maxSpeed) {
    car.speed += car.acceleration
  }
  if (ratio > 0.7) {
    car.xpos = car.xpos2
    car.ypos = car.ypos2
    let div = document.getElementsByClassName('car' + car.id)[0]
    div.style.left = carXposToIsometric(car.xpos, car.ypos) + 'px'
    div.style.top = carYposToIsometric(car.xpos, car.ypos) + 'px'
    div.style.zIndex = Math.floor(car.xpos) * 100 + Math.floor(car.ypos) * 100 + 5
    return
  }
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  let div = document.getElementsByClassName('car' + car.id)[0]
  div.style.left = carXposToIsometric(car.xpos, car.ypos) + 'px'
  div.style.top = carYposToIsometric(car.xpos, car.ypos) + 'px'
  div.style.zIndex = Math.floor(car.xpos) * 100 + Math.floor(car.ypos) * 100 + 5

  if (ratio > car.maxSpeed / 0.25) {
    if (car.tiles[0].parent.type !== 'rd') {
      div.style.visibility = 'hidden'
    } else {
      div.style.visibility = 'visible'
    }
  }
}

function setRoute (car, from, fromTile) {
  let to = car.home
  if (fromTile.parent === car.home || Math.random() * 5 < 6) {
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
  while (to.nearbys.find(x => x.id === home.id) || to.id === home.id) {
    to = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  }
  return to
}

function carXposToIsometric (xpos, ypos) {
  return 66 * (18 + xpos - ypos) + 50
}

function carYposToIsometric (xpos, ypos) {
  return (xpos + ypos) * 33 + 22
}
