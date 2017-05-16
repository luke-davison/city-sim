module.exports = {
  getRoute,
  searchRoutes
}

var g = require('./global.js')
var movement = require('./movement.js')

function getRoute (fromId, toId) {
  let route = searchRoutes(fromId, [toId], [[{id: toId}]])
  let direc = movement.getDirection(route[0], route[1])
  let tileRoute = []
  if (direc == 0) {
    tileRoute.push({parent: route[0], place: 4, id: 3})
  } else {
    tileRoute.push({parent: route[0], place: 4, id: direc - 1})
  }
  tileRoute.push({parent: route[0], place: direc, id: getTileId(route[0], direc)})

  for (let i = 1; i < route.length - 1; i++) {
    tileRoute = getEntranceTile(tileRoute, route[i - 1], route[i])
    tileRoute = getThirdTile(tileRoute, route[i - 1], route[i], route[i + 1])
    tileRoute = getExitTile(tileRoute, route[i], route[i + 1])
  }
  return tileRoute
}

function getExitTile (arr, id, toId) {
  let answer = movement.getDirection(id, toId)
  arr.push({parent: id, place: answer, id: getTileId(id, answer)})
  return arr
}

function getEntranceTile (arr, fromId, id) {
  let answer = movement.getDirection(fromId, id) - 1
  if (answer < 0) {
    answer += 4
  }
  arr.push({parent: id, place: answer, id: getTileId(id, answer)})
  return arr
}

function getThirdTile (arr, fromId, id, toId) {
  const fromDirection = movement.getDirection(fromId, id)
  const toDirection = movement.getDirection(id, toId)
  if (toDirection === fromDirection + 1 || (toDirection === 0 && fromDirection === 3)) {
    arr.push({parent: id, place: fromDirection, id: getTileId(id, fromDirection)})
  }
  return arr
}

function getTileId (parentId, place) {
  let answer = g.arrays.tiles.find(x => x.parent === parentId && x.place === place)
  return answer.id
}

function searchRoutes (end, list, tree) {
  const step = tree.length - 1 // the number of steps away from the start
  tree.push([]) // Adds a new array for the roads the next step array
  for (let i = 0; i < tree[step].length; i++) { // for each road that is the current number of steps away
    let branch = tree[step][i]
    let nearbys = g.arrays.map[branch.id].nearbys // the spaces nearby the road
    if (nearbys.indexOf(end) !== -1) { // if one of these spaces is the end
      let route = [{id: end, prevId: branch.id}] // Creates a new array to store the route from start to finish
      for (let j = tree.length - 1; j > 0; j--) { // for each step already taken
        const nextBranch = tree[j - 1].find(x => x.id === route[route.length - 1].prevId) // find the next step..
        route.push(nextBranch) // ...and store that in the route
      }
      route = route.map(x => x.id)
      return route // Returns the full route as an array of ids
    } else { // If none of the nearby spaces were the final destination
      nearbys = nearbys.filter(x => {
        return !list.includes(x) && g.arrays.map[x].type === 'rd' // filter out all the spaces that are not roads
      })
      nearbys.forEach(id => { // for each space not filtered out
        list.push(id)
        tree[step + 1].push({id: id, prevId: branch.id}) // add it to the array for the next step in the tree
      })
    }
  }
  return searchRoutes(end, list, tree) // rerun the function until the route has been found
}


/* function drawRoute (fromId, toId) {
  const arr = getRoute(fromId, toId)
  arr.forEach(id => {
    let div = document.createElement('div')
    div.style.width = (g.tileDimension / 2) + 'px'
    div.style.height = (g.tileDimension / 2) + 'px'
    div.style.left = (g.arrays.map[id].xpos * g.tileDimension + g.border + g.tileDimension / 4) + 'px'
    div.style.top = (g.arrays.map[id].ypos * g.tileDimension + g.border + g.tileDimension / 4) + 'px'
    div.style['background-color'] = 'black'
    div.style.position = 'absolute'
    document.getElementById('main').appendChild(div)
  })
} */
