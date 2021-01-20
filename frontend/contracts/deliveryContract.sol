// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.4;

contract Counter {
    
    event ValueChanged(uint oldValue, uint256 newValue);
    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;
    // Function that increments our counter
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }
    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }
}