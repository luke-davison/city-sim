let streetArray = [
  'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd',
  'rd', 'wk', 'wk', 'wk', 'hm', 'wk', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'hm', 'pk', 'rv', 'pk', 'pk', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm',
  'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'hm', 'wk', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'pk', 'hm', 'rd', 'hm', 'pk', 'pk',
  'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'hm', 'hm', 'rd', 'hm', 'pk', 'pk',
  'rd', 'wk', 'hm', 'wk', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'hm', 'wk', 'rd', 'hm', 'hm', 'rd', 'wk', 'hm', 'rd', 'hm', 'pk', 'pk',
  'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm',
  'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd',
  'hm', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'rv', 'rv', 'rv', 'pk', 'pk', 'hm', 'pk', 'pk', 'hm', 'hm', 'hm', 'hm', 'wk', 'hm', 'rd',
  'rl', 'rl', 'rl', 'rd', 'rl', 'rl', 'rl', 'rl', 'rl', 'rd', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rd',
  'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'rv', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd',
  'rd', 'wk', 'hm', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'wk', 'rd', 'hm', 'hm', 'hm', 'hm', 'wk', 'hm', 'hm', 'hm', 'hm',
  'rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'hm', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm',
  'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd',
  'rd', 'wk', 'wk', 'rd', 'hm', 'wk', 'wk', 'wk', 'wk', 'rd', 'hm', 'pk', 'rv', 'pk', 'pk', 'hm', 'pk', 'hm', 'rd', 'hm', 'wk', 'rd', 'hm', 'hm', 'hm', 'hm', 'hm', 'rd',
  'rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'pk', 'hm', 'hm', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm', 'pk', 'hm', 'rd',
  'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'rd', 'rd', 'rd', 'hm', 'hm', 'rd', 'rd', 'rd', 'rd', 'hm', 'hm', 'rd'
]
let arrays = {map: [], rd: [], wk: [], hm: [], pk: [], rv: [], rl: [], cars: []}

let tileDimension = 10
const border = 20
const mapWidth = 28
const mapHeight = 16
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
let lanePosition = 0.05
let carLength = 0.5
let carWidth = 0.5

function setup () {
  frameRate(30)
  tileDimension = setTileDimension()
  drawMap()
  getArrays()
  for (let i = 0; i < 20; i++) {
    createCar()
  }
}

function setTileDimension () {
  const maxTileHeight = Math.floor((screenHeight - 2 * border) / mapHeight)
  const maxTileWidth = Math.floor((screenWidth - 2 * border) / mapWidth)
  return Math.min(maxTileHeight, maxTileWidth)
}

function forEachInStreetArray(func) {
  for (let i = 0; i < mapHeight; i++) {
    for (let j = 0; j < mapWidth; j++) {
      func(i * mapWidth + j, i, j)
    }
  }
}

function drawMap () {
  forEachInStreetArray((i, ypos, xpos) => {
    let div = document.createElement('div')
    div.style.width = tileDimension + 'px'
    div.style.height = tileDimension + 'px'
    div.style.left = (xpos * tileDimension + border) + 'px'
    div.style.top = (ypos * tileDimension + border) + 'px'
    div.style.position = 'absolute'
    div.classList.add(streetArray[i])
    div.classList.add('id' + i)
    div.classList.add('tile')
    document.getElementById('main').appendChild(div)
  })
}

function getArrays () {
  forEachInStreetArray((i, ypos, xpos) => {
    arrays.map.push({xpos: xpos, ypos: ypos, id: i, type: streetArray[i]})
    arrays[streetArray[i]].push(i)
  })
  arrays.map.forEach((cell, i) => {
    let nearbys = arrays.map.filter(x => {
      return x.xpos === cell.xpos && (x.ypos === cell.ypos + 1 || x.ypos === cell.ypos - 1) || x.ypos === cell.ypos && (x.xpos === cell.xpos + 1 || x.xpos === cell.xpos - 1)
    })
    arrays.map[i].nearbys = nearbys.map(x => x.id)
  })
}
var routeCount = 0
function getRoute (fromId, toId) {
  routeCount = 0
  return searchRoutes(fromId, [toId], [[{id: toId}]])
}

function searchRoutes (end, list, tree) {
  routeCount++
  const step = tree.length - 1 // the number of steps away from the start
  tree.push([]) // Adds a new array for the roads the next step array
  for (let i = 0; i < tree[step].length; i++) { // for each road that is the current number of steps away
    let branch = tree[step][i]
    let nearbys = arrays.map[branch.id].nearbys // the spaces nearby the road
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
        return !list.includes(x) && arrays.map[x].type === 'rd' // filter out all the spaces that are not roads
      })
      nearbys.forEach(id => { // for each space not filtered out
        list.push(id)
        tree[step + 1].push({id: id, prevId: branch.id}) // add it to the array for the next step in the tree
      })
    }
  }
  return searchRoutes(end, list, tree) // rerun the function until the route has been found
}

