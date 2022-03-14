const baseURL = "https://api.adviceslip.com/advice"

const adviceContainer = document.querySelector(".advice-container")
let adviceID = document.querySelector(".advice-id")
let adviceContent = document.querySelector(".advice-content")

const randomizeBtn = document.querySelector(".randomize-btn")
const dice = document.querySelector(".dice")
const diceIcon = `<img class="dice" src="./images/icon-dice.svg" alt="dice icon">`

// Disable the randomizeBtn for 2 seconds
function disableButton() {
  dice.remove()
  randomizeBtn.disabled = true
  randomizeBtn.classList.add("disabled")
}

// Re-enable the randomizeBtn after 2 seconds
function enableButton() {
  randomizeBtn.innerHTML = diceIcon
  randomizeBtn.disabled = false
  randomizeBtn.classList.remove("disabled")
}

// 1. Show skeleton loader
// 2. Hide the adviceID and adviceContent when loading
function showLoader() {
  adviceID.innerText = ""
  adviceContent.innerText = ""
  adviceID.classList.add("is-loading")
  adviceContent.classList.add("is-loading")
}

// Hide the loader when data is loaded
function hideLoader() {
  adviceID.classList.remove("is-loading")
  adviceContent.classList.remove("is-loading")
}

// Show the counter on the randomizeBtn when the button is disabled
function showCount(i) {
  randomizeBtn.innerHTML = `<span>${i}</span>`
}

// Countdown for a desired amount of seconds before re-enabling the button
function countdown(seconds) {
  let counter = seconds
  showCount(counter)

  const timer = setInterval(() => {
    counter--
    showCount(counter)
  }, 1000);

  setTimeout(() => {
    clearInterval(timer)
    enableButton()
    counter = seconds
  }, (seconds * 1000));
}

// 1. Show skeleton loader before the data is loaded
// 2. Update the adviceID and adviceContent when data is loaded
// 3. Hide the loader when data is loaded
function loadAdvice() {
  showLoader()
  fetch(baseURL)
  .then(response => response.json())
  .then(data => {
    adviceID.innerText = `Advice #${data.slip.id}`,
    adviceContent.innerText = data.slip.advice
    hideLoader()
  })
  .catch(err => console.log(err))
}

function updateAdvice() {
  loadAdvice()
  disableButton()
  countdown(2)
}

document.addEventListener("DOMContentLoaded", loadAdvice)
randomizeBtn.addEventListener("click", updateAdvice)
