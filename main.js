const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let arr = [];
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
  // win2.on("close", () => {
  //   // win1.webContents.send("close-port", true);
  //   // arr.forEach((el, i) => {
  //   //   console.log(win2.webContents.id);
  //   // if (el.content.webContents.id === win2.webContents.id) {
  //   //   console.log(el.myname);
  //   //   win1.webContents.send("close-port", el.myname);
  //   // }
  //   // });
  // });
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
    arr.push({ myname: name, content: win2 });
    win2.webContents.on("did-finish-load", () => {
      win2.webContents.send("moving-name", name);
    });
    // console.log(arr);
  });

  ipcMain.on("about-text", (event, text) => {
    arr.forEach((el) => {
      if (el.myname === text.port) {
        let win = el.content;
        win.webContents.send("got", text);
      }
    });
  });

  // sending data to primary renderer
  ipcMain.on("sending", (event, value) => {
    win1.webContents.send("receiving", value);
  });

  ipcMain.on("renderer-closed", (event, value) => {
    win1.webContents.send("close-port", value);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
