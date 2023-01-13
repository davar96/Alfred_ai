import bot from "./assets/bot.png";
import user from "./assets/user.png";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chatContainer");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";
    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 10);
}

function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexdecimalString = randomNumber.toString(16);

  return `id-${timeStamp}-${hexdecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
    <div class="wrapper ${isAi && "ai"}">
                <div class="chat">
                    <div class="profile">
                        <img src ="${isAi ? bot : user}" 
                        alt="${isAi ? "Alfred" : "Batman"}">
                    </div>
                    <div class="message" id=${uniqueId}>${value}</div>></div>
                </div>
            </div>
    `;
}

const hundleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // Batman chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  // Alfred chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById("uniqueId");

  loader(messageDiv);
};

form.addEventListener("submit", hundleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    hundleSubmit(e);
  }
});
