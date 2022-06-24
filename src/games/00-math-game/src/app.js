const startGame = () => {
  const startReset = document.querySelector('.start-reset');
  const timeRemVal = document.querySelector('.time-remaining-value');
  const scoreVal = document.querySelector('.score-value');
  const questionBox = document.querySelector('.question');
  const finalScore = document.querySelector('.final-score');

  let playing = false;
  let score;
  let action;
  let timeRemaining;
  let correctAnswer;

  startReset.addEventListener('click', function () {
    if (playing == true) {
      location.reload();
    } else {
      playing = true;
      score = 0;
      scoreVal.textContent = score;
      show('.time-remaining');
      timeRemaining = 60;
      timeRemVal.textContent = timeRemaining;
      hide('.game-over');
      startReset.innerHTML = `<i class="fas fa-eraser"></i>Restart Game`;
      startCountdown();
      generateQA();
    }
  });

  for (i = 1; i < 5; i++) {
    document.querySelector('.box' + i).onclick = function () {
      if (playing == true) {
        if (this.textContent == correctAnswer) {
          score++;
          scoreVal.textContent = score;
          hide('.wrong');
          show('.correct');
          setTimeout(function () {
            hide('.correct');
          }, 1000);
          generateQA();
        } else {
          hide('.correct');
          show('.wrong');
          setTimeout(function () {
            hide('.wrong');
          }, 1000);
        }
      }
    };
  }

  const startCountdown = () => {
    action = setInterval(function () {
      timeRemaining -= 1;
      timeRemVal.textContent = timeRemaining;
      if (timeRemaining == 0) {
        stopCountdown();
        show('.game-over');
        finalScore.textContent = score;
        hide('.time-remaining');
        hide('.correct');
        hide('.wrong');
        playing = false;
      }
    }, 1000);
  };

  const stopCountdown = () => {
    clearInterval(action);
  };

  const hide = (query) => {
    document.querySelector(query).style.display = 'none';
  };

  const show = (query) => {
    document.querySelector(query).style.display = 'block';
  };

  const generateQA = () => {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    questionBox.textContent = `${x}x${y}`;
    var correctPosition = 1 + Math.round(3 * Math.random());
    document.querySelector('.box' + correctPosition).innerHTML = correctAnswer;

    var answers = [correctAnswer];
    for (i = 1; i < 5; i++) {
      if (i != correctPosition) {
        var wrongAnswer;
        do {
          wrongAnswer =
            (1 + Math.round(9 * Math.random())) *
            (1 + Math.round(9 * Math.random()));
        } while (answers.indexOf(wrongAnswer) > -1);
        document.querySelector('.box' + i).textContent = wrongAnswer;
        answers.push(wrongAnswer);
      }
    }
  };
};

startGame();
