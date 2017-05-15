const rawMap = require('./map.js')

var g = {}
g.arrays = {map: [], rd: [], wk: [], hm: [], pk: [], rv: [], rl: [], cars: [], tiles: []}
g.tileDimension = 10
g.border = 20
g.mapWidth = 28
g.mapHeight = 16
g.lanePosition = 0.05
g.carLength = 0.5
g.carWidth = 0.5
g.streetArray = rawMap

module.exports = g
