"use strict";
let $ = require("jquery");
const remote = require("electron").remote;
remote.app.getAppPath();
const path = require("path");
const processHelper = require(path.resolve("app/script/process.js"));
let processList = [];

$(document).ready(() => {
  alert("Script loade");
  $("#progressDiv").hide();
});
$("#snapBtn").on("click", async () => {
  alert("btn clicked");
  $("#snapBtn").text("Wait........");
  $("#snapBtn").prop("disabled", true);
  try {
    await getProcessList();
  } catch (err) {
    alert("err3");
    $("#snapBtn").prop("disabled", false);
  }
});
async function getProcessList() {
  try {
    processList = await processHelper.processFind();
    let date = new Date();
    const formateDate =
      date.getHours().toString() +
      ":" +
      date.getMinutes().toString() +
      ":" +
      date.getSeconds().toString();
    const numberOfProcess = processList.length;
    $("#snapInfo").text(
      `SnapTime:${formateDate} Number Of Process: ${numberOfProcess}`
    );
  } catch (err) {
    alert("Error2" + err);
    throw err;
  }
}
