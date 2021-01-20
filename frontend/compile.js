const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'deliveryContract.sol');

const source = fs.readFileSync(contractPath, 'UTF-8');

//console.log(solc.compile(source, 1));


var input = {
    language: 'Solidity',
    sources: {
        'deliveryContract.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['deliveryContract.sol'];