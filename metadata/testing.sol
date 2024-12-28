// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address[] public players;

    // Contract initialization
    constructor() {
        manager = msg.sender; // Manager is the contract creator
    }

    // Enter the lottery by sending ETH
    function enter() public payable {
        require(msg.value > .01 ether, "Minimum ETH required is 0.01");

        // Player enters by sending Ether, and their address is added to the players array
        players.push(msg.sender);
    }

    // Return a random number to select the winner
    function random() private view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    // Pick the winner
    function pickWinner() public restricted {
        uint256 index = random() % players.length;
        address winner = players[index];

        // Transfer the total balance to the winner
        payable(winner).transfer(address(this).balance);

        // Reset the players array for the next round
        players = new address ;
    }

    // Modifier to restrict certain functions to the manager
    modifier restricted() {
        require(msg.sender == manager, "You are not the manager");
        _;
    }

    // Get all the players in the lottery
    function getPlayers() public view returns (address[] memory) {
        return players;
    }
}
