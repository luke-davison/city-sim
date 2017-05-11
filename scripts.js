let streetArray = [
  ['rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd'],
  ['rd', 'wk', 'wk', 'wk', 'hm', 'wk', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'hm', 'pk', 'rv', 'pk', 'pk', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm'],
  ['rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'hm', 'wk', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'rd', 'hm', 'pk', 'pk'],
  ['rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'hm', 'hm', 'rd', 'hm', 'pk', 'pk'],
  ['rd', 'wk', 'hm', 'wk', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'hm', 'wk', 'rd', 'hm', 'hm', 'rd', 'wk', 'hm', 'rd', 'hm', 'pk', 'pk'],
  ['rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm'],
  ['rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd'],
  ['hm', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'rv', 'rv', 'rv', 'pk', 'pk', 'hm', 'pk', 'pk', 'hm', 'hm', 'hm', 'hm', 'wk', 'hm', 'rd'],
  ['rl', 'rl', 'rl', 'rx', 'rl', 'rl', 'rl', 'rl', 'rl', 'rx', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rl', 'rd'],
  ['rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'rv', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd'],
  ['rd', 'wk', 'hm', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'wk', 'rd', 'hm', 'hm', 'hm', 'hm', 'wk', 'hm', 'hm', 'hm', 'hm'],
  ['rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'hm', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm', 'hm'],
  ['rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'hm', 'hm', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd'],
  ['rd', 'wk', 'wk', 'rd', 'hm', 'wk', 'wk', 'wk', 'wk', 'rd', 'hm', 'pk', 'rv', 'pk', 'pk', 'hm', 'pk', 'hm', 'rd', 'hm', 'wk', 'rd', 'hm', 'hm', 'hm', 'hm', 'hm', 'rd'],
  ['rd', 'wk', 'wk', 'rd', 'wk', 'wk', 'wk', 'wk', 'wk', 'rd', 'wk', 'pk', 'rv', 'pk', 'pk', 'hm', 'hm', 'hm', 'rd', 'hm', 'hm', 'rd', 'hm', 'hm', 'hm', 'pk', 'hm', 'rd'],
  ['rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'rd', 'wk', 'pk', 'rv', 'pk', 'hm', 'rd', 'rd', 'rd', 'rd', 'hm', 'hm', 'rd', 'rd', 'rd', 'rd', 'hm', 'hm', 'rd']
]

let tileDimension = 10
const border = 20
const mapWidth = 28
const mapHeight = 16
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

function setup () {
  frameRate(10)
  tileDimension = setTileDimension()
  drawMap()
}

function setTileDimension () {
  const maxTileHeight = Math.floor((screenHeight - 2 * border) / mapHeight)
  const maxTileWidth = Math.floor((screenWidth - 2 * border) / mapWidth)
  return Math.min(maxTileHeight, maxTileWidth)
}

function drawMap () {
  for (let i = 0; i < streetArray.length; i++) {
    for (let j = 0; j < streetArray[i].length; j++) {
      var div = document.createElement('div')
      div.style.width = tileDimension + 'px'
      div.style.height = tileDimension + 'px'
      div.style.left = (j * tileDimension + border) + 'px'
      div.style.top = (i * tileDimension + border) + 'px'
      div.style.position = 'absolute'
      div.classList.add(streetArray[i][j])
      div.classList.add('tile')
      document.getElementById('main').appendChild(div)
    }
  }
}

function draw () {

}
