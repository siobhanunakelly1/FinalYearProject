// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.4;

contract Delivery {
    address public seller;
    address public transporter;
    address public buyer;
    string public status;

    constructor(address aTransporter, address aBuyer) {
        seller = msg.sender;
        transporter = aTransporter;
        buyer = aBuyer;
        status = "Created";
    }
    

    function collected() public{
        require(msg.sender == transporter, "Only transporter can collect goods");
        status = "Collected";
    }

    function recieved() public{
        require(msg.sender == buyer, "Only buyer can recieve the goods");
        status = "Received";
    }
}

