//Game Configs
const allDisplayLetters = document.querySelector(".word").children;
const gameResultPopUp = document.querySelector(".game-result");
const displayPlayerScore = document.querySelector(".player-score");
const displayCpuScore = document.querySelector(".cpu-score");

let selectedKey,
  rightAnswer,
  rightAnswerArray,
  playerScore = 0,
  cpuScore = 0,
  chosenTip;

//Set Tip
function setTip() {
  const tip = document.querySelector(".tip");
  const randomTip = getRandom(0, options.length);

  tip.innerText = options[randomTip].tip;
  chosenTip = randomTip;
}

//Set Word
function setWord() {
  const randomWord = getRandom(0, options[chosenTip].words.length);

  rightAnswer = options[chosenTip].words[randomWord];

  rightAnswerArray = rightAnswer.split("");
}

//Put Space For Words
function wordSpaces() {
  const rightAnswerField = document.querySelector(".word");

  rightAnswerField.innerHTML = "";

  for (let i = 0; i < rightAnswer.length; i++) {
    const newSpace = document.createElement("div");
    rightAnswerField.appendChild(newSpace);
    newSpace.classList.add("underline");
  }
}

//Separate Words
function separateWords() {
  let wordSpace = [];
  for (let i = 0; i < rightAnswer.length; i++) {
    if (rightAnswerArray[i] == " ") {
      wordSpace.push(i);
    }
  }

  for (const index of wordSpace) {
    allDisplayLetters[index].innerText = "-";
  }
}

//Display Key click Event
const allKeys = document.querySelectorAll(".line span");
const doll = document.querySelector(".doll").children;

let attempt = -1;

for (const key of allKeys) {
  key.addEventListener("click", () => {
    SelectKey(key);
  });
}

//Keyboard Click Event
document.addEventListener("keypress", (el) => {
  keyUpperCase = el.key.toUpperCase();
  key = document.querySelector(`[data-letter="${keyUpperCase}"]`);
  return key != null ? SelectKey(key) : false;
});

//Select Key
function SelectKey(key) {
  const letter = key.innerText.toLowerCase();

  key.style.pointerEvents = "none";

  if (rightAnswerArray.includes(letter)) {
    key.style.backgroundColor = "var(--background-color)";
  } else {
    attempt += 1;
    youLose();
    key.style.backgroundColor = "var(--primary-color)";
    doll[attempt].classList.remove("hidden");
  }

  let letterIndex = [];

  for (let i = 0; i < rightAnswer.length; i++) {
    if (rightAnswerArray[i] == letter) letterIndex.push(i);
  }

  for (const index of letterIndex) {
    allDisplayLetters[index].innerText = letter;
  }
  youWin();
}
//Set Game
function setGame() {
  setTip();
  setWord();
  wordSpaces();
  separateWords();
  populateGameResultModal();
}
setGame();

//You Lose
function youLose() {
  if (attempt == 5) {
    cpuScore += 1;
    gameResultPopUp.classList.remove("hidden");
    displayCpuScore.innerText = cpuScore;
  }
}

//You win
function youWin() {
  if (checkVictory()) {
    playerScore += 1;
    gameResultPopUp.classList.remove("hidden");
    displayPlayerScore.innerText = playerScore;
  }
}
function checkVictory() {
  let check = 0;
  for (const displayLetter of allDisplayLetters) {
    if (displayLetter.innerText == "") {
      check += 1;
    }
  }

  if (check == 0) {
    return true;
  }
}

//Populate Game Result Modal
function populateGameResultModal() {
  const rightAnswerDisplay = document.querySelector(".right-answer");
  rightAnswerDisplay.innerText = rightAnswer;
}
populateGameResultModal();

//New Game
function newGame() {
  const btnNewGame = document.querySelector(".game-result button");

  btnNewGame.addEventListener("click", () => {
    attempt = -1;

    gameResultPopUp.classList.add("hidden");

    for (const displayLetter of allDisplayLetters) {
      displayLetter.innerText = "";
    }

    for (const member of doll) {
      member.classList.add("hidden");
    }

    for (const key of allKeys) {
      key.style.backgroundColor = null;
      key.style.pointerEvents = null;
    }

    setGame();
  });
}
newGame();
