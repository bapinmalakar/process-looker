"use strict";
let $ = require("jquery");
const remote = require("electron").remote;
remote.app.getAppPath();
const path = require("path");
const processHelper = require(path.resolve("app/script/process.js"));
let processDetails = [];

$(document).ready(() => {
  alert("Script loade");
  $("#progressDiv").hide();
});
$("#snapBtn").on("click", async () => {
  alert("btn clicked");
  $("#snapBtn").text("Wait........");
  $("#snapBtn").prop("disabled", true);
  try {
    let processList = await getProcessList();
    let i = 1;
    processDetails = [];
    $("#progressDiv").show();
    for (let process of processList) {
      let processData = await processHelper.processDetails(process);
      processDetails.push(processData);
      let progress = i / processList.length * 100;
      $(".progress-bar")
        .attr("aria-valuenow", Math.round(progress))
        .css("width", Math.round(progress).toString() + "%");
      $(".progress-bar").text(Math.round(progress).toString() + "%");
      i++;
    }
    processDetails = processHelper.filterProcessData(processDetails);
    $("#snapBtn").text("Take Current Processes Snapshot");
    $("#snapBtn").prop("disabled", false);
  } catch (err) {
    alert("Some error occured, try again!" + err);
    $("#snapBtn").text("Take Current Processes Snapshot");
    $("#snapBtn").prop("disabled", false);
  }
});
async function getProcessList() {
  try {
    let processes = await processHelper.processFind();
    let date = new Date();
    const formateDate =
      date.getHours().toString() +
      ":" +
      date.getMinutes().toString() +
      ":" +
      date.getSeconds().toString();
    $("#snapInfo").text(
      `SnapTime:${formateDate} Number Of Process: ${processes.length}`
    );
    return processes;
  } catch (err) {
    throw err;
  }
}
