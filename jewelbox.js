
class Jewel {
  constructor(topY, middleY, bottomY) {
    this.animals = [topY, middleY, bottomY]
    this.top = [0, 3]
    this.middle = [1, 3]
    this.bottom = [2, 3]
  }
  create() {
    gameMap[this.top[0]][this.top[1]] = this.animals[0]
    gameMap[this.middle[0]][this.middle[1]] = this.animals[1]
    gameMap[this.bottom[0]][this.bottom[1]] = this.animals[2]
    drawCanvas()     
  }
  checkBottom() {
    if ((this.bottom[0] < 14) && (gameMap[this.bottom[0] + 1][this.bottom[1]] === 7)) {
      return true
    } else {
      return false
    }
  }
  checkLeft() {
    if ((this.bottom[1] > 0) && (gameMap[this.bottom[0]][this.bottom[1] - 1] === 7)) {
      return true
    } else {
      return false
    }
  }
  checkRight() {
    if ((this.bottom[1] < 6) && (gameMap[this.bottom[0]][this.bottom[1] + 1] === 7)) {
      return true
    } else {
      return false
    }
  }  
  moveLeft() {
    if (this.checkLeft()) {
      context.clearRect(this.top[1] * 40, this.top[0] * 40, blockSize, blockSize);
      context.clearRect(this.middle[1] * 40, this.middle[0] * 40, blockSize, blockSize);
      context.clearRect(this.bottom[1] * 40, this.bottom[0] * 40, blockSize, blockSize);
      gameMap[this.top[0]][this.top[1]] = 7
      gameMap[this.middle[0]][this.middle[1]] = 7
      gameMap[this.bottom[0]][this.bottom[1]] = 7
      this.top[1] -= 1
      this.middle[1] -= 1
      this.bottom[1] -= 1
      gameMap[this.top[0]][this.top[1]] = this.animals[0]
      gameMap[this.middle[0]][this.middle[1]] = this.animals[1]
      gameMap[this.bottom[0]][this.bottom[1]] = this.animals[2]
      drawCanvas()
    }
  }
  moveRight() {
    if (this.checkRight()) {
      context.clearRect(this.top[1] * 40, this.top[0] * 40, blockSize, blockSize);
      context.clearRect(this.middle[1] * 40, this.middle[0] * 40, blockSize, blockSize);
      context.clearRect(this.bottom[1] * 40, this.bottom[0] * 40, blockSize, blockSize);
      gameMap[this.top[0]][this.top[1]] = 7
      gameMap[this.middle[0]][this.middle[1]] = 7
      gameMap[this.bottom[0]][this.bottom[1]] = 7
      this.top[1] += 1
      this.middle[1] += 1
      this.bottom[1] += 1
      gameMap[this.top[0]][this.top[1]] = this.animals[0]
      gameMap[this.middle[0]][this.middle[1]] = this.animals[1]
      gameMap[this.bottom[0]][this.bottom[1]] = this.animals[2]
      drawCanvas()
    }
  }
  moveBottom() {
    if (this.checkBottom()) {
      context.clearRect(this.top[1] * 40, this.top[0] * 40, blockSize, blockSize);
      context.clearRect(this.middle[1] * 40, this.middle[0] * 40, blockSize, blockSize);
      context.clearRect(this.bottom[1] * 40, this.bottom[0] * 40, blockSize, blockSize);
      gameMap[this.top[0]][this.top[1]] = 7
      gameMap[this.middle[0]][this.middle[1]] = 7
      gameMap[this.bottom[0]][this.bottom[1]] = 7
      this.top[0] += 1
      this.middle[0] += 1
      this.bottom[0] += 1
      gameMap[this.top[0]][this.top[1]] = this.animals[0]
      gameMap[this.middle[0]][this.middle[1]] = this.animals[1]
      gameMap[this.bottom[0]][this.bottom[1]] = this.animals[2]
      drawCanvas()
    } else {
      checkMatches()
      for (let row = 0; row < 2; row++) {
        for (let column = 0; column < gameMap[row].length; column++) {
          if (gameMap[row][column] !== 7) {
            gameOver = true
            console.log('Game Over!')
            // stopMusic()
            return
          }
        }
      }
      score.innerHTML = Number(score.innerHTML) + 10
      if (levelMatches >= 50) {
        gameSpeed += 0.1
        level++
        footerLevel.innerHTML = level
        levelMatches = 0
      }
      currentShape = nextShape
      nextShape = new Jewel(randomAnimal(), randomAnimal(), randomAnimal())
      drawNext(nextShape.animals)
      currentShape.create()
      drawCanvas()
    }
  }
  changeOrder() {
    context.clearRect(this.top[1] * 40, this.top[0] * 40, blockSize, blockSize);
    context.clearRect(this.middle[1] * 40, this.middle[0] * 40, blockSize, blockSize);
    context.clearRect(this.bottom[1] * 40, this.bottom[0] * 40, blockSize, blockSize);
    this.animals.unshift(this.animals.pop())
    gameMap[this.top[0]][this.top[1]] = this.animals[0]
    gameMap[this.middle[0]][this.middle[1]] = this.animals[1]
    gameMap[this.bottom[0]][this.bottom[1]] = this.animals[2]
    drawCanvas()    
  }
}

