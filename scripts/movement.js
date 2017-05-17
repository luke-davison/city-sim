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
  g.arrays.cars.forEach((car, i) => {
    // only move the car if it is its turn on the desired tile
    if (car.route[0].car.id === car.id) {
      // move the car div to its current position
      let div = document.getElementsByClassName('car' + car.id)[0]
      div.style.left = (car.xpos - g.carWidth * g.tileDimension / 2) + 'px'
      div.style.top = (car.ypos - g.carWidth * g.tileDimension / 2) + 'px'
      // move the car towards the next position on its route
      // if it has got to its next position
      if (moveTowardsDestination(car)) {
        updateTileQueue(car.route[0])
        car.route.shift()
        if (car.route.length > 1) {
          car.xpos2 = car.route[1].xpos
          car.ypos2 = car.route[1].ypos
        } else {
          car.xpos2 = car.route[0].xpos
          car.ypos2 = car.route[0].ypos
          if (car.route[0].parent !== car.home && Math.random() * 7 < 1) {
            setRoute(i, car.route[0].parent, car.home)
          } else {
            setRoute(i, car.route[0].parent)
          }
        }
        if (car.route[0].car === -1) {
          car.route[0].car = car
        } else {
          car.route[0].queue.push(car)
        }
      }
    }
  })
}

function updateTileQueue (tile) {
  if (tile.queue.length > 0) {
    tile.car = tile.queue.shift()
  } else {
    tile.car = -1
  }
}

function moveTowardsDestination (car) {
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  let ratio = car.speed / (h || 0.01)
  if (ratio > 0.5) {
    car.xpos = car.xpos2
    car.ypos = car.ypos2
    return true
  }
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  return false
}

function setRoute (car, home, to) {

  let from = home
  if (!to) {
    to = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  //  while (to.nearbys.find(x => x.id === home.id)) {
  //    to = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  //  }
  }
  console.log('to', to)
  car.route = pathfinding.getRoute(from, to)
  car.xpos2 = car.route[1].xpos
  car.ypos2 = car.route[1].ypos
  car.tile = car.route[0]
  //this needs to be changed to something to check if the route[0] is already taken
  //this also needs to be changed so that route[0] is always the current tile for the car
  car.route[0].car = car
}
