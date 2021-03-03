const assert = require('assert');
const { exception } = require('console');
const ganache = require('ganache-cli');
const Web3 = require('web3');
//connects to test network ganache, when running on different network e.g. Rinkeby, change "ganache.provider()"
const web3 = new Web3(ganache.provider());
const truffleAssert = require('truffle-assertions');

const contractFile = require('../compile');

const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

let accounts;
let delivery;


beforeEach(async() => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //use account to deploy contract
    
    delivery = await new web3.eth.Contract(abi)
        .deploy({data: bytecode, arguments: [accounts[1], accounts[2]]})
        .send({ from: accounts[4], gas: '5000000'});
    
});

describe("Contract Creation", async() => {
    it("deploys a contract", () => {
        console.log(delivery.options.address);
        assert.ok(delivery.options.address);
    });
    it("transporter is set", async () => {
        const transporter = await delivery.methods.transporter().call();
        assert.strictEqual(transporter, accounts[1]);
    });
    it("seller is set", async () => {
        const seller = await delivery.methods.seller().call();
        assert.strictEqual(seller, accounts[4]);
    });
    it("buyer is set", async () => {
        const buyer = await delivery.methods.buyer().call();
        assert.strictEqual(buyer, accounts[2]);
    });
    it("status is'created'", async () => {
        const status = await delivery.methods.status().call();
        assert.strictEqual(status, "Created");
    });
});

describe("Delivery Collected", async() =>{
    it("Seller cannot collect delivery", async () => {
        await truffleAssert.reverts(delivery.methods.collected().send({from: accounts[4]}), "Only transporter can collect goods");
    });
    it("Transporter can collect delivery", async () => {
        await delivery.methods.collected().send({from: accounts[1]});
        const status = await delivery.methods.status().call();
        assert.strictEqual(status, "Collected");
    });
});

describe("Delivery Delivered", async() =>{
    it("Transporter cannot recieve delivery", async () => {
        await truffleAssert.reverts(delivery.methods.recieved().send({from: accounts[1]}), "Only buyer can recieve the goods");
    });
    it("Buyer can recieve delivery", async () => {
        await delivery.methods.recieved().send({from: accounts[2]});
        const status = await delivery.methods.status().call();
        assert.strictEqual(status, "Received");
    });
});