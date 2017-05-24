module.exports = {
  getRoute,
  searchRoutes
}

var g = require('./global.js')
var movement = require('./movement.js')

function getRoute (from, to, fromTile) {
  let route = searchRoutes(from, [to.id], [[{branch: to}]])

  let tileRoute = getTileRoute(route, fromTile)

  let routeDirections = getRouteDirections(route, fromTile)
  return tileRoute
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

function searchRoutes (endBranch, list, tree) {
  const step = tree.length - 1 // the number of steps away from the start
  tree.push([]) // Adds a new array for the roads the next step array
  for (let i = 0; i < tree[step].length; i++) { // for each road that is the current number of steps away
    let square = tree[step][i]
    if (square.branch.nearbys.find(x => x.id === endBranch.id)) { // if one of these spaces is the end
      let route = [{branch: endBranch, prevBranch: square.branch}] // Creates a new array to store the route from start to finish
      for (let j = tree.length - 1; j > 0; j--) { // for each step already taken
        const nextBranch = tree[j - 1].find(x => x.branch.id === route[route.length - 1].prevBranch.id) // find the next step..
        route.push(nextBranch) // ...and store that in the route
      }
      route = route.map(x => x.branch)
      return route // Returns the full route as an array of ids
    } else { // If none of the nearby spaces were the final destination
      let nearbys = square.branch.nearbys.filter(x => {
        return !list.includes(x.id) && x.type === 'rd' // filter out all the spaces that are not roads
      })
      nearbys.forEach(x => { // for each space not filtered out
        list.push(x.id)
        tree[step + 1].push({branch: x, prevBranch: square.branch}) // add it to the array for the next step in the tree
      })
    }
  }
  return searchRoutes(endBranch, list, tree) // rerun the function until the route has been found
}

function getTileRoute (route, fromTile) {
  let tileRoute = [fromTile]
  for (let i = 1; i < route.length - 1; i++) {
    tileRoute = getEntranceTile(tileRoute, route[i - 1], route[i])
    let entranceTile = tileRoute[tileRoute.length - 1]
    tileRoute = getThirdTile(tileRoute, route[i - 1], route[i], route[i + 1])
    tileRoute = getExitTile(tileRoute, route[i], route[i + 1], entranceTile)
  }
  tileRoute = getEntranceTile(tileRoute, route[route.length - 2], route[route.length - 1])
  let j = tileRoute[tileRoute.length - 1].place
  for (let i = 0; i < 3; i++) {
    if (j === 3) {
      j = 0
    } else {
      j++
    }
    tileRoute.push(tileRoute[tileRoute.length - 1].parent.tiles[j])
  }
  return tileRoute
}

function getExitTile (arr, from, to, entranceTile) {
  let answer = getDirection(from, to)
  if (from.tiles[answer].id !== entranceTile.id) {
    arr.push(from.tiles[answer])
  }
  return arr
}

function getEntranceTile (arr, from, to) {
  let answer = getDirection(from, to) - 1
  if (answer < 0) {
    answer += 4
  }
  arr.push(to.tiles[answer])
  return arr
}

function getThirdTile (arr, from, current, to) {
  const fromDirection = getDirection(from, current)
  const toDirection = getDirection(current, to)
  if (toDirection === fromDirection + 1 || (toDirection === 0 && fromDirection === 3)) {
    arr.push(current.tiles[fromDirection])
  }
  return arr
}

function getRouteDirections (route, fromTile) {
  let directions = [0]
  let prevTile = fromTile
  let prevDirection = 0
  let newDirection = 0
  route.forEach((tile, i) => {
    newDirection = getDirection(prevTile, tile)
    if (i === 0) {
      prevDirection = newDirection
    }
    let directionChange = newDirection - prevDirection
    if (directionChange === -3) {
      directionChange = 1
    }
    if (directionChange === 3) {
      directionChange = -1
    }
    directions.push(directionChange)
  })
  return directions
}
