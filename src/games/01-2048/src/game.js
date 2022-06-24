document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.grid');
  const score = document.querySelector('.score-value');
  const result = document.querySelector('.result');
  const width = 4;
  let squaresArr = [];
  let scoreValue = 0;

  document.querySelector('.reload').addEventListener('click', function () {
    location.reload();
  });

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement('div');
      square.classList.add('square');
      square.innerHTML = 0;
      grid.appendChild(square);
      squaresArr.push(square);
    }
    generateNumbers();
    generateNumbers();
  }
  createBoard();

  function generateNumbers() {
    const randomNumber = Math.floor(Math.random() * squaresArr.length);
    if (squaresArr[randomNumber].innerHTML == 0) {
      squaresArr[randomNumber].innerHTML = 2;
    } else generateNumbers();
    gameOver();
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squaresArr[i].innerHTML;
      let totalTwo = squaresArr[i + width].innerHTML;
      let totalThree = squaresArr[i + width * 2].innerHTML;
      let totalFour = squaresArr[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squaresArr[i].innerHTML = newColumn[0];
      squaresArr[i + width].innerHTML = newColumn[1];
      squaresArr[i + width * 2].innerHTML = newColumn[2];
      squaresArr[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function moveRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let totalOne = squaresArr[i].innerHTML;
        let totalTwo = squaresArr[i + 1].innerHTML;
        let totalThree = squaresArr[i + 2].innerHTML;
        let totalFour = squaresArr[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        let filteredArr = row.filter((num) => num);
        let missing = 4 - filteredArr.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredArr);

        squaresArr[i].innerHTML = newRow[0];
        squaresArr[i + 1].innerHTML = newRow[1];
        squaresArr[i + 2].innerHTML = newRow[2];
        squaresArr[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squaresArr[i].innerHTML;
      let totalTwo = squaresArr[i + width].innerHTML;
      let totalThree = squaresArr[i + width * 2].innerHTML;
      let totalFour = squaresArr[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squaresArr[i].innerHTML = newColumn[0];
      squaresArr[i + width].innerHTML = newColumn[1];
      squaresArr[i + width * 2].innerHTML = newColumn[2];
      squaresArr[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function moveLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let totalOne = squaresArr[i].innerHTML;
        let totalTwo = squaresArr[i + 1].innerHTML;
        let totalThree = squaresArr[i + 2].innerHTML;
        let totalFour = squaresArr[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        let filteredArr = row.filter((num) => num);
        let missing = 4 - filteredArr.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredArr.concat(zeros);

        squaresArr[i].innerHTML = newRow[0];
        squaresArr[i + 1].innerHTML = newRow[1];
        squaresArr[i + 2].innerHTML = newRow[2];
        squaresArr[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squaresArr[i].innerHTML === squaresArr[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squaresArr[i].innerHTML) +
          parseInt(squaresArr[i + 1].innerHTML);
        squaresArr[i].innerHTML = combinedTotal;
        squaresArr[i + 1].innerHTML = 0;
        scoreValue += combinedTotal;
        score.innerHTML = scoreValue;
      }
    }
    win();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squaresArr[i].innerHTML === squaresArr[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squaresArr[i].innerHTML) +
          parseInt(squaresArr[i + width].innerHTML);
        squaresArr[i].innerHTML = combinedTotal;
        squaresArr[i + width].innerHTML = 0;
        scoreValue += combinedTotal;
        score.innerHTML = scoreValue;
      }
    }
    win();
  }

  function controls(e) {
    if (e.key === 'ArrowUp') {
      keyUp();
    } else if (e.key === 'ArrowRight') {
      keyRight();
    } else if (e.key === 'ArrowDown') {
      keyDown();
    } else if (e.key === 'ArrowLeft') {
      keyLeft();
    }
  }
  document.addEventListener('keyup', controls);

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generateNumbers();
    addColours();
  }

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateNumbers();
    addColours();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generateNumbers();
    addColours();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateNumbers();
    addColours();
  }

  /* TOUCH */
  grid.addEventListener('touchstart', handleTouchStart, false);
  grid.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        keyLeft();
      } else {
        keyRight();
      }
    } else {
      if (yDiff > 0) {
        keyUp();
      } else {
        keyDown();
      }
    }
    xDown = null;
    yDown = null;
  }
  /* END */

  function win() {
    for (let i = 0; i < squaresArr.length; i++) {
      if (squaresArr[i].innerHTML == 2048) {
        result.style.visibility = 'visible';
        result.innerHTML = 'You Won!';
        document.removeEventListener('keyup', controls);
      }
    }
  }

  function gameOver() {
    let zeros = 0;
    for (let i = 0; i < squaresArr.length; i++) {
      if (squaresArr[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      result.style.visibility = 'visible';
      result.innerHTML = 'You Lose!';
      document.removeEventListener('keyup', controls);
    }
  }

  function addColours() {
    for (let i = 0; i < squaresArr.length; i++) {
      if (squaresArr[i].innerHTML == 0)
        squaresArr[i].style.backgroundColor = '#afa192';
      else if (squaresArr[i].innerHTML == 2)
        squaresArr[i].style.backgroundColor = '#eee4da';
      else if (squaresArr[i].innerHTML == 4)
        squaresArr[i].style.backgroundColor = '#ede0c8';
      else if (squaresArr[i].innerHTML == 8)
        squaresArr[i].style.backgroundColor = '#f2b179';
      else if (squaresArr[i].innerHTML == 16)
        squaresArr[i].style.backgroundColor = '#ffcea4';
      else if (squaresArr[i].innerHTML == 32)
        squaresArr[i].style.backgroundColor = '#e8c064';
      else if (squaresArr[i].innerHTML == 64)
        squaresArr[i].style.backgroundColor = '#ffab6e';
      else if (squaresArr[i].innerHTML == 128)
        squaresArr[i].style.backgroundColor = '#fd9982';
      else if (squaresArr[i].innerHTML == 256)
        squaresArr[i].style.backgroundColor = '#ead79c';
      else if (squaresArr[i].innerHTML == 512)
        squaresArr[i].style.backgroundColor = '#76daff';
      else if (squaresArr[i].innerHTML == 1024)
        squaresArr[i].style.backgroundColor = '#beeaa5';
      else if (squaresArr[i].innerHTML == 2048)
        squaresArr[i].style.backgroundColor = '#d7d4f0';
    }
  }
  addColours();
});
