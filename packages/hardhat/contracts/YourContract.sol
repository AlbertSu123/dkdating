pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DKDating is ERC20{

  struct User {
    string name;
    string bio;
    string picture;
    uint amount;
    address[] likes;
    address[] matches;
    uint password;
    uint lockedBal;
  }

  mapping(address => User) users;
  address[] userList;

  constructor() ERC20("A", "A"){
    // what should we do on deploy?
  }

  function createUser(string memory name, string memory bio, string memory picture, uint amount, uint password) public {
    require(users[msg.sender].amount == 0);
    _mint(msg.sender, amount);
    users[msg.sender] = User(name, bio, picture, amount, new address[](0), new address[](0), password, 0);
    userList.push(msg.sender);
  }

  function swipeOnUser(bool yes, address user, uint amount) public {
    require(users[msg.sender].amount != 0 && users[user].amount != 0, "One user(s) aren't in the system!");
    if (yes){
      //Check if they liked you
      for(uint i=0; i < users[user].likes.length; i++){
        if(users[user].likes[i] == msg.sender){
          users[user].matches.push(msg.sender);
          users[msg.sender].matches.push(user);
        }
      }
      // If they didn't like you, send them some tokens and add yourself to likes
      transfer(address(this), amount);
      users[user].lockedBal += amount;
      users[msg.sender].likes.push(user);
    }
  }

  function date(address p1, address p2, uint pw1, uint pw2) public {
    require(users[p1].password == pw1 && users[p2].password == pw2, "Both users must agree on date!");
    _mint(p1, users[p1].lockedBal);
    _mint(p2, users[p2].lockedBal);
    users[p1].lockedBal = 0;
    users[p2].lockedBal = 0;
  }


  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
