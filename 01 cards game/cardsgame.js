let cards = document.querySelectorAll(".card");
let playButton = document.querySelector(".play-button");
let cardsContainer = document.querySelector(".cards-container");
let resetButton = document.querySelector(".reset-button");
let doneText = document.querySelector(".done-text");
let heading = document.querySelector(".heading");
let score = document.querySelector(".score");
let moves = document.querySelector(".moves");
let endScore = document.querySelector(".end-score");

let isFirst = true;
let firstCard;
let secondCard;
moves.innerText = 0;

cards.forEach((c) => {
  c.addEventListener("click", flip);
});

function flip() {
  this.classList.add("flip");
  moves.innerText = parseInt(moves.innerText) + 1;
  if (isFirst) {
    isFirst = false;
    firstCard = this;
  } else {
    secondCard = this;
    check();
  }
}
function check() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);

    let gameStatus = [];
    cards.forEach((c) => {
      let a = c.classList.contains("flip");
      if (a) {
        gameStatus.push(a);
      } else {
        gameStatus.push(false);
      }
    });

    if (!gameStatus.includes(false)) {
      endScore.innerText = moves.innerText;
      setTimeout(() => {
        doneText.classList.remove("play");
      }, 1000);
    }

    isFirst = true;
    firstCard = 0;
    secondCard = 0;
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      isFirst = true;
      firstCard = 0;
      secondCard = 0;
    }, 600);
  }
}

function playClicked() {
  playButton.classList.add("play");
  playButton.classList.remove("play-button");
  cardsContainer.classList.remove("play");
  resetButton.classList.remove("play");
  score.classList.remove("play");
  heading.classList.add("move-up");
}

// function shuffle() {
//   let usedNum = [];
//   cards.forEach((c) => {
//     var num = Math.floor(Math.random() * cards.length);

//     if (!usedNum.includes(num)) {
//       usedNum.push(num);
//       c.style.order = num;
//     }
//     console.log(usedNum);
//   });
// }

////*************************************************8///////////

function shuffle() {
  let usedNum = [];
  let element = 1;
  cards.forEach((c) => {
    while (element > usedNum.length) {
      var num = Math.floor(Math.random() * cards.length);
      if (!usedNum.includes(num)) {
        usedNum.push(num);
        c.style.order = num;
      }
    }
    element++;
  });
}
shuffle();

////k *************************************************???????////////

// function shuffle() {
//   let usedNum = [];
//   for (let i = 0; i < cards.length; i++) {
//     var num = Math.floor(Math.random() * cards.length);
//     console.log(num);

//     if (!usedNum.includes(num)) {
//       usedNum.push(num);
//       //   c.style.order = num;
//     } else {
//       i--;
//     }
//     console.log(usedNum);
//   }
// }

// cards.forEach((c) => {
//   console.log(c.classList.contains("flip"));
// });

////k *************************************************???????////////

function reset() {
  cards.forEach((c) => {
    c.classList.remove("flip");
    c.addEventListener("click", flip);
  });
  moves.innerText = 0;
  doneText.classList.add("play");
  isFirst = true;
  firstCard = 0;
  secondCard = 0;
  shuffle();
}
