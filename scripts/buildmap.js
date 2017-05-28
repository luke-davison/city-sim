module.exports = buildMap

const data = require('./map.js')

function buildMap () {
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 28; j++) {
      if (data[i * 28 + j][1]) {
        let img = document.createElement('img')
        img.src = './sprites/' + data[i * 28 + j][1]
        img.style.position = 'absolute'
        img.classList.add('id' + i)
        img.classList.add('tile')
        document.getElementById('main').appendChild(img)
        img.onload = function () { moveImage(img, j, i, 0) }
      }
      let k = 2
      while (data[i * 28 + j][k]) {
        let img = document.createElement('img')
        img.src = './sprites/' + data[i * 28 + j][k]
        img.style.position = 'absolute'
        img.classList.add('id' + i)
        img.classList.add('tile')
        document.getElementById('main').appendChild(img)
        img.onload = function () { moveImage(img, j, i, k - 1) }
        k++
      }
    }
  }
}

function moveImage (img, xpos, ypos, zpos) {
  img.style.left = xToIso(xpos, ypos, img.width, zpos) + 'px'
  img.style.top = yToIso(xpos, ypos, img.height, zpos) + 'px'
}

function xToIso (xpos, ypos, imgWidth, zpos) {
  let offset = 0
  if (zpos > 0) {
    offset = 17
  }
  return 66 * (18 + xpos - ypos) + offset
}

function yToIso (xpos, ypos, imgHeight, zpos) {
  let offset = 0
  if (zpos > 0) {
    offset = -72
  }
  return (xpos + ypos + 2) * 33 - imgHeight + offset
}
