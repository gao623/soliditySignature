const util = require("./util");
const Web3Contract = require('web3-eth-contract');
const web3EthAbi = require("web3-eth-abi");

class Web3Client {
  constructor(network, host, port, options) {
    options = Object.assign({}, options);
    this.client = util.getClient(network, host, port, options);
    console.log("init success")
  }

  contractAt(abi, address) {
    let conInstance = new Web3Contract(abi, address);
    conInstance.setProvider(this.client.currentProvider);
    return conInstance;
    return new this.client.eth.Contract(abi, address);
  }

  call(contract, method, args, callback) {
    if (!Array.isArray(args)) {
      callback("invalid args, should be array");
      return;
    }
    let func = contract.methods[method];
    if (!!args.length) {
      func(...args).call(callback);
    } else {
      func().call(callback);
    }
  }

  static calcFuncSignature(funcName, abi) {
    let funcAbis = abi.filter(function (item) {
      return (item.type === 'function' && item.name === funcName);
    });
    if (!funcAbis.length) {
      return null;
    } else {
      return web3EthAbi.encodeFunctionSignature(funcAbis[0]);
    }
  }

  static calcSignatures(abi) {
    return abi.map(function (item) {
      if (item.type === 'function') {
        return {function: item.name, signature: web3EthAbi.encodeFunctionSignature(item)};
      } else if (item.type === 'event') {
        return {event: item.name, signature: web3EthAbi.encodeEventSignature(item)};
      }
      return null;
    }).filter(item => !!item);
  }

}

module.exports = Web3Client;