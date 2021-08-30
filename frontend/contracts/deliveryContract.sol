// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.4;

contract Deliveries{
    Delivery[] public deliveries;

    function createDelivery (
    address transporter,
    address buyer,
    string memory description, 
    uint256 cost
    ) public{
        Delivery newDelivery = new Delivery(msg.sender, transporter, buyer, description, cost);
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
    string public description;
    uint256 public cost;

    constructor(address aSeller, address aTransporter, address aBuyer, string memory desc, uint256 price) {
        seller = aSeller;
        transporter = aTransporter;
        buyer = aBuyer;
        status = "Created";
        description = desc;
        cost = price;
    }
    

    function collected() public{
        require(msg.sender == transporter, "Only transporter can collect goods");
        status = "Collected";
    }

    function received() public{
        require(msg.sender == buyer, "Only buyer can receive the goods");
        status = "Received";
    }

    
}

