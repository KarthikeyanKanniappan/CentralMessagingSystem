let getDiv = document.getElementById("port2");
let member = document.getElementById("member");
let button = document.getElementById("button");
let sender = document.getElementById("sender");
let finalData = [];
let bigName;
window.electronApi.getName((_event, value) => {
  bigName = value;
  getDiv.innerHTML = `<h1>Welcome ${value}</h1>`;
});

button.addEventListener("click", () => {
  let data = { id: bigName, text: sender.value };
  finalData.push(data);
  window.electronApi.sendMessage(data);
  let div = "<div>";
  finalData.map((el, i, arr) => {
    div += `<h3>${el.id}:  ${el.text}</h3>`;
    // div += `<h2>${el}</h2>`;
    if (arr.length === i) {
      div += "</div>";
    }
  });
  member.innerHTML = div;
});

window.electronApi.received((_event, value) => {
  finalData.push(value);
  let div = "<div>";
  finalData.map((el, i, arr) => {
    div += `<h3>${el.id}:  ${el.text}</h3>`;
    if (arr.length === i) {
      div += "</div>";
    }
  });
  member.innerHTML = div;
});
