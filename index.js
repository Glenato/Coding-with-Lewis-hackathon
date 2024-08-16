localStorage.getItem("state", "start");
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      let input = inputField.value;
      inputField.value = "";
      output(input);
    }
  });
});

function output(input) {
  let product;
  localStorage.setItem("question", input);
  if (input.trim() == "") { 
    // Search for exact match in `prompts`
    product = ["Say something  :("];
  } 
   else {
    window.location.href = "./captcha.html";
    product = localStorage.getItem("response");
  }

  // Update DOM
  addChat(input, product);
}

function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="random guy.png" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botImg.src = "./Rubber_ducks/Cool_ruber_duck_profile.png";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Typing...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000
  )
}
window.onload = write_to_chat()

function write_to_chat(){
  if (localStorage.getItem("writetochat") == "write"){
    localStorage.setItem("writetochat", "nothingtowrite");
    addChat(localStorage.getItem("question"), localStorage.getItem("response"));
  }
  else{
    localStorage.clear();
  }
}