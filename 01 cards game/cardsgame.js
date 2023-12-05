let cards = document.querySelectorAll(".card");

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
