let button = document.getElementById("btn");
let nameInput = document.getElementById("name");
let finalData = [];
let people = 1;

button.addEventListener("click", () => {
  const name = nameInput.value;
  people += 2;
  if (name) {
    window.electronApi.openMember(name);
    // creates the body in Renderer One
    let createDiv = document.createElement("div");
    document.body.append(createDiv);
    createDiv.innerHTML = `<div id="parent-${name}">
    <p></p>
    <h1>${name} is Connected</h1>
    <div id="child-${name}"></div>
    <input id="text-${name}" type="text"/>
    <button class="btn23">send</button>
    </div>`;
  }
  // Closing the Dynamic created Renderer
  window.electronApi.portClose((_event, value) => {
    if (value) {
      const element = document.querySelector(`#parent-${value}`); //-${value}
      element.innerHTML = `<div id="main">
      <p></p>
      <h1>${value} left the session</h1>
      </div>`;
      setTimeout(() => {
        element.remove();
        finalData = [];
      }, 1000);
    }
  });
  // Sending data to particular Renderer by using name
  let buttons = document.querySelectorAll(".btn23");
  let sendText = document.getElementById(`text-${name}`);

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      let senderText = { id: "main", text: sendText.value, port: name };
      finalData.push(senderText);
      window.electronApi.aboutSender(senderText);
      let message = document.getElementById("child");
      let div = "<div>";
      finalData
        .filter((el) => el.id === name)
        .map((el, i, arr) => {
          div += `<h3>${el.id}:  ${el.text}</h3>`;
          // div += `<h2>${el}</h2>`;
          if (arr.length === i) {
            div += "</div>";
          }
        });
      message.innerHTML = div;
    });
  });
});

window.electronApi.receivedMessage((_event, data) => {
  let message = document.getElementById(`child-${data.id}`);
  finalData.push(data);
  let div = "<div>";
  finalData
    .filter((el) => el.id === data.id)
    .map((el, i, arr) => {
      div += `<h3>${el.id}:  ${el.text}</h3>`;
      // div += `<h2>${el}</h2>`;
      if (arr.length === i) {
        div += "</div>";
      }
    });
  message.innerHTML = div;
});
