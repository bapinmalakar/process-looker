"use strict";
let util = require("util");
let exec = util.promisify(require("child_process").exec);

module.exports = {
  processFind: async () => {
    try {
      let processDetails = [];
      let list = await exec("netstat -a -n -o");
      let files = list.split("\r\n");
      let emptyEle = files.filter(
        d => d == "" || d.includes("PID") || d.includes("Active")
      );
      emptyEle.map(d => {
        let ind = files.findIndex(e => e == d);
        files.splice(ind, 1);
      });
      let processArray = [];
      for (let item of files) {
        let newItem = item.split(" ");
        newItem = newItem.filter(k => k != "");
        let port = newItem[1].split(":");
        port = port[port.length - 1];
        let prepareItem = [newItem[0], newItem[newItem.length - 1], port];
        processArray.push(prepareItem);
      }
      return processArray;
    } catch (err) {
      throw err;
    }
  },

  processDetails: async process => {
    try {
      let processDes = await exec(`tasklist /fi "pid eq ${process[1]}"`);
      let processData = processDes.split("\r\n");
      processData = processData[processData.length - 2];
      processData = processData.split(" ");
      processData = processData.filter(m => m != "");
      processData[processData.length - 2] =
        processData[processData.length - 2] +
        processData[processData.length - 1];
      processData.splice(processData.length - 1, 1);
      return {
        name: processData[0],
        id: process[1],
        port: process[2],
        memory: processData[processData.length - 1]
      };
    } catch (err) {
      throw err;
    }
  },

  filterProcessData: process => {
    let filterData = [];
    for (let items of processDetails) {
      let key = items.name;
      let ind = filterData.findIndex(d => key == d.name);
      if (ind == -1) {
        let obj = {
          name: items.name,
          data: [items],
          count: 1
        };
        filterData.push(obj);
      } else {
        filterData[ind].data.push(items);
        filterData[ind].count = filterData[ind].data.length;
      }
    }
    return filterData;
  },

  processKill: async pid => {
    try {
      alert(pid);
      let output = await exec("taskkill /pid " + pid + " /f");
    } catch (err) {
      alert(err);
      throw err;
    }
  }
};