function drawRoute (fromId, toId) {
  const arr = getRoute(fromId, toId)
  arr.forEach(id => {
    let div = document.createElement('div')
    div.style.width = (tileDimension / 2) + 'px'
    div.style.height = (tileDimension / 2) + 'px'
    div.style.left = (arrays.map[id].xpos * tileDimension + border + tileDimension / 4) + 'px'
    div.style.top = (arrays.map[id].ypos * tileDimension + border + tileDimension / 4) + 'px'
    div.style['background-color'] = 'black'
    div.style.position = 'absolute'
    document.getElementById('main').appendChild(div)
  })
}

function drawCar (xpos, ypos, id) {
  let div = document.createElement('div')
  div.style.width = Math.floor(tileDimension * carWidth) + 'px'
  div.style.height = Math.floor(tileDimension * carLength) + 'px'
  div.style.left = (xpos * tileDimension + border) + 'px'
  div.style.top = (ypos * tileDimension + border) + 'px'
  div.style['background-color'] = 'black'
  div.style.position = 'absolute'
  div.classList.add('car')
  div.classList.add('car' + id)
  document.getElementById('main').appendChild(div)
}

function createCar (fromId) {
  let speed = 0.2
  let home = arrays.hm[Math.floor(Math.random() * arrays.hm.length)]
  let xpos = arrays.map[home].xpos + 0.5 - carWidth
  let ypos = arrays.map[home].ypos + 0.5 - carLength
  arrays.cars.push({moving: true, speed: speed, home: home, xpos: xpos, ypos: ypos})
  drawCar(xpos, ypos, arrays.cars.length - 1)
  setRoute(arrays.cars.length - 1, home)
}

function setRoute (id, home, toId) {
  let fromId = home
  if (!toId) {
    toId = arrays.wk[Math.floor(Math.random() * arrays.wk.length)]
  }
  let route = getRoute(fromId, toId)
  while (route.length < 3) {
    toId = arrays.wk[Math.floor(Math.random() * arrays.wk.length)]
    route = getRoute(fromId, toId)
  }
  let destination = getPosition(route[1], route[2])
  arrays.cars[id].xpos2 = destination.xpos
  arrays.cars[id].ypos2 = destination.ypos
  arrays.cars[id].route = route
}

function getPosition (posOne, posTwo) {
  const direction = getDirection(posOne, posTwo)
  switch (direction) {
    case 0: return {xpos: arrays.map[posOne].xpos + lanePosition, ypos: arrays.map[posOne].ypos}
    case 1: return {xpos: arrays.map[posOne].xpos + 1 - carLength, ypos: arrays.map[posOne].ypos + lanePosition}
    case 2: return {xpos: arrays.map[posOne].xpos + 1 - lanePosition - carWidth, ypos: arrays.map[posOne].ypos + 1 - carLength}
    case 3: return {xpos: arrays.map[posOne].xpos, ypos: arrays.map[posOne].ypos + 1 - lanePosition - carWidth}
  }
}

function getDirection (posOne, posTwo) {
  // 0 up, 1 left, 2 down, 3 right
  if (arrays.map[posOne].xpos > arrays.map[posTwo].xpos) {
    return 3
  } else if (arrays.map[posOne].xpos < arrays.map[posTwo].xpos) {
    return 1
  } else if (arrays.map[posOne].ypos < arrays.map[posTwo].ypos) {
    return 2
  }
  return 0
}
let counter = 0
function draw () {
  moveCars()
}
function moveCars () {
  for (let i = 0; i < arrays.cars.length; i++) {
    if (arrays.cars[i].moving) {
      let div = document.getElementsByClassName('car' + i)[0]
      div.style.left = (arrays.cars[i].xpos * tileDimension + border) + 'px'
      div.style.top = (arrays.cars[i].ypos * tileDimension + border) + 'px'
      if (moveTowardsDestination(i)) {
        arrays.cars[i].route.shift()
        if (arrays.cars[i].route.length > 1) {
          let newDestination = getPosition(arrays.cars[i].route[0], arrays.cars[i].route[1])
          arrays.cars[i].xpos2 = newDestination.xpos
          arrays.cars[i].ypos2 = newDestination.ypos
        } else if (arrays.cars[i].route.length > 0) {
          let newDestination = arrays.cars[i].xpos2 = getPosition(arrays.cars[i].route[0], arrays.cars[i].route[0])
          arrays.cars[i].xpos2 = newDestination.xpos
          arrays.cars[i].ypos2 = newDestination.ypos
          if (arrays.cars[i].route[0] !== arrays.cars[i].home && Math.random() * 4 < 1) {
            setRoute(i, arrays.cars[i].route[0], arrays.cars[i].home)
          } else {
            setRoute(i, arrays.cars[i].route[0])
          }
        } else {
          console.log('something went wrong')
          setRoute(arrays.cars[i].home, i)
        }
      }
    }
  }
}
function moveTowardsDestination (id) {
  let car = arrays.cars[id]
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  let ratio = car.speed / h
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  arrays.cars[id] = car
  if (ratio > 0.5) {
    return true
  }
  return false
}
