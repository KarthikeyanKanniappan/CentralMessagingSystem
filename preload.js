const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  //   openMember: () => ipcRenderer.invoke("openBox"),
  openMember: (name) => ipcRenderer.send("openBox", name),
  aboutSender: (text) => ipcRenderer.send("about-text", text),
  getName: (callback) => ipcRenderer.on("moving-name", callback),
  portClose: (callback) => ipcRenderer.on("close-port", callback),
  received: (callback) => ipcRenderer.on("got", callback),
  sendMessage: (text) => ipcRenderer.send("sending", text),
  receivedMessage: (call) => ipcRenderer.on("receiving", call),
  send: (text) => ipcRenderer.send("renderer-closed", text),
});
