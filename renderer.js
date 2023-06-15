let button = document.getElementById("btn");
let nameInput = document.getElementById("name");

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
      element.innerHTML = `<div><p></p><h1>${name} left the session</h1></div>`;
      setTimeout(() => {
        element.remove();
      }, 1000);
    }
  });
  let button = document.getElementById("btn23");
  let sendText = document.getElementById("text");
  let data = [];
  button.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    let senderText = sendText.value;
    // data.push(senderText);
    window.electronApi.aboutSender(senderText);
  });
});
