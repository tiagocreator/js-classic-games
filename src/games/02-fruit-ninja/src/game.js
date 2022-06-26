$(function () {
  let playing;
  let score = 0;
  let lifesLeft;
  let step;
  let action;

  let fruitsArr = [
    'apple',
    'banana',
    'cherries',
    'grapes',
    'lemon',
    'mango',
    'orange',
    'peach',
    'pear',
    'pineapple',
    'watermelon',
  ];

  $('.start-reset').on('click', function () {
    if (playing) {
      location.reload();
    } else {
      playing = true;
      $(this).html('<i class="fas fa-redo-alt"></i>');
      score = 0;
      $('.fruit-ninja-img').hide();
      $('.score-value').html(score);
      $('.lifes-value').show();
      lifesLeft = 3;
      lifePoints();
      startAction();
    }
  });

  function fruitSlice() {
    score++;
    $('.score-value').html(score);
    $('.sword-cut-mp3')[0].play();
    clearInterval(action);
    $('.fruit1').hide(50);
    setTimeout(startAction, 800);
  }

  $('.fruit1').on('mouseenter', function () {
    fruitSlice();
  });

  $('.fruit1').on('touchstart', function () {
    fruitSlice();
  });

  function lifePoints() {
    $('.lifes-value').empty();
    for (let i = 0; i < lifesLeft; i++) {
      $('.lifes-value').append('<img src="./img/life.png" class="life">');
    }
  }

  function startAction() {
    $('.fruit1').show();
    chooseFruit();
    $('.fruit1').css({
      left: Math.round(Math.random() * 290),
      top: '-50px',
    });
    step = 1 + Math.round(Math.random() * 4);
    action = setInterval(function () {
      $('.fruit1').css('top', $('.fruit1').position().top + step);
      if ($('.fruit1').position().top > $('.fruit-container').height()) {
        if (lifesLeft > 1) {
          $('.fruit1').show();
          chooseFruit();
          $('.fruit1').css({
            left: Math.round(Math.random() * 290),
            top: '-50px',
          });
          step = 1 + Math.round(Math.random() * 4);
          lifesLeft--;
          lifePoints();
        } else {
          $('.lifes-remaining').hide();
          $('.fruit1').hide();
          $('.game-over').show();
          stopFruit();
          $('.final-score').html(score);
        }
      }
    }, 10);
  }

  function chooseFruit() {
    $('.fruit1').attr(
      'src',
      './img/fruits/' +
        fruitsArr[parseInt(Math.random() * fruitsArr.length)] +
        '.png'
    );
  }

  function stopFruit() {
    clearInterval(action);
    $('.fruit1').hide();
  }
});
