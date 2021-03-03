const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'deliveryContract.sol');

const source = fs.readFileSync(contractPath, 'utf8');

//console.log(solc.compile(source, 1));


var input = {
    language: 'Solidity',
    sources: {
        'deliveryContract.sol' : {
            content: source
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ],
            },
        },
    },
}; 

const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['deliveryContract.sol']['Delivery'];
module.exports = contractFile;

