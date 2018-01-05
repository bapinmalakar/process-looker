"use strict";
let electron = require("electron");
let { app, BrowserWindow } = electron;
let url = require("url");
let [path, fs] = [require("path"), require("fs")];
let window

function init() {
  window = new BrowserWindow({
    width: 900,
    height: 800,
    title: "Process Looker"
  });
  window.setMenu(null);
  window.isMaximizable(false);
  window.setResizable(false);
  window.loadURL(
    url.format({
      pathname: path.resolve(__dirname, "app/view/starter.html"),
      protocol: "file:",
      slashes: true
    })
  );
  window.on('clocsed', () => {
    window = null;
  })
}
app.on("ready", () => {
  console.log("Application start");
  init();
});

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    init();
  }
})