const imageSquareSize = 24
const blockSize = 40
const framesPerSecond = 24
let levelMatches = 0
let level = 1
let gameSpeed = 1
const image = document.getElementById('image')
const bird = document.getElementById('bird')
const duck = document.getElementById('duck')
const fox = document.getElementById('fox')
const frog = document.getElementById('frog')
const ladybug = document.getElementById('ladybug')
const lizard = document.getElementById('lizard')
const rabbit = document.getElementById('rabbit')
const canvas = document.getElementById('canvas')
const context = canvas.getContext("2d")
const nextCanvas = document.getElementById('nextCanvas')
const nextContext = nextCanvas.getContext("2d")
// const squareCountX = canvas.width / blockSize
// const squareCountY = canvas.height / blockSize
const animalsY = [bird, duck, fox, frog, ladybug, lizard, rabbit]

const randomAnimal = () => {
  return Math.floor(Math.random() * 7)
}

let gameMap = [
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7],
  [7, 7, 7, 7, 7, 7, 7]
]

let gameOver = false
let lives = document.getElementById('lives')
let footerLevel = document.getElementById('level')
let footerMatches = document.getElementById('matches')
let score = document.getElementById('score')

const auto = () => {
  if (gameOver) {
    return
  }
  currentShape.moveBottom()
  setTimeout(auto, 1000 / gameSpeed);
}

const gameLoop = () => {
  setTimeout(auto, 1000 / gameSpeed);
};

window.addEventListener("keydown", (event) => {
  if (event.key === 'ArrowLeft') {
    currentShape.moveLeft();
  } else if (event.key === 'ArrowUp') {
    currentShape.changeOrder();
  } else if (event.key === 'ArrowRight') {
    currentShape.moveRight();
  } else if (event.key === 'ArrowDown') {
    currentShape.moveBottom();
  }
});

let touchstartX = 0
let touchendX = 0
let touchstartY = 0
let touchendY = 0
    
const checkDirection = () => {
  let xChange = touchendX - touchstartX
  let yChange = touchendY - touchstartY
  console.log('X Change: ', xChange)
  console.log('Y Change: ', yChange)
  if (Math.abs(xChange) > Math.abs(yChange)) {
    if (touchendX < touchstartX) {
      currentShape.moveLeft();
    }
    if (touchendX > touchstartX) {
      currentShape.moveRight();
    }
  }
  if (Math.abs(yChange) > Math.abs(xChange)) {
    if (touchendY > touchstartY) {
      currentShape.changeOrder();
    }    
  }  
}

canvas.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
  touchstartY = e.changedTouches[0].screenY
})

canvas.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  touchendY = e.changedTouches[0].screenY
  checkDirection()
})

canvas.addEventListener('click', e => {
  currentShape.changeOrder()
})

const drawCanvas = () => {
  context.clearRect(0, 0, 280, 520)
  for (let row = 2; row < gameMap.length; row ++) {
    for (let column = 0; column < gameMap[row].length; column++) {
      if (gameMap[row][column] === 0) {
        context.drawImage(bird, 0, 0, 225, 225, column*40, (row-2)*40, blockSize, blockSize)
      }
      if (gameMap[row][column] === 1) {
        context.drawImage(duck, 0, 0, 225, 225, column*40, (row-2)*40, blockSize, blockSize)
      }
      if (gameMap[row][column] === 2) {
        context.drawImage(fox, 0, 0, 256, 256, column*40, (row-2)*40, blockSize, blockSize)
      }
      if (gameMap[row][column] === 3) {
        context.drawImage(frog, 0, 0, 205, 205, column*40, (row-2)*40, blockSize, blockSize)
      }
      if (gameMap[row][column] === 4) {
        context.drawImage(ladybug, 0, 0, 166, 166, column*40, (row-2)*40, blockSize, blockSize)
      }
      if (gameMap[row][column] === 5) {
        context.drawImage(lizard, 0, 0, 900, 900, column*40, (row-2)*40, blockSize, blockSize)
      }
      if (gameMap[row][column] === 6) {
        context.drawImage(rabbit, 0, 0, 225, 225, column*40, (row-2)*40, blockSize, blockSize)
      }
    }
  }
}

const drawNext = (animals) => {
  nextContext.drawImage(animalsY[animals[0]], 0, 0, animalsY[animals[0]].width, animalsY[animals[0]].height, 10, 10, 40, 40)
  nextContext.drawImage(animalsY[animals[1]], 0, 0, animalsY[animals[1]].width, animalsY[animals[1]].height, 10, 50, 40, 40)
  nextContext.drawImage(animalsY[animals[2]], 0, 0, animalsY[animals[2]].width, animalsY[animals[2]].height, 10, 90, 40, 40)
}
 
