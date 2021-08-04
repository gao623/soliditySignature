const Web3Client = require("web3");
const Web3Admin = require('./web3Admin.js');

const WEB3_USER=""
const WEB3_PWD=""

const LOG_USER="elastic"
const LOG_PWD="wanglu"

function getClient(network, host, port, options) {
  options = Object.assign({}, {ssl:{enabled: false, strict: false}}, options);
  console.log("=====options:", options);
  let nodeUrl = host;
  if (nodeUrl.indexOf("http") < 0) {
    nodeUrl = `http://${nodeUrl}`;
  }
  if (port) {
    nodeUrl = `${nodeUrl}:${port}`;
  }
  console.log("nodeUrl:", nodeUrl);
  let timeoutMs = 20000;
  let client = new Web3Client(new Web3Client.providers.HttpProvider(nodeUrl, timeoutMs));
  Web3Admin.extend(client);
  return client;
}

module.exports = {
  getClient
};