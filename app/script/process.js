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
  }
};
