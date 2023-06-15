let getDiv = document.getElementById("port2");
let member = document.getElementById("member");
window.electronApi.getName((_event, value) => {
  getDiv.innerHTML = `<h1>Welcome ${value}</h1>`;
});

window.electronApi.received((_event, value) => {
  member.innerHTML = value;
});
