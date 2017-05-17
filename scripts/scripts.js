
const g = require('./global.js')
const runStartingScripts = require('./starting.js')
const pathfinding = require('./pathfinding.js')
const movement = require('./movement.js')

function setup () {
  console.log('hi')
  runStartingScripts()
}

function draw () {
  movement.moveCars()
}

window.setup = setup
window.draw = draw
