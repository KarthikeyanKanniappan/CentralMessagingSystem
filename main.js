const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win1;
let win2;

function addMember() {
  win2 = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win2.loadFile("member.html");
  win2.webContents.openDevTools();
  win2.on("close", () => {
    // win.webContents.send("close-port", true);
    win1.webContents.send("close-port", true);
  });
  return win2;
}

const createWindow = () => {
  win1 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win1.loadFile("index.html");

  win1.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.on("openBox", (event, name) => {
    let win2 = addMember();
    win2.webContents.on("did-finish-load", () => {
      win2.webContents.send("moving-name", name);
    });
  });

  ipcMain.on("about-text", (event, text) => {
    win2.webContents.send("got", text);
  });

  ipcMain.on("sending", (event, value) => {
    win1.webContents.send("receiving", value);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
