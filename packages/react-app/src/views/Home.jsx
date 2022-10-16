import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "DKDating", "purpose");
  const [randInt, setRandInt] = useState(0);
  const _randInt = parseInt(useContractReader(readContracts, "DKDating", "numUsers"));

  return (
    <div>
      <div style={{ margin: 32 }}>From gm to gf to wagmi</div>
      <span style={{ marginRight: 8 }}>❤️❤️❤️❤️❤️❤️❤️❤️</span>
      <Divider></Divider>
      <Button onClick={() => setRandInt(_randInt)}>There are currently {randInt + 4} Active Users</Button>
    </div>
  );
}

export default Home;
