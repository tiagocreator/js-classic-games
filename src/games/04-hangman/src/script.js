'use strict';

const word = document.querySelector('.word');
const wrong = document.querySelector('.wong-letters');
const popup = document.querySelector('.popup-container');
const finalMessage = document.querySelector('.final-message');
const figureParts = document.querySelectorAll('.figure-part');

let isGameOver = false;

(async (url) => {
  const words = await fetch(url);
  const data = await words.json();

  let selectWord = data[Math.floor(Math.random() * data.length)];

  const correctLetters = [];
  const wrongLetters = [];

  function displayWord() {
    word.innerHTML = `
    ${selectWord
      .split('')
      .map(
        (letter) =>
          `<span class="letter">${
            correctLetters.includes(letter) ? letter : ''
          }</span>`
      )
      .join('')}
  `;

    const finalWord = word.innerText.replace(/\n/g, '');

    if (finalWord === selectWord) {
      isGameOver = true;
      finalMessage.innerText = 'Congratulations, You Win!';
      popup.style.display = 'flex';
    }
  }
  displayWord();

  function updateWrongLetters() {
    wrong.innerHTML = `
      ${wrongLetters.length > 0 ? '<p>Incorrect</p>' : ''}
      ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;

      if (index < errors) {
        part.style.display = 'block';
      } else {
        part.style.display = 'none';
      }
    });

    if (wrongLetters.length === figureParts.length) {
      finalMessage.innerText = 'You Lose!';
      popup.style.display = 'flex';
      isGameOver = true;
    }
  }

  const notification = document.querySelector('.notification-container');
  function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }

  window.addEventListener('keydown', pressKeys);
  function pressKeys(e) {
    if (isGameOver === false) {
      if (e.key >= 'a' && e.key <= 'z') {
        const letter = e.key;
        if (selectWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
          } else {
            showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrongLetters();
          } else {
            showNotification();
          }
        }
      }
    } else return;
  }
})('./src/words.json');
document.querySelector('.play-btn').addEventListener('click', () => {
  window.location.reload();
});
