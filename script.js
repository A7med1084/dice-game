"use strict";

const body = document.querySelector("body");
const winner = document.querySelectorAll(".win");
const fire = document.querySelector(".pyro");
const dice1 = document.querySelectorAll(".one");
const dice2 = document.querySelectorAll(".tow");
const dice3 = document.querySelectorAll(".three");
const dice4 = document.querySelectorAll(".four");
const dice5 = document.querySelectorAll(".five");
const dice6 = document.querySelectorAll(".six");
const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
const allDices = document.querySelectorAll(".d");
const dice = document.querySelector(".dice");
const roll = document.querySelector(".roll");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const playerScore = document.querySelectorAll(".score");
const currentScore = document.querySelectorAll(".crt");
const hold = document.querySelector(".hold");
const restart = document.querySelector(".new");

let diceNumber = Math.trunc(Math.random() * 6) + 1;
let total = 0;
let score1 = 0;
let score2 = 0;
let check = true;
right.classList.add("check");

const disabledRightSection = function () {
  left.classList.remove("check");
  right.classList.add("check");
};
const disabledLeftSection = function () {
  left.classList.add("check");
  right.classList.remove("check");
};
const clear = function () {
  playerScore[0].textContent = "0";
  playerScore[1].textContent = "0";
  currentScore[0].textContent = "0";
  currentScore[1].textContent = "0";
  winner.forEach((el) => {
    el.style.opacity = "0";
  });
  dice.style.opacity = "0";
  total = 0;
  score1 = 0;
  score2 = 0;
  roll.disabled = false;
  hold.disabled = false;
  body.classList.remove("playerWin");
  fire.style.display = "none";
  roll.style.cursor = "pointer";
  hold.style.cursor = "pointer";
};
const playerWinner = function (num) {
  roll.disabled = true;
  hold.disabled = true;
  body.classList.add("playerWin");
  winner[num].style.opacity = "1";
  fire.style.display = "block";
  roll.style.cursor = "not-allowed";
  hold.style.cursor = "not-allowed";
};

restart.addEventListener("click", clear);

hold.addEventListener("click", function () {
  if (check) {
    disabledLeftSection();
    score1 += total;
    playerScore[0].textContent = score1;
    currentScore[0].textContent = "0";
    check = false;
    if (score1 >= 100) {
      disabledRightSection();
      playerWinner(0);
    }
  } else {
    disabledRightSection();
    score2 += total;
    playerScore[1].textContent = score2;
    currentScore[1].textContent = "0";
    check = true;
    if (score2 >= 100) {
      disabledLeftSection();
      playerWinner(1);
    }
  }
  total = 0;
});

roll.addEventListener("click", function () {
  dice.classList.add("move");
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.style.opacity = "1";
  allDices.forEach((el) => (el.style.opacity = "0"));
  dices[diceNumber - 1].forEach((el) => (el.style.opacity = "1"));
  if (diceNumber === 1) {
    total = 0;
    if (check) {
      disabledLeftSection();
      currentScore[0].textContent = "0";
      check = false;
    } else {
      currentScore[1].textContent = "0";
      disabledRightSection();
      check = true;
    }
  } else if (check) {
    total += diceNumber;
    currentScore[0].textContent = total;
  } else {
    total += diceNumber;
    currentScore[1].textContent = total;
  }
});
