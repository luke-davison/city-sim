module.exports = {
  getRoute,
  searchRoutes
}

var g = require('./global.js')
var movement = require('./movement.js')

function getRoute(from, to, fromTile) {
  let route = searchRoutes(from, [to.id], [
    [{
      tile: to
    }]
  ])
  let direc = movement.getDirection(route[0], route[1])

  let tileRoute = []
  let exitTile = getExitTile(route[0], route[1], fromTile)
  if (typeof exitTile === 'object') {
    let tiles = route[0].tiles.map(x => x.place)
    tiles = tiles.sort((a, b) => {
      let a1 = a - exitTile.place
      let b1 = b - exitTile.place
      if (a1 < 0) {
        a1 += 4
      }
      if (b1 < 0) {
        b1 += 4
      }
      return a1 - b1
    })
    for (let i = 1; i < tiles.length; i++) {
      if (route[0].tiles.find(x => x.place === tiles[i]).id !== fromTile.id) {
        tiles.splice(i, 1)
        i--
      } else {
        tiles.splice(i, 1)
        i = tiles.length
      }
    }
    tiles.push(tiles.shift())
    for (let i = 0; i < tiles.length; i++) {
      tileRoute.push(route[0].tiles.find(x => x.place === tiles[i]))
    }
  }
  for (let i = 1; i < route.length - 1; i++) {
    let entranceTile = getEntranceTile(route[i - 1], route[i])
    typeof entranceTile === 'object' && tileRoute.push(entranceTile)
    let thirdTile = getThirdTile(route[i - 1], route[i], route[i + 1])
    typeof thirdTile === 'object' && tileRoute.push(thirdTile)

    let exitTile = getExitTile(route[i], route[i + 1], entranceTile)
    typeof exitTile === 'object' && tileRoute.push(exitTile)
  }
  let entranceTile = getEntranceTile(route[route.length - 2], route[route.length - 1])
  typeof entranceTile === 'object' && tileRoute.push(entranceTile)
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

function getExitTile(from, to, entranceTile) {
  let answer = movement.getDirection(from, to)
  if (from.tiles[answer].id !== entranceTile.id) {
    return from.tiles[answer]
  }
}

function getEntranceTile(from, to) {
  let answer = movement.getDirection(from, to) - 1
  if (answer < 0) {
    answer += 4
  }
  return to.tiles[answer]
}

function getThirdTile(from, current, to) {
  const fromDirection = movement.getDirection(from, current)
  const toDirection = movement.getDirection(current, to)
  if (toDirection === fromDirection + 1 || (toDirection === 0 && fromDirection === 3)) {
    return current.tiles[fromDirection]
  }
}

function searchRoutes(finalTile, previousTiles, searchTree) {
  // the number of steps away from the start
  const step = searchTree.length - 1
  // Adds a new array for the roads the next step array
  searchTree.push([])
  // for each road in the search tree at the step level
  for (let i = 0; i < searchTree[step].length; i++) {
    let nextTile = searchTree[step][i]
    if (!endTileFound(nextTile, finalTile)) {
      // If none of the nearby spaces were the final destination
      let nearbys = nextTile.tile.nearbys
      // Filter out all non-roads
      nearbys = nearbys.filter(x => x.type === 'rd')
      // Filter out all tiles that have previously been found
      nearbys = nearbys.filter(x => !previousTiles.includes(x.id))
      // Add each nearby road to the list of previous tiles
      nearbys.forEach(road => previousTiles.push(road.id))
      // Add each road to the search tree at the next step
      nearbys.forEach(x => {
        searchTree[step + 1].push({
          tile: x,
          prevTile: nextTile.tile
        })
      })
    } else {
      // If at least one space nearby is the final destination
      // Create a new array to store the route from start to finish
      let route = [{
        tile: finalTile,
        prevTile: nextTile.tile
      }]
      // for each step already taken to find the destination
      for (let j = searchTree.length - 1; j > 0; j--) {
        const nextTile = searchTree[j - 1].find(x => x.tile.id === route[route.length - 1].prevTile.id) // find the next step..
        route.push(nextTile) // ...and store that in the route
      }
      route = route.map(x => x.tile)
      return route // Returns the full route as an array of ids
    }
  }
  return searchRoutes(finalTile, previousTiles, searchTree) // rerun the function until the route has been found

  function endTileFound(nextTile, finalTile) {
    return nextTile.tile.nearbys.find(x => x.id === finalTile.id)
  }

}