const beep = () => {   
  const beepsound = new Audio('beep.mp3');   
  beepsound.play();   
} 

const checkMatches = () => {
  let matches = []
  for (let row = 0; row < gameMap.length; row++) {
    for (let column = 0; column < gameMap[row].length; column++) {
      if ((gameMap[row][column] !== 7)) {

        // HORIZONTAL
        if (column <= 4) {
          if ((gameMap[row][column] === (gameMap[row][column + 1]) && (gameMap[row][column] === gameMap[row][column + 2]))) {
            matches.push([row, column])
          }
        }
        if (column >= 2) {
          if ((gameMap[row][column] === (gameMap[row][column - 1]) && (gameMap[row][column] === gameMap[row][column - 2]))) {
            matches.push([row, column])
          }
        }
        if ((column > 0) && (column < 6)) {
          if ((gameMap[row][column] === (gameMap[row][column + 1]) && (gameMap[row][column] === gameMap[row][column - 1]))) {
            matches.push([row, column])
          }
        }

        // VERTICAL
        if (row <= 12) {
          if ((gameMap[row][column] === (gameMap[row + 1][column]) && (gameMap[row][column] === gameMap[row + 2][column]))) {
            matches.push([row, column])
          }
        }
        if (row >= 2) {
          if ((gameMap[row][column] === (gameMap[row - 1][column]) && (gameMap[row][column] === gameMap[row - 2][column]))) {
            matches.push([row, column])
          }
        }
        if ((row > 0) && row < 14) {
          if ((gameMap[row][column] === (gameMap[row + 1][column]) && (gameMap[row][column] === gameMap[row - 1][column]))) {
            matches.push([row, column])
          }
        }

        // DIAGONAL
        if (row >= 2 && column >= 2) {
          if ((gameMap[row][column] === (gameMap[row - 1][column - 1]) && (gameMap[row][column] === gameMap[row - 2][column - 2]))) {
            matches.push([row, column])
          }
        }
        if (row <= 12 && column <= 4) {
          if ((gameMap[row][column] === (gameMap[row + 1][column + 1]) && (gameMap[row][column] === gameMap[row + 2][column + 2]))) {
            matches.push([row, column])
          }
        }
        if (row <= 12 && column >= 2) {
          if ((gameMap[row][column] === (gameMap[row + 1][column - 1]) && (gameMap[row][column] === gameMap[row + 2][column - 2]))) {
            matches.push([row, column])
          }
        }
        if (row >= 2 && column <= 4) {
          if ((gameMap[row][column] === (gameMap[row - 1][column + 1]) && (gameMap[row][column] === gameMap[row - 2][column + 2]))) {
            matches.push([row, column])
          }
        }
        if (row >= 1 && row <= 13 && column >= 1 && column <= 5) {
          if ((gameMap[row][column] === (gameMap[row + 1][column + 1]) && (gameMap[row][column] === gameMap[row - 1][column - 1]))) {
            matches.push([row, column])
          }
          if ((gameMap[row][column] === (gameMap[row + 1][column - 1]) && (gameMap[row][column] === gameMap[row - 1][column + 1]))) {
            matches.push([row, column])
          }
        }       
      }
    }
  }
  for (let match of matches) {
    gameMap[match[0]][match[1]] = 7
  }
  if (matches.length > 0) {
    score.innerHTML = Number(score.innerHTML) + (50 * matches.length * level)
    beep()
    levelMatches += matches.length
    footerMatches.innerHTML = Number(footerMatches.innerHTML) + matches.length
  }
  matches = []
  collapseColumns()
  drawCanvas()
}

const collapseColumns = () => {
  for (let row = 1; row < gameMap.length; row++) {
    for (let column = 0; column < gameMap[row].length; column++) {
      if (gameMap[row][column] === 7) {
        let i = row - 1
        if (gameMap[i][column] !== 7) {
          gameMap[row][column] = gameMap[i][column]
          while (i > 0) {
            gameMap[i][column] = gameMap[i - 1][column]
            i--
          }
          checkMatches()
        }
      }
    }
  }
}

let music = true
const backgroundMusic = new Audio('music.mp3')
backgroundMusic.autoplay = true

const playMusic = () => {
  music = true
  backgroundMusic.play();
  setTimeout(playMusic, 240007)
}

const stopMusic = () => {
  music = false
  backgroundMusic.pause();
}

const toggleMusic = () => {
  if (music === true) {
    stopMusic()
  } else {
    playMusic()
  }
}

const newGame = () => {
  window.location.reload()
}

let currentShape = new Jewel(randomAnimal(), randomAnimal(), randomAnimal())
let nextShape = new Jewel(randomAnimal(), randomAnimal(), randomAnimal())
currentShape.create()
drawNext(nextShape.animals)
playMusic()

gameLoop()