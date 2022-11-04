// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract VendingMachine {
    address public owner; // owner of smart contract
    mapping(address => uint256) public coffeeBalances;

    constructor() {
        owner = msg.sender; //init owner par l'adresse ethereum de celui qui a effectué la transaction/ deployé le contrat
        coffeeBalances[address(this)] = 100; //init la balance du contrat courant
    }

    function getBalance() public view returns (uint256) {
        //view => cette fonction ne va rien changer mais seulement lire les données
        return coffeeBalances[address(this)];
    }

    //restock vending machine
    function restock(uint256 amount) public {
        // Vérifier que l'owner seul qui peut restocker
        require(msg.sender == owner, "Only the owner can restock the machine");
        coffeeBalances[address(this)] += amount;
    }

    function purchase(uint256 amount) public payable {
        //Vérifier que le montant est supérieur ou égale au prix d'un café
        require(
            msg.value >= amount * 1 ether, // msg.value => les ethers reçus
            "You must pay at least 1 ether to get your coffee!"
        );

        require(
            coffeeBalances[address(this)] >= amount,
            "Sorry, there is no more coffee :("
        );
        //Décrémenter la balance du contrat
        coffeeBalances[address(this)] -= amount;
        //Incrémenter la balance de l'acheteur
        coffeeBalances[msg.sender] += amount;
    }
}
