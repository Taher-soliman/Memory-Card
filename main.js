const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let disableClick = false;

function flipCard(e) {
  let clickedCard = e.target;

  if (clickedCard !== cardOne && !disableClick) {
    clickedCard.classList.add("flip");

    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    disableClick = true;
    cardTwo = clickedCard;
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;

    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 400);
    }

    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableClick = false);
  }
  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);
  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableClick = false;
  }, 1200);
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  disableClick = false;

  let randomArr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  randomArr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  //   let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  //   arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let imgtag = card.querySelector("img");
    imgtag.src = `Images/img-${randomArr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}
shuffleCard();
cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
