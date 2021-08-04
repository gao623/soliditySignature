const fs = require('fs');
const path = require('path');
const pu = require('promisefy-util');
const Web3Client = require("./");

function sleep(time) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, time);
  })
}

function saveData(name, data) {
  const filePath = path.format({dir:__dirname, base:`${name}`});
  fs.writeFileSync(filePath,data);
}

async function showRequest(web3, func, ...args) {
  let tag = `Web3Client ${func}`;
  try {
    console.time(tag)
    result = await pu.promisefy(web3[func], args, web3)
    console.timeEnd(tag);
    let resString = JSON.stringify(result);
    if (resString.length > 16 * 1024) {
      saveData(`${func}.json`, resString);
      console.log(tag, "Save to :", `${func}.json`);
    } else {
      console.log(tag, "Result:", JSON.stringify(result));
    }
    return result;
  } catch (err) {
    console.timeEnd(tag);
    console.log(tag, "Error:", err);
  // } finally {
  //   console.timeEnd(tag);
  }
}

async function showResult(func, result) {
  let tag = `Web3Client ${func}`;
  try {
    console.time(tag)
    let resString = JSON.stringify(result);
    if (resString.length > 16 * 1024) {
      saveData(`${func}.json`, resString);
      console.log(tag, "Save to :", `${func}.json`);
    } else {
      console.log(tag, "Result:", JSON.stringify(result));
    }
    return result;
  } catch (err) {
    console.timeEnd(tag);
    console.log(tag, "Error:", err);
  // } finally {
  //   console.timeEnd(tag);
  }
}

async function testStoremanGroupDelegate(abi) {
  let allSignatures = Web3Client.calcSignatures(abi);
  await showResult("calcSignatures", allSignatures);
}

const contractAbis = {
  CrossDelegate:require("./abi/abi.CrossDelegate.json"),
  StoremanGroupDelegate:require("./abi/abi.StoremanGroupDelegate.json"),
};

testStoremanGroupDelegate(contractAbis.StoremanGroupDelegate);