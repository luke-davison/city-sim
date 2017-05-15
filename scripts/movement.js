var g = require('./global.js')

var pathfinding = require('./pathfinding')

module.exports = {
  moveCars,
  setRoute
}

function getPosition (posOne, posTwo) {
  const direction = getDirection(posOne, posTwo)
  switch (direction) {
    case 0: return {xpos: g.arrays.map[posOne].xpos + g.lanePosition, ypos: g.arrays.map[posOne].ypos}
    case 1: return {xpos: g.arrays.map[posOne].xpos + 1 - g.carLength, ypos: g.arrays.map[posOne].ypos + g.lanePosition}
    case 2: return {xpos: g.arrays.map[posOne].xpos + 1 - g.lanePosition - g.carWidth, ypos: g.arrays.map[posOne].ypos + 1 - g.carLength}
    case 3: return {xpos: g.arrays.map[posOne].xpos, ypos: g.arrays.map[posOne].ypos + 1 - g.lanePosition - g.carWidth}
  }
}

function getDirection (posOne, posTwo) {
  // 0 up, 1 left, 2 down, 3 right
  if (g.arrays.map[posOne].xpos > g.arrays.map[posTwo].xpos) {
    return 3
  } else if (g.arrays.map[posOne].xpos < g.arrays.map[posTwo].xpos) {
    return 1
  } else if (g.arrays.map[posOne].ypos < g.arrays.map[posTwo].ypos) {
    return 2
  }
  return 0
}
function moveCars () {
  for (let i = 0; i < g.arrays.cars.length; i++) {
    if (g.arrays.cars[i].moving) {
      let div = document.getElementsByClassName('car' + i)[0]
      div.style.left = (g.arrays.cars[i].xpos * g.tileDimension + g.border) + 'px'
      div.style.top = (g.arrays.cars[i].ypos * g.tileDimension + g.border) + 'px'
      if (moveTowardsDestination(i)) {
        g.arrays.cars[i].route.shift()
        if (g.arrays.cars[i].route.length > 1) {
          let newDestination = getPosition(g.arrays.cars[i].route[0], g.arrays.cars[i].route[1])
          g.arrays.cars[i].xpos2 = newDestination.xpos
          g.arrays.cars[i].ypos2 = newDestination.ypos
        } else if (g.arrays.cars[i].route.length > 0) {
          let newDestination = g.arrays.cars[i].xpos2 = getPosition(g.arrays.cars[i].route[0], g.arrays.cars[i].route[0])
          g.arrays.cars[i].xpos2 = newDestination.xpos
          g.arrays.cars[i].ypos2 = newDestination.ypos
          if (g.arrays.cars[i].route[0] !== g.arrays.cars[i].home && Math.random() * 7 < 1) {
            setRoute(i, g.arrays.cars[i].route[0], g.arrays.cars[i].home)
          } else {
            setRoute(i, g.arrays.cars[i].route[0])
          }
        } else {
          console.log('something went wrong')
          setRoute(g.arrays.cars[i].home, i)
        }
      }
    }
  }
}
function moveTowardsDestination (id) {
  let car = g.arrays.cars[id]
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  let ratio = car.speed / h
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  g.arrays.cars[id] = car
  if (ratio > 0.5) {
    return true
  }
  return false
}

function setRoute (id, home, toId) {
  let fromId = home
  if (!toId) {
    toId = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
  }
  let route = pathfinding.getRoute(fromId, toId)
  while (route.length < 3) {
    toId = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
    route = pathfinding.getRoute(fromId, toId)
  }
  let destination = getPosition(route[1], route[2])
  g.arrays.cars[id].xpos2 = destination.xpos
  g.arrays.cars[id].ypos2 = destination.ypos
  g.arrays.cars[id].route = route
}
