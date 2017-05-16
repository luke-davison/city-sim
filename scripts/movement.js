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
    if (g.arrays.tiles[g.arrays.cars[i].route[0].id].car === i) {
      let div = document.getElementsByClassName('car' + i)[0]
      div.style.left = (g.arrays.cars[i].xpos - g.carWidth * g.tileDimension / 2) + 'px'
      div.style.top = (g.arrays.cars[i].ypos - g.carWidth * g.tileDimension / 2) + 'px'
      if (moveTowardsDestination(i)) {
        updateTileQueue(g.arrays.cars[i].route[0].id)
        g.arrays.cars[i].route.shift()
        if (g.arrays.cars[i].route.length > 1) {
          g.arrays.cars[i].xpos2 = g.arrays.tiles[g.arrays.map[g.arrays.cars[i].route[1].parent].tiles[g.arrays.cars[i].route[1].place]].xpos
          g.arrays.cars[i].ypos2 = g.arrays.tiles[g.arrays.map[g.arrays.cars[i].route[1].parent].tiles[g.arrays.cars[i].route[1].place]].ypos
        } else if (g.arrays.cars[i].route.length > 0) {
          g.arrays.cars[i].xpos2 = g.arrays.tiles[g.arrays.map[g.arrays.cars[i].route[0].parent].tiles[g.arrays.cars[i].route[0].place]].xpos
          g.arrays.cars[i].ypos2 = g.arrays.tiles[g.arrays.map[g.arrays.cars[i].route[0].parent].tiles[g.arrays.cars[i].route[0].place]].ypos
          if (g.arrays.cars[i].route[0].parent !== g.arrays.cars[i].home && Math.random() * 7 < 1) {
            setRoute(i, g.arrays.cars[i].route[0].parent, g.arrays.cars[i].home)
          } else {
            setRoute(i, g.arrays.cars[i].route[0].parent)
          }
        } else {
          console.log('something went wrong')
          setRoute(g.arrays.cars[i].home, i)
        }
        if (g.arrays.tiles[g.arrays.cars[i].route[0].id].car === -1) {
          g.arrays.tiles[g.arrays.cars[i].route[0].id].car = i
        } else {
          g.arrays.tiles[g.arrays.cars[i].route[0].id].queue.push(i)
        }
      }
    }
  }
}

function updateTileQueue (id) {
  if (g.arrays.tiles[id].queue.length > 0) {
    g.arrays.tiles[id].car = g.arrays.tiles[id].queue.shift()
  } else {
    g.arrays.tiles[id].car = -1
  }
}

function moveTowardsDestination (id) {
  let car = g.arrays.cars[id]
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  let ratio = car.speed / (h || 0.01)
  if (ratio > 0.5) {
    car.xpos = car.xpos2
    car.ypos = car.ypos2
    g.arrays.cars[id] = car
    return true
  }
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  g.arrays.cars[id] = car
  return false
}

function setRoute (id, home, toId) {
  let fromId = home
  if (!toId) {
    toId = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
    while (g.arrays.map[toId].nearbys.includes(home)) {
      toId = g.arrays.wk[Math.floor(Math.random() * g.arrays.wk.length)]
    }
  }

  let route = pathfinding.getRoute(fromId, toId)
  g.arrays.cars[id].xpos2 = g.arrays.tiles[g.arrays.map[route[1].parent].tiles[route[1].place]].xpos
  g.arrays.cars[id].ypos2 = g.arrays.tiles[g.arrays.map[route[1].parent].tiles[route[1].place]].ypos
  g.arrays.cars[id].route = route
  console.log('routeId',route[0].id)
  g.arrays.cars[id].tile = route[0].id
  if (route[0].id !== -1) {
    g.arrays.tiles[route[0].id].car = id
  }
}
