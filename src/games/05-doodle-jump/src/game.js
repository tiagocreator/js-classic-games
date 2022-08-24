document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const doodler = document.createElement('div');
  const platform = document.createElement('div');
  const presentation = document.querySelector('.presentation');
  const startBtn = document.querySelector('#start');
  const endGame = document.querySelector('.game-over');
  const scoreValue = document.querySelector('.score');
  const resetBtn = document.querySelector('#reset');
  const touchLeft = document.querySelector('.touch-left');
  const touchMiddle = document.querySelector('.touch-middle');
  const touchRight = document.querySelector('.touch-right');

  let doodlerLeftSpace = 50;
  let startPoint = 150;
  let doodlerBottomSpace = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;
  let score = 0;

  function reload() {
    location.reload();
  }

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = `${doodlerLeftSpace}px`;
    doodler.style.bottom = `${doodlerBottomSpace}px`;
  }

  class Platform {
    constructor(platformBottom) {
      this.bottom = platformBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement('div');

      const visual = this.visual;

      visual.classList.add('platform');
      visual.style.left = `${this.left}px`;
      visual.style.bottom = `${this.bottom}px`;

      grid.appendChild(visual);
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let platformBottom = 100 + i * platformGap;
      let newPlatform = new Platform(platformBottom);
      platforms.push(newPlatform);
    }
  }

  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = `${platform.bottom}px`;
        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove('platform');
          platforms.shift();
          score++;
          let newPlatform = new Platform(600);
          platforms.push(newPlatform);
        }
      });
    }
  }

  function fall() {
    isJumping = false;
    clearInterval(upTimerId);
    downTimerId = setInterval(function () {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = `${doodlerBottomSpace}px`;
      if (doodlerBottomSpace <= 0) {
        gameOver();
      }
      platforms.forEach((platform) => {
        if (
          doodlerBottomSpace >= platform.bottom &&
          doodlerBottomSpace <= platform.bottom + 15 &&
          doodlerLeftSpace + 60 >= platform.left &&
          doodlerLeftSpace <= platform.left + 85 &&
          !isJumping
        ) {
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 30);
  }

  function gameOver() {
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
    isGameOver = true;
    doodler.remove();
    endGame.style.display = 'block';
    scoreValue.textContent = score;
    resetBtn.addEventListener('click', reload);
  }

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      doodlerBottomSpace += 20;
      doodler.style.bottom = `${doodlerBottomSpace}px`;
      if (doodlerBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  function control(e) {
    if (e.key === 'ArrowLeft') {
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      moveRight();
    } else if (e.key === 'ArrowUp') {
      moveStraight();
    }
  }

  function touch() {
    touchLeft.addEventListener('touchstart', function () {
      moveLeft();
    });
    touchMiddle.addEventListener('touchstart', function () {
      moveStraight();
    });
    touchRight.addEventListener('touchstart', function () {
      moveRight();
    });
  }

  function moveLeft() {
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
    isGoingRight = false;
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else moveStraight();
    }, 20);
  }

  function moveRight() {
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
    isGoingLeft = false;
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 5;
        doodler.style.left = `${doodlerLeftSpace}px`;
      } else moveStraight();
    }, 20);
  }

  function moveStraight() {
    isGoingRight = false;
    isGoingLeft = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
  }

  function start() {
    if (!isGameOver) {
      presentation.style.display = 'none';
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
      document.addEventListener('keyup', control);
      touch();
    }
  }
  startBtn.addEventListener('click', start);
});
