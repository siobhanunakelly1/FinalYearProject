import web3 from './web3-metamask';

const address = '0x954546C82E02321Fc260Ac8cF24Da74787963080'

const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "transporter",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "createDelivery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "deliveries",
		"outputs": [
			{
				"internalType": "contract Delivery",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "returnAllDeliveries",
		"outputs": [
			{
				"internalType": "contract Delivery[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const instance = new web3.eth.Contract(abi, address);

export default instance;