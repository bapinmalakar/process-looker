"use strict";
alert('run');
let $ = require("jquery");
const remote = require("electron").remote;
remote.app.getAppPath();
const path = require("path");
const processHelper = require(path.resolve(__dirname , "../script/process.js"));
let processDetails = [];
let snapTime, processNumber;

$(document).ready(() => {
  $("#progressDiv").hide();
});

$("#snapBtn").on("click", async () => {
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
    prepareList();
    $("#snapBtn").text("Take Current Processes Snapshot");
    $("#snapBtn").prop("disabled", false);
  } catch (err) {
    alert("Some error occured, try again!");
    $("#snapBtn").text("Take Current Processes Snapshot");
    $("#snapBtn").prop("disabled", false);
  }
});

function prepareList() {
  $("#snapInfo").text(
    `SnapTime:${snapTime} Number Of Process: ${processNumber}     Different type of Process: ${
      processDetails.length
    }`
  );
  let color = ["#00008b", "white"];
  let i = 0;
  $("ul").empty();
  let ul = $("ul");
  for (let item of processDetails) {
    ul.append(
      `<li id="list-${i}" title="${item.count} of process ${
        item.name
      }" onclick="listClick(${i})"><b><span style="color: ${
        color[i % 2]
      }; cursor: pointer;">${item.name}     ${item.count}</span></b></li>`
    );
    i++;
  }
}
//

function listClick(id) {
  let data = processDetails[id];
  $(".processHeader h2").text(data.name);
  $(".processBody").empty();
  let i = 0;
  for (let item of data.data) {
    let divString = `<div class="row" style="padding-top: 1%;width: 100%"><h4 style="color: white;"><span>${
      item.name
    }</span><span style="padding-left: 2%;">Process Id: ${
      item.id
    }</span><span style="padding-left: 2%;">Port: ${
      item.port
    }</span><span style="padding-left: 2%;">Memory: ${
      item.memory
    }</span>
    </h4>
  </div>`;
    $(".processBody").append(divString);
    i++;
  }
}
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
    snapTime = formateDate;
    processNumber = processes.length;
    $("#snapInfo").text(
      `SnapTime:${formateDate} Number Of Process: ${processes.length}`
    );
    return processes;
  } catch (err) {
    throw err;
  }
}
