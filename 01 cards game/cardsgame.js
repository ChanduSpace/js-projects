let cards = document.querySelectorAll(".card");
// let playButton = document.querySelector(".play-button");
// let cardsContainer = document.querySelector(".cards-container");

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

// function playClicked() {
//   playButton.classList.add("play");
//   playButton.classList.remove("play-button");
//   cardsContainer.classList.remove("play");
// }

(function shuffle() {
  cards.forEach((c) => {
    let num = Math.floor(Math.random() * 20);
    c.Style.order = num;
  });
})();

// function reset() {
//   isFirst = true;
//   firstCard = 0;
//   secondCard = 0;
//   shuffle();
// }
