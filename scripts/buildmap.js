module.exports = buildMap

const g = require('./global.js')
const data = require('./map.js')

function buildMap () {
  let arr = []
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < 28; j++) {
      arr.push({xpos: j, ypos: i})
    }
  }
  let arr2 = []
  while (arr.length > 0) {
    arr2.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0])
  }
  for (let i = 0; i < arr2.length; i++) {
    setTimeout(() => {
      const xpos = arr2[i].xpos
      const ypos = arr2[i].ypos
      let num = ypos * 28 + xpos
      if (data[num][1]) {
        let img = document.createElement('img')
        img.src = './sprites/' + data[num][1]
        img.style.position = 'absolute'
        img.style.visibility = 'hidden'
        img.classList.add('id' + num)
        img.classList.add('tile')
        document.getElementById('main').appendChild(img)
        img.onload = function () { moveImage(img, xpos, ypos, 0) }
      }
      let h = 2
      while (data[num][h]) {
        let img = document.createElement('img')
        img.src = './sprites/' + data[num][h]
        img.style.position = 'absolute'
        img.style.visibility = 'hidden'
        img.classList.add('id' + ypos)
        img.classList.add('tile')
        document.getElementById('main').appendChild(img)
        img.onload = () => { moveImage(img, xpos, ypos, h - 1) }
        h++
      }
    }, i * 10)
  }
}

function moveImage (img, xpos, ypos, zpos) {
  img.style.left = xToIso(xpos, ypos, img.width, zpos) + 'px'
  img.style.top = yToIso(xpos, ypos, img.height, zpos) + 'px'
  img.style.zIndex = (ypos + xpos) * 100
  img.style.visibility = 'visible'
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
