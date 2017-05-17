module.exports = {
  getRoute,
  searchRoutes
}

var g = require('./global.js')
var movement = require('./movement.js')

function getRoute (from, to) {
  let route = searchRoutes(from, [to.id], [[{branch: to}]])
  let direc = movement.getDirection(route[0], route[1])

  let tileRoute = []
  if (direc === 0) {
    tileRoute.push(route[0].tiles[3])
  } else {
    tileRoute.push(route[0].tiles[direc - 1])
  }
  tileRoute.push(route[0].tiles[direc])
  for (let i = 1; i < route.length - 1; i++) {
    tileRoute = getEntranceTile(tileRoute, route[i - 1], route[i])
    tileRoute = getThirdTile(tileRoute, route[i - 1], route[i], route[i + 1])
    tileRoute = getExitTile(tileRoute, route[i], route[i + 1])
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

function getExitTile (arr, from, to) {
  let answer = movement.getDirection(from, to)
  arr.push(from.tiles[answer])
  return arr
}

function getEntranceTile (arr, from, to) {
  let answer = movement.getDirection(from, to) - 1
  if (answer < 0) {
    answer += 4
  }
  arr.push(to.tiles[answer])
  return arr
}

function getThirdTile (arr, from, current, to) {
  const fromDirection = movement.getDirection(from, current)
  const toDirection = movement.getDirection(current, to)
  if (toDirection === fromDirection + 1 || (toDirection === 0 && fromDirection === 3)) {
    arr.push(current.tiles[fromDirection])
  }
  return arr
}
var counter = 0
function searchRoutes (endBranch, list, tree) {
  counter ++
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
  //if (counter < 500) {
    return searchRoutes(endBranch, list, tree) // rerun the function until the route has been found
  //} else {
  //  return
  //}
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
