/*const Web3 = require('web3');

const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
    'endless lottery tornado season various author bunker mix human scene police exact',
    'https://rinkeby.infura.io/v3/b5d23e54374e4956800cdccde15e8d28'
);
const web3 = new Web3(provider);*/

import web3 from './web3'

const contractFile = require('../compile');

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

let delivery;

const deploy = async (transporter, buyer) =>{
    const accounts = await web3.eth.getAccounts();
    delivery = await new web3.eth.Contract(abi)
    .deploy({data: bytecode, arguments: [transporter, buyer]})
    .send({ from: accounts[0], gas: '5000000'});
    console.log(delivery.options.address);
}

//deploy('0x10863742Fd543f441325588c35f81517ef08A7f9', '0xd86Fdd7BC008dA187c9e52934f975ABbc9d492fd');
export default deploy;