let button = document.getElementById("btn");
let nameInput = document.getElementById("name");
let finalData = [];

button.addEventListener("click", () => {
  const name = nameInput.value;

  if (name) {
    window.electronApi.openMember(name);
    let createDiv = document.createElement("div");
    document.body.append(createDiv);
    createDiv.innerHTML = `<div id="parent">
    <p></p>
    <h1>${name} is Connected</h1>
    <div id="child"></div>
    <input id="text" type="text"/>
    <button id="btn23">send</button>
    </div>`;
  }
  window.electronApi.portClose((_event, value) => {
    if (value) {
      const element = document.querySelector("#parent");
      element.innerHTML = `<div id="main">
      <p></p>
      <h1>${name} left the session</h1>
      </div>`;
      setTimeout(() => {
        element.remove();
        finalData = [];
      }, 1000);
    }
  });
  let button = document.getElementById("btn23");
  let sendText = document.getElementById("text");

  button.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    let senderText = { id: "main", text: sendText.value };
    finalData.push(senderText);
    window.electronApi.aboutSender(senderText);
    let message = document.getElementById("child");
    let div = "<div>";
    finalData.map((el, i, arr) => {
      div += `<h3>${el.id}:  ${el.text}</h3>`;
      // div += `<h2>${el}</h2>`;
      if (arr.length === i) {
        div += "</div>";
      }
    });
    message.innerHTML = div;
  });
});

window.electronApi.receivedMessage((_event, data) => {
  let message = document.getElementById("child");
  finalData.push(data);
  let div = "<div>";
  finalData.map((el, i, arr) => {
    div += `<h3>${el.id}:  ${el.text}</h3>`;
    // div += `<h2>${el}</h2>`;
    if (arr.length === i) {
      div += "</div>";
    }
  });
  message.innerHTML = div;
});
