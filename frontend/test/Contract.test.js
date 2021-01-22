const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
//connects to test network ganache, when running on different network e.g. Rinkeby, change "ganache.provider()"
const web3 = new Web3(ganache.provider());

