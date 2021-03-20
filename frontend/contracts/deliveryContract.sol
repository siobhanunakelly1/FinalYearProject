// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.4;

contract Deliveries{
    Delivery[] public deliveries;

    function createDelivery (
    address transporter,
    address buyer
    ) public{
        Delivery newDelivery = new Delivery(msg.sender, transporter, buyer);
        deliveries.push(newDelivery);
    }

    function returnAllDeliveries() public view returns(Delivery[] memory){
        return deliveries;
    }

}

contract Delivery {
    address public seller;
    address public transporter;
    address public buyer;
    string public status;

    constructor(address aSeller, address aTransporter, address aBuyer) {
        seller = aSeller;
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

