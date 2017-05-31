/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var g = __webpack_require__(1)

var pathfinding = __webpack_require__(3)
var getCarSprite = __webpack_require__(6)

module.exports = {
  moveCars,
  setRoute,
  getDirection,
  carXposToIsometric,
  carYposToIsometric
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
function moveCars () {
  g.arrays.cars.forEach((car, i) => {
    // only move the car if it is its turn on the desired tile
    let distanceToNext = getDistanceToNext(car)
    if (car.moving) {
      car.waiting = 0
      moveTowardsDestination(car, distanceToNext)
    }
    if (distanceToNext > 0.7) {
      let div = document.getElementsByClassName('car' + car.id)[0]
      div.src = './sprites/vehicles/' + getCarSprite(car, getDirection(car.tiles[0], car.route[0]))
      if (car.route[0].car === -1 || car.route[0].car.id === car.id) {
        whenNextTileIsClear(car)
      } else {
        if (car.moving) {
          car.moving = false
          car.speed = 0
          car.route[0].queue.push(car)
          if (car.tiles.length > 1) {
            updateTileQueue(car.tiles[1])
            car.tiles.pop()
          }
        }
      }
    }
    if (car.route.length < 1) {
      setRoute(car, car.tiles[0].parent, car.tiles[0])
    }
    if (car.speed === 0) {
      car.waiting++
      if (car.waiting === 150) {
        car.waiting = 0
        car.route[0].queue = car.route[0].queue.filter(x => x.id !== car.id)
        let oldRoute = car.route
        setRoute(car, car.tiles[0].parent, car.tiles[0])
        if (car.route[0].car === -1 || car.route[0].car.id === car.id) {
          let div = document.getElementsByClassName('car' + car.id)[0]
          div.src = './sprites/vehicles/' + getCarSprite(car, getDirection(car.tiles[0], car.route[0]))
          if (car.route[0].car === -1 || car.route[0].car.id === car.id) {
            whenNextTileIsClear(car)
          } else {
            car.route[0].queue.push(car)
          }
        } else {
          car.route = oldRoute
        }
      }
    }
  })
}

function whenNextTileIsClear (car) {
  car.tiles.unshift(car.route.shift())
  if (car.tiles.length > 2 && getDirection(car.tiles[1], car.tiles[0]) !== getDirection(car.tiles[2], car.tiles[1])) {
    car.speed /= 2
  }
  car.xpos2 = car.tiles[0].xpos
  car.ypos2 = car.tiles[0].ypos
  car.moving = true
  car.tiles[0].car = car
  if (car.tiles.length > 2) {
    if ((car.tiles[2].parent.type !== 'rd') && (car.tiles[1].parent.type === 'rd')) {
      car.speed = 0
    }
    updateTileQueue(car.tiles[2])
    car.tiles.pop()

  }
}

function updateTileQueue (tile) {
  if (tile.queue.length > 0) {
    let car = tile.queue.find(x => x.tiles[0].parent.id === tile.parent.id)
    if (!car) {
      car = tile.queue.shift()
    } else {
      tile.queue = tile.queue.filter(x => x.id !== car.id)
    }
    whenNextTileIsClear(car)
  } else {
    tile.car = -1
  }
}

function getDistanceToNext (car) {
  let h = Math.sqrt(Math.pow(car.xpos - car.xpos2, 2) + Math.pow(car.ypos - car.ypos2, 2))
  return (car.speed || car.acceleration) / (h || 0.001)
}

function moveTowardsDestination (car, ratio) {
  if (car.speed < car.maxSpeed) {
    car.speed += car.acceleration
  }
  if (ratio > 0.7) {
    car.xpos = car.xpos2
    car.ypos = car.ypos2
    let div = document.getElementsByClassName('car' + car.id)[0]
    div.style.left = carXposToIsometric(car.xpos, car.ypos) + 'px'
    div.style.top = carYposToIsometric(car.xpos, car.ypos) + 'px'
    div.style.zIndex = (Math.floor(car.xpos + 0.2) + Math.floor(car.ypos + 0.2)) * 100

    return
  }
  car.xpos += (car.xpos2 - car.xpos) * ratio
  car.ypos += (car.ypos2 - car.ypos) * ratio
  let div = document.getElementsByClassName('car' + car.id)[0]
  div.style.left = carXposToIsometric(car.xpos, car.ypos) + 'px'
  div.style.top = carYposToIsometric(car.xpos, car.ypos) + 'px'
  div.style.zIndex = (Math.floor(car.xpos + 0.2) + Math.floor(car.ypos + 0.2)) * 100
  if ((car.tiles[0].parent.type !== 'rd') || (car.tiles[1] && car.tiles[1].parent.type !== 'rd')) {
    div.style.visibility = 'hidden'
  } else {
    div.style.visibility = 'visible'
  }
}

function setRoute (car, from, fromTile) {
  let to = car.home
  if (fromTile.parent === car.home || Math.random() * 5 < 6) {
    to = getRandomBusiness(from)
  }
  car.route = pathfinding.getRoute(from, to, fromTile)
}

function getRandomBusiness (home) {
  const max = g.arrays.wk.length + g.arrays.hm.length
  let rand = Math.floor(Math.random() * max)
  let to = {}
  if (rand > g.arrays.wk.length) {
    to = g.arrays.hm[rand - g.arrays.wk.length]
  } else {
    to = g.arrays.hm[rand]
  }
  while (to.nearbys.find(x => x.id === home.id) || to.id === home.id) {
    rand = Math.floor(Math.random() * max)
    if (rand > g.arrays.wk.length) {
      to = g.arrays.hm[rand - g.arrays.wk.length]
    } else {
      to = g.arrays.hm[rand]
    }
  }
  return to
}

function carXposToIsometric (xpos, ypos) {
  return 66 * (18 + xpos - ypos) + 50
}

function carYposToIsometric (xpos, ypos) {
  return (xpos + ypos) * 33 + 18
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
  arrays: {map: [], rd: [], wk: [], hm: [], pk: [], cars: [], tiles: []},
  tileDimension: 10,
  border: 20,
  mapWidth: 28,
  mapHeight: 18,
  lanePosition: 0.05,
  carLength: 0.5,
  carWidth: 0.5
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = [
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_098.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_125.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_037.png', 'buildingTiles_065.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['hm', 'buildingTiles_037.png', 'buildingTiles_076.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_088.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_074.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_065.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_104.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_074.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['wk', 'buildingTiles_035.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_017.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_009.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_095.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'landscapeTiles_031.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_074.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_117.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_101.png', 'buildingTiles_102.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_034.png', 'buildingTiles_128.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_100.png', 'buildingTiles_110.png'],
  ['rd', 'cityTiles_056.png'],
  ['wk', 'buildingTiles_035.png', 'buildingTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_000.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_065.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_070.png'],
  ['rd', 'cityTiles_122.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_084.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_096.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_103.png'],
  ['rd', 'cityTiles_064.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_064.png'],
  ['rd', 'cityTiles_006.png'],
  ['rd', 'cityTiles_088.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['pk', 'landscapeTiles_071.png'],
  ['pk', 'landscapeTiles_086.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_125.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_076.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_074.png'],
  ['rd', 'cityTiles_081.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_100.png', 'buildingTiles_110.png'],
  ['rd', 'cityTiles_056.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_104.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_074.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_065.png'],
  ['hm', 'buildingTiles_042.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['wk', 'buildingTiles_003.png', 'buildingTiles_013.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_035.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_125.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['wk', 'buildingTiles_017.png', 'buildingTiles_126.png'],
  ['rd', 'cityTiles_056.png'],
  ['wk', 'buildingTiles_034.png', 'buildingTiles_128.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_104.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_104.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_088.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_095.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_088.png'],
  ['wk', 'buildingTiles_003.png', 'buildingTiles_013.png'],
  ['pk', 'cityTiles_067.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['pk', 'cityTiles_043.png'],
  ['wk', 'buildingTiles_113.png', 'buildingTiles_118.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['rd', 'cityTiles_095.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'landscapeTiles_031.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_088.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_076.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_070.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['wk', 'buildingTiles_009.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_109.png', 'buildingTiles_102.png'],
  ['wk', 'buildingTiles_115.png', 'buildingTiles_120.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_117.png', 'buildingTiles_127.png'],
  ['wk', 'buildingTiles_009.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['pk', 'landscapeTiles_071.png'],
  ['pk', 'landscapeTiles_086.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_070.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_125.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_076.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_065.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_084.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_103.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_064.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_103.png'],
  ['rd', 'cityTiles_071.png'],
  ['rd', 'cityTiles_064.png'],
  ['rd', 'cityTiles_088.png'],
  ['wk', 'buildingTiles_109.png', 'buildingTiles_127.png'],
  ['wk', 'buildingTiles_109.png', 'buildingTiles_128.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_084.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_096.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_096.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_088.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_098.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_109.png', 'buildingTiles_102.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['wk', 'buildingTiles_100.png', 'buildingTiles_110.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['wk', 'buildingTiles_107.png', 'buildingTiles_118.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_010.png', 'buildingTiles_013.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_050.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_079.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_096.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_098.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_112.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_125.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_112.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_027.png', 'buildingTiles_127.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_124.png', 'buildingTiles_120.png'],
  ['rd', 'cityTiles_112.png'],
  ['wk', 'buildingTiles_010.png', 'buildingTiles_013.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_009.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_112.png'],
  ['wk', 'buildingTiles_040.png', 'buildingTiles_005.png'],
  ['pk', 'landscapeTiles_071.png'],
  ['pk', 'landscapeTiles_086.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_065.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_078.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['rd', 'landscapeTiles_023.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_074.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_070.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_084.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_040.png', 'buildingTiles_005.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_071.png'],
  ['rd', 'landscapeTiles_023.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['rd', 'landscapeTiles_023.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_086.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_098.png'],
  ['rd', 'cityTiles_110.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_112.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_096.png'],
  ['rd', 'cityTiles_095.png'],
  ['rd', 'cityTiles_111.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_082.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['pk', 'landscapeTiles_071.png'],
  ['pk', 'landscapeTiles_072.png'],
  ['pk', 'landscapeTiles_086.png'],
  ['rd', 'cityTiles_000.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_107.png', 'buildingTiles_118.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_108.png', 'buildingTiles_102.png'],
  ['wk', 'buildingTiles_113.png', 'buildingTiles_118.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_074.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_104.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_076.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_088.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_074.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_065.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_088.png'],
  ['rd', 'cityTiles_000.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_040.png', 'buildingTiles_005.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_009.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_064.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_082.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_064.png'],
  ['rd', 'cityTiles_096.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_103.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_065.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_104.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_104.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_076.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_028.png', 'buildingTiles_005.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_123.png', 'buildingTiles_128.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_035.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_003.png', 'buildingTiles_013.png'],
  ['wk', 'buildingTiles_028.png', 'buildingTiles_005.png'],
  ['rd', 'cityTiles_081.png'],
  ['pk', 'cityTiles_067.png'],
  ['rd', 'cityTiles_116.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['wk', 'buildingTiles_100.png', 'buildingTiles_110.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_112.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_125.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['rd', 'cityTiles_056.png'],
  ['wk', 'buildingTiles_115.png', 'buildingTiles_120.png'],
  ['wk', 'buildingTiles_101.png', 'buildingTiles_102.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['wk', 'buildingTiles_018.png', 'buildingTiles_118.png'],
  ['wk', 'buildingTiles_010.png', 'buildingTiles_013.png'],
  ['rd', 'cityTiles_000.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_112.png'],
  ['rd', 'cityTiles_056.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_022.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_037.png', 'buildingTiles_076.png'],
  ['hm', 'buildingTiles_030.png', 'buildingTiles_104.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_026.png', 'buildingTiles_120.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_096.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_071.png'],
  ['pk', 'landscapeTiles_086.png'],
  ['wk', 'buildingTiles_009.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_103.png'],
  ['rd', 'cityTiles_064.png'],
  ['rd', 'cityTiles_125.png'],
  ['wk', 'buildingTiles_017.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_028.png', 'buildingTiles_005.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_090.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_096.png'],
  ['rd', 'cityTiles_095.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_125.png'],
  ['rd', 'cityTiles_103.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_069.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_070.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_014.png'],
  ['pk', 'landscapeTiles_064.png'],
  ['wk', 'buildingTiles_018.png', 'buildingTiles_118.png'],
  ['wk', 'buildingTiles_117.png', 'buildingTiles_127.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_027.png', 'buildingTiles_127.png'],
  ['wk', 'buildingTiles_012.png', 'buildingTiles_128.png'],
  ['rd', 'cityTiles_081.png'],
  ['wk', 'buildingTiles_018.png', 'buildingTiles_013.png'],
  ['wk', 'buildingTiles_101.png', 'buildingTiles_102.png'],
  ['rd', 'cityTiles_056.png'],
  ['wk', 'buildingTiles_108.png', 'buildingTiles_102.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_088.png'],
  ['hm', 'buildingTiles_014.png', 'buildingTiles_074.png'],
  ['hm', 'buildingTiles_036.png', 'buildingTiles_070.png'],
  ['rd', 'cityTiles_122.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_084.png'],
  ['rd', 'cityTiles_081.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_029.png', 'buildingTiles_084.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'landscapeTiles_031.png'],
  ['rd', 'cityTiles_106.png'],
  ['rd', 'cityTiles_071.png'],
  ['rd', 'cityTiles_126.png'],
  ['wk', 'buildingTiles_017.png', 'buildingTiles_126.png'],
  ['wk', 'buildingTiles_116.png', 'buildingTiles_120.png'],
  ['rd', 'cityTiles_124.png'],
  ['rd', 'cityTiles_071.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_103.png'],
  ['rd', 'cityTiles_071.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_073.png'],
  ['rd', 'cityTiles_126.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['hm', 'buildingTiles_085.png', 'buildingTiles_089.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['pk', 'landscapeTiles_067.png'],
  ['hm', 'buildingTiles_021.png', 'buildingTiles_098.png'],
  ['rd', 'cityTiles_081.png'],
]


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  getRoute,
  searchRoutes
}

var g = __webpack_require__(1)
var movement = __webpack_require__(0)

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = setupScripts

var g = __webpack_require__(1)

const pathfinding = __webpack_require__(3)
const movement = __webpack_require__(0)
const buildMap = __webpack_require__(5)

const streetArray = __webpack_require__(2)
function setupScripts () {
  // sets the frame rate - which also controls how fast everything travels
  window.frameRate(30)
  // determines how big the tiles can be for everything to fit on the screen
  g.tileDimension = setTileDimension()
  // adds all the map divs to the page
  buildMap()
  // builds all the arrays
  getArrays()
  // adds some cars
  g.arrays.hm.forEach((car, i) => i % 2 === 0 && setTimeout(() => createCar(car), Math.random() * 50000))

  console.log(g.arrays)
}

function setTileDimension () {
  // const maxTileHeight = Math.floor((window.innerHeight - 2 * g.border) / g.mapHeight)
  // const maxTileWidth = Math.floor((window.innerWidth - 2 * g.border) / g.mapWidth)
  // return Math.min(maxTileHeight, maxTileWidth)
  return 20
  // return Math.floor(Math.sqrt(33 * 33 + 66 * 66))
}

function forEachInStreetArray (func) {
  for (let i = 0; i < g.mapHeight; i++) {
    for (let j = 0; j < g.mapWidth; j++) {
      func(i * g.mapWidth + j, i, j)
    }
  }
}

function getArrays () {
  forEachInStreetArray((i, ypos, xpos) => {
    let newSquare = {xpos: xpos, ypos: ypos, id: i, type: streetArray[i][0]}
    g.arrays.map.push(newSquare)
    g.arrays[streetArray[i][0]].push(newSquare)
    let tile1 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.25), ypos: (ypos + 0.25), place: 0, parent: newSquare}
    g.arrays.tiles.push(tile1)
    let tile2 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.75), ypos: (ypos + 0.25), place: 1, parent: newSquare}
    g.arrays.tiles.push(tile2)
    let tile3 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.75), ypos: (ypos + 0.75), place: 2, parent: newSquare}
    g.arrays.tiles.push(tile3)
    let tile4 = {id: g.arrays.tiles.length, car: -1, queue: [], xpos: (xpos + 0.25), ypos: (ypos + 0.75), place: 3, parent: newSquare}
    g.arrays.tiles.push(tile4)
    newSquare.tiles = [tile1, tile2, tile3, tile4]
  })
  g.arrays.map.forEach((cell, i) => {
    cell.nearbys = g.arrays.map.filter(x => {
      return x.xpos === cell.xpos && (x.ypos === cell.ypos + 1 || x.ypos === cell.ypos - 1) || x.ypos === cell.ypos && (x.xpos === cell.xpos + 1 || x.xpos === cell.xpos - 1)
    })
  })
}

function createCar (home) {
  let car = {speed: 0, moving: true, maxSpeed: 0.06, acceleration: 0.0015, waiting: 0}
  car.home = home // g.arrays.hm[Math.floor(Math.random() * g.arrays.hm.length)]
  car.id = g.arrays.cars.length
  car.tiles = []
  car.color = Math.floor(Math.random() * 12)
  car.direction = 0
  g.arrays.cars.push(car)
  drawCar(car)
  movement.setRoute(car, car.home, car.home.tiles[0])
  car.tiles.unshift(car.route.shift())
  car.tiles.unshift(car.route.shift())
  car.tiles[0].car = car
  car.tiles[1].car = car
  car.xpos = car.tiles[1].xpos
  car.ypos = car.tiles[1].ypos
  car.xpos2 = car.tiles[0].xpos
  car.ypos2 = car.tiles[0].ypos
}
function drawCar (car) {
  let img = document.createElement('img')
  img.src = './sprites/vehicles/carBlue3_010.png'
  img.style.position = 'absolute'
  img.classList.add('car')
  img.classList.add('car' + car.id)
  document.getElementById('main').appendChild(img)
  img.onload = function () {
    img.style.left = movement.carXposToIsometric(car.xpos, car.ypos) + 'px'
    img.style.top = movement.carYposToIsometric(car.xpos, car.ypos) + 'px'
    img.style.zIndex = car.ypos + car.ypos + 5
  }
}

function drawExampleCar () {
  let img = document.createElement('img')
  img.src = './sprites/vehicles/carBlue3_010.png'
  img.style.position = 'absolute'
  document.getElementById('main').appendChild(img)
  img.onload = function () {
    img.style.left = movement.carXposToIsometric(0, 0) + 'px'
    img.style.top = movement.carYposToIsometric(0, 0) + 'px'
  }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = buildMap

const data = __webpack_require__(2)

function buildMap () {
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 28; j++) {
      if (data[i * 28 + j][1]) {
        let img = document.createElement('img')
        img.src = './sprites/' + data[i * 28 + j][1]
        img.style.position = 'absolute'
        img.classList.add('id' + (i * 28 + j))
        img.classList.add('tile')
        document.getElementById('main').appendChild(img)
        img.onload = function () { moveImage(img, j, i, 0) }
      }
      let h = 2
      while (data[i * 28 + j][h]) {
        let img = document.createElement('img')
        img.src = './sprites/' + data[i * 28 + j][h]
        img.style.position = 'absolute'
        img.classList.add('id' + i)
        img.classList.add('tile')
        document.getElementById('main').appendChild(img)
        img.onload = () => { moveImage(img, j, i, h - 1) }
        h++
      }
    }
  }
}

function moveImage (img, xpos, ypos, zpos) {
  img.style.left = xToIso(xpos, ypos, img.width, zpos) + 'px'
  img.style.top = yToIso(xpos, ypos, img.height, zpos) + 'px'
  img.style.zIndex = (ypos + xpos) * 100
}

function xToIso (xpos, ypos, imgWidth, zpos) {
  let offset = 0
  if (zpos > 0) {
    offset = 17
  }
  return 66 * (18 + xpos - ypos) + offset
}

function yToIso (xpos, ypos, imgHeight, zpos) {
  let zoffset = 0
  if (zpos === 2) {
    zoffset = -72
  }
  return (xpos + ypos + 4) * 33 - imgHeight + zoffset
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = getCarSprite

function getCarSprite (car, direction) {
  switch (car.color) {
    case 0:
      switch (direction) {
        case 0: return 'taxi_NE.png'
        case 1: return 'taxi_SE.png'
        case 2: return 'taxi_SW.png'
        case 3: return 'taxi_NW.png'
      }
      break
    case 1:
      switch (direction) {
        case 0: return 'carRed1_004.png'
        case 1: return 'carRed1_009.png'
        case 2: return 'carRed1_008.png'
        case 3: return 'carRed1_002.png'
      }
      break
    case 2:
      switch (direction) {
        case 0: return 'ambulance_NE.png'
        case 1: return 'ambulance_SE.png'
        case 2: return 'ambulance_SW.png'
        case 3: return 'ambulance_NW.png'
      }
      break
    case 3:
      switch (direction) {
        case 0: return 'garbage_NE.png'
        case 1: return 'garbage_SE.png'
        case 2: return 'garbage_SW.png'
        case 3: return 'garbage_NW.png'
      }
      break
    case 4:
      switch (direction) {
        case 0: return 'police_NE.png'
        case 1: return 'police_SE.png'
        case 2: return 'police_SW.png'
        case 3: return 'police_NW.png'
      }
      break
    case 5:
      switch (direction) {
        case 0: return 'carGreen4_006.png'
        case 1: return 'carGreen4_011.png'
        case 2: return 'carGreen4_010.png'
        case 3: return 'carGreen4_004.png'
      }
      break
    case 6:
      switch (direction) {
        case 0: return 'carRed2_003.png'
        case 1: return 'carRed2_008.png'
        case 2: return 'carRed2_007.png'
        case 3: return 'carRed2_001.png'
      }
      break
    case 7:
      switch (direction) {
        case 0: return 'carSilver5_006.png'
        case 1: return 'carSilver5_011.png'
        case 2: return 'carSilver5_010.png'
        case 3: return 'carSilver5_004.png'
      }
      break
    case 8:
      switch (direction) {
        case 0: return 'carSilver6_003.png'
        case 1: return 'carSilver6_008.png'
        case 2: return 'carSilver6_007.png'
        case 3: return 'carSilver6_001.png'
      }
      break
    default:
      switch (direction) {
        case 0: return 'carBlue3_006.png'
        case 1: return 'carBlue3_011.png'
        case 2: return 'carBlue3_010.png'
        case 3: return 'carBlue3_004.png'
      }
      break
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


const runStartingScripts = __webpack_require__(4)
const movement = __webpack_require__(0)

function setup () {
  console.log('hi')
  runStartingScripts()
}

function draw () {
  movement.moveCars()
}

window.setup = setup
window.draw = draw


/***/ })
/******/ ]);