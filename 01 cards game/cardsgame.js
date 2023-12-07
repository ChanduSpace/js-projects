let cards = document.querySelectorAll(".card");
let playButton = document.querySelector(".play-button");
let cardsContainer = document.querySelector(".cards-container");
let resetButton = document.querySelector(".reset-button");
let doneText = document.querySelector(".done-text");

let isFirst = true;
let firstCard;
let secondCard;

cards.forEach((c) => {
  c.addEventListener("click", flip);
});

function flip() {
  this.classList.add("flip");
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

////aads*************************************************8///////////

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
  });
  doneText.classList.add("play");
  isFirst = true;
  firstCard = 0;
  secondCard = 0;
  shuffle();
}
