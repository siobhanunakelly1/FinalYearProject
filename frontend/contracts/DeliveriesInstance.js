import web3 from './web3-metamask';

const address = '0xC086b88c4AA31510b3e283743ED54239D04Be1E4'


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
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
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