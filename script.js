let selected = [];
const cardTemplate = `<div class="cardpic"></div>`;

function addCardsListeners() {
  const cards = document.querySelectorAll(".card");
  for (c of cards) {
    c.addEventListener("click", (event) => {
      const obj = event.target.className === "card" ? event.target : event.target.parentElement;

      const score = document.querySelector("#score");
      const record = document.querySelector("#record");

      //reveal when clicked
      if (obj.style.transform === "" || obj.style.transform === "rotateY(180deg)") {
        obj.style.transform = "rotateY(0deg)";
        obj.firstElementChild.style.transform = "rotateY(0deg)";
        selected.push([obj.id, obj.firstElementChild.innerText]);
      }

      if (selected.length === 2) {
        if (selected[0][0] !== selected[1][0] && selected[0][1] === selected[1][1]) {
          score.innerText = parseInt(score.innerText) + 1;
          localStorage.setItem("memoryGameScore", parseInt(score.innerText) + 1);
          hideSolved();
          if (parseInt(score.innerText) > parseInt(record.innerText)) {
            record.innerText = score.innerText;
            localStorage.setItem("memoryGameRecord", parseInt(score.innerText));
          }
        } else {
          if (parseInt(score.innerText) > 0) {
            score.innerText = parseInt(score.innerText) - 1;
            localStorage.setItem("memotyGameScore", parseInt(score.innerText) - 1);
          }
          resetUnsolved();
        }
        selected = [];
      }
    });
  }
}

function hideSolved() {
  const cards = document.querySelectorAll(".card");
  for (c of cards) {
    if (c.style.transform === "rotateY(0deg)") {
      c.style.backgroundColor = "rgb(238, 255, 238)";
    }
  }
}

function resetUnsolved() {
  setTimeout(() => {
    const cards = document.querySelectorAll(".card");
    for (c of cards) {
      if (c.style.backgroundColor !== "rgb(238, 255, 238)") {
        c.style.transform = "rotateY(180deg)";
        c.firstElementChild.style.transform = "rotateY(180deg)";
      }
    }
  }, 500);
}

function createBoard(list, size) {
  document.body.style.setProperty("--matrix", Math.sqrt(parseInt(size)));

  const shuffledList = shuffleArray(list);
  const itens = shuffledList.slice(0, size / 2);
  const listOfCards = document.createElement("div");
  const doubledShuffledItens = shuffleArray(doubleArrayItens(itens));
  const board = document.querySelector("#board");
  for (let i = 0; i < doubledShuffledItens.length; i++) {
    const card = document.createElement("div");
    card.id = i;
    card.className = "card";
    card.innerHTML = cardTemplate;
    card.firstElementChild.innerText = doubledShuffledItens[i];
    listOfCards.append(card);
  }
  board.innerHTML = listOfCards.innerHTML;
  addCardsListeners();
}

function doubleArrayItens(array) {
  let result = [];
  for (item of array) {
    result.push(item);
    result.push(item);
  }
  return result;
}

function shuffleArray(array) {
  const ordered = array;
  const shuffled = [];
  while (ordered.length > 0) {
    const randomIndex = Math.floor(Math.random() * (ordered.length - 1));
    const selection = ordered.splice(randomIndex, 1)[0];
    shuffled.push(selection);
  }
  return shuffled;
}

let memoryGameItens = "🐥🐝🦋🦀🐢🦇🐠🐬🐖🐁🐞🐙🐓🦨🐈🐄🦜🦚🦥🐊🦍🐘🦭🐕🦒🦩🐍🦂🐇🦘🐳🦎";
let length = document.querySelector("#size").innerText;

createBoard([...memoryGameItens], 16);

//set the size
const sizeBigger = document.querySelector("#size-bigger");
const sizeSmaller = document.querySelector("#size-smaller");
const sizeList = [4, 16, 36, 64];

function setSize(size) {
  document.querySelector("#size").innerText = size;
  createBoard([...memoryGameItens], size);
}

sizeBigger.addEventListener("click", () => {
  const sizeElement = document.querySelector("#size");
  const sizeInt = parseInt(sizeElement.innerText);
  const index = sizeList.findIndex((x) => x === sizeInt);
  if (index < sizeList.length - 1) {
    setSize(sizeList[index + 1]);
    sizeElement.innerText = sizeList[index + 1];
  }
});

sizeSmaller.addEventListener("click", () => {
  const sizeElement = document.querySelector("#size");
  const sizeInt = parseInt(sizeElement.innerText);
  const index = sizeList.findIndex((x) => x === sizeInt);
  if (index > 0) {
    setSize(sizeList[index - 1]);
    sizeElement.innerText = sizeList[index - 1];
  }
});

//reset
document.querySelector("#reset").addEventListener("click", () => {
  document.querySelector("#score").innerText = "0";
  document.querySelector("#record").innerText = "0";
});

//save record locally

document.querySelector("#score").innerText = localStorage.getItem("memoryGame")?.score ?? 0;
document.querySelector("#record").innerText = localStorage.getItem("memoryGame")?.record ?? 0;

document.querySelector("#newGame").addEventListener("click", () => {
  const size = document.querySelector("#size").innerText;
  document.querySelector("#score").innerText = "0";
  createBoard([...memoryGameItens], size);
});
