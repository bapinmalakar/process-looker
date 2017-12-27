"use strict";
let electron = require("electron");
let { app, BrowserWindow } = electron;
let url = require("url");
let [path, fs] = [require("path"), require("fs")];

function init() {
  let window = new BrowserWindow({
    width: 900,
    height: 800,
    title: "Process Looker",
    icon: path.resolve("./assests/images/process-loocker.png")
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
}
app.on("ready", () => {
  console.log("Application start");
  init();
});
