//const ganache = require('ganache-cli');
const Web3 = require('web3');
//connects to test network ganache, when running on different network e.g. Rinkeby, change "ganache.provider()"
//const web3 = new Web3(ganache.provider());
async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function load() {
    await loadWeb3();
}

load();
const contractFile = require('../compile');

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

//let delivery;
//let accounts;

async function deploy(seller, transporter, buyer){
    const delivery = await new window.web3.eth.Contract(abi)
    .deploy({data: bytecode, arguments: [transporter, buyer]})
    .send({ from: seller, gas: '5000000'});
    console.log(delivery.options.address);
}

deploy();