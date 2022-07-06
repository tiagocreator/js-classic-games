let width = 10;
let bombsAmount = 20;
const grid = document.querySelector('.grid');
let squares = [];

const clickAudio = document.querySelector('.click-audio');
const flagAudio = document.querySelector('.flag-audio');

(function () {
  {
    const bombsArr = Array(bombsAmount).fill('bomb');
    const emptyArr = Array(width * width - bombsAmount).fill('valid');
    const gameArr = [...bombsArr, ...emptyArr];
    const shuffledArr = gameArr.sort(() => Math.random() - 0.5);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.setAttribute('id', i);
      square.classList.add(shuffledArr[i]);
      grid.appendChild(square);
      squares.push(square);
    }
  }
})();

document.querySelector('.reload').addEventListener('click', function () {
  const reloadAudio = document.querySelector('.reload-audio');
  reloadAudio.currentTime = 0;
  reloadAudio.play();
  setTimeout(() => {
    window.location.reload();
  }, 200);
});

document.querySelector('.play-btn').addEventListener('click', function () {
  const playAudio = document.querySelector('.play-audio');
  this.style.borderColor = '#808080 #fff #fff #808080';
  setTimeout(() => {
    this.style.display = 'none';
  }, 200);

  playAudio.currentTime = 0;
  playAudio.play();
  const displayFlags = document.querySelector('.flags-remaining');
  const displayTime = document.querySelector('.time-spent');
  const result = document.querySelector('.result');

  let flagsRemaining = 20;
  let timeSpent = 0;
  let flags = 0;
  let isGameOver = false;

  function updateFlags() {
    let flagsCount = parseInt(flagsRemaining - flags);
    displayFlags.textContent = `0${flagsCount}`;
    if (flagsCount < 10) {
      displayFlags.textContent = `00${flagsCount}`;
    }
  }
  updateFlags();

  const updateTime = setInterval(() => {
    timeSpent++;
    if (timeSpent <= 9) {
      displayTime.textContent = `00${timeSpent}`;
    } else if (timeSpent > 9 && timeSpent <= 99) {
      displayTime.textContent = `0${timeSpent}`;
    } else {
      displayTime.textContent = timeSpent;
    }
  }, 1000);

  function boardInteraction() {
    squares.forEach(function (square) {
      square.addEventListener('click', function (e) {
        e.preventDefault();
        click(square);
      });
      square.oncontextmenu = function (e) {
        e.preventDefault();
        addFlag(square);
      };
    });

    for (let i = 0; i < squares.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb'))
          total++;

        if (
          i > 9 &&
          !isRightEdge &&
          squares[i + 1 - width].classList.contains('bomb')
        )
          total++;

        if (i > 10 && squares[i - width].classList.contains('bomb')) total++;
        if (
          i > 11 &&
          !isLeftEdge &&
          squares[i - 1 - width].classList.contains('bomb')
        )
          total++;

        if (i < 98 && !isRightEdge && squares[i + 1].classList.contains('bomb'))
          total++;

        if (
          i < 90 &&
          !isLeftEdge &&
          squares[i - 1 + width].classList.contains('bomb')
        )
          total++;

        if (
          i < 88 &&
          !isRightEdge &&
          squares[i + 1 + width].classList.contains('bomb')
        )
          total++;

        if (i < 89 && squares[i + width].classList.contains('bomb')) total++;
        squares[i].setAttribute('data', total);
      }
    }
  }
  boardInteraction();

  function addFlag(square) {
    if (isGameOver) return;
    if (!square.classList.contains('checked') && flags < bombsAmount) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag');
        square.innerHTML = '<img src="./img/flag.png" alt="" class="flag-img">';
        flags++;
        flagAudio.currentTime = 0;
        flagAudio.play();
        checkForWin();
        updateFlags();
      } else {
        flagAudio.currentTime = 0;
        flagAudio.play();
        square.classList.remove('flag');
        square.innerHTML = '';
        flags--;
        updateFlags();
      }
    }
  }

  function click(square) {
    let squareId = square.id;
    if (isGameOver) return;
    if (
      square.classList.contains('checked') ||
      square.classList.contains('flag')
    )
      return;

    if (square.classList.contains('bomb')) {
      const explosionAudio = document.querySelector('.explosion-audio');
      explosionAudio.currentTime = 0;
      explosionAudio.play();
      gameOver(square);
    } else {
      clickAudio.currentTime = 0;
      clickAudio.play();
      let total = square.getAttribute('data');
      if (total != 0) {
        square.classList.add('checked');
        if (total == 1) square.classList.add('one');
        if (total == 2) square.classList.add('two');
        if (total == 3) square.classList.add('three');
        if (total == 4) square.classList.add('four');
        square.innerHTML = total;
        return;
      }
      checkSquare(square, squareId);

      square.classList.add('checked');
    }

    function checkSquare(square, squareId) {
      const isLeftEdge = squareId % width === 0;
      const isRightEdge = squareId % width === width - 1;

      setInterval(() => {
        if (squareId > 0 && !isLeftEdge) {
          const newId = squares[parseInt(squareId) - 1].id;
          const newSquare = document.getElementById(newId);

          click(newSquare);
        }

        if (squareId > 9 && !isRightEdge) {
          const newId = squares[parseInt(squareId) + 1 - width].id;
          const newSquare = document.getElementById(newId);

          click(newSquare);
        }

        if (squareId > 10) {
          const newId = squares[parseInt(squareId - width)].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }

        if (squareId > 11 && !isLeftEdge) {
          const newId = squares[parseInt(squareId) - 1 - width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }

        if (squareId < 98 && !isRightEdge) {
          const newId = squares[parseInt(squareId) + 1].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }

        if (squareId < 90 && !isLeftEdge) {
          const newId = squares[parseInt(squareId) - 1 + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }

        if (squareId < 88 && !isRightEdge) {
          const newId = squares[parseInt(squareId) + 1 + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }

        if (squareId < 89) {
          const newId = squares[parseInt(squareId) + width].id;
          const newSquare = document.getElementById(newId);
          click(newSquare);
        }
      }, 10);
    }
  }

  function gameOver(square) {
    result.innerHTML = `<img src="./img/lose.png" alt="" class="lose-img"> YOU LOSE!`;

    isGameOver = true;

    squares.forEach((square) => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '<img src="./img/bomb.png" class="bomb-img" alt="">';
      }
    });
    grid.addEventListener('click', function (e) {
      if (e.target.classList.contains('bomb')) {
        e.target.style.background = '#FF0000';
      }
    });
    clearInterval(updateTime);
    return;
  }

  function checkForWin() {
    let matches = 0;
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].classList.contains('flag') &&
        squares[i].classList.contains('bomb')
      ) {
        matches++;
      }

      if (matches === bombsAmount) {
        result.innerHTML = `<img src="./img/win.png" alt="" class="win-img"> <span>YOU WIN !</span>`;
        isGameOver = true;
      }
    }
  }
});
