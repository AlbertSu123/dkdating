pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

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
    string phonenumber;
  }

  mapping(address => User) public users;
  address[] public userList;
  uint public numUsers;

  event Match(string phonenumber1, string phonenumber2);

  constructor() ERC20("DKDating", "DK"){
    // what should we do on deploy?
  }

  // Create a user and mint them tokens
  function createUser(string memory name, string memory bio, string memory picture, string memory phonenumber, uint amount, uint password) public {
    require(users[msg.sender].amount == 0);
    _mint(msg.sender, amount);
    users[msg.sender] = User(name, bio, picture, amount, new address[](0), new address[](0), password, 0, phonenumber);
    userList.push(msg.sender);
    numUsers += 1;
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

  // If you match, users will get paid!
  function date(address p1, address p2, uint pw1, uint pw2) public {
    require(users[p1].password == pw1 && users[p2].password == pw2, "Both users must agree on date!");
    _mint(p1, users[p1].lockedBal);
    _mint(p2, users[p2].lockedBal);
    users[p1].lockedBal = 0;
    users[p2].lockedBal = 0;
    emit Match(users[p1].phonenumber, users[p2].phonenumber);
  }

  function balance(address a) public view returns (uint256) {
    return balanceOf(a);
  }


  // to support receiving ETH by default
  receive() external payable {}
  fallback() external payable {}
}
