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
