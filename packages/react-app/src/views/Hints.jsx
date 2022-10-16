import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";
import { useContractReader } from "eth-hooks";
export default function CreateProfile({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  const [name, setName] = useState("loading...");
  const [bio, setBio] = useState("loading...");
  const [phonenumber, setPhoneNumber] = useState("loading...");
  const [picture, setPicture] = useState("loading...");
  const [amount, setAmount] = useState("loading...");
  const [password, setPassword] = useState("loading...");

  return (
    <div>
      {/* --------------------- Create user button ----------------- */}
      <h2 class="maintext" style={{ font: "arial" }}>
        Create Profile
      </h2>
      <div style={{ margin: 8 }}>
        <Input
          placeholder="Name"
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder="Bio"
          onChange={e => {
            setBio(e.target.value);
          }}
        />
        <Input
          placeholder="Phone Number"
          onChange={e => {
            setPhoneNumber(e.target.value);
          }}
        />
        <Input
          placeholder="Picture"
          onChange={e => {
            setPicture(e.target.value);
          }}
        />
        <Input
          placeholder="Amount"
          onChange={e => {
            setAmount(e.target.value);
          }}
        />
        <Input
          placeholder="Password"
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* look how you call setPurpose on your contract: */
            /* notice how you pass a call back for tx updates too */
            console.log(name, bio, picture, amount, password);
            const result = tx(
              writeContracts.DKDating.createUser(name, bio, picture, phonenumber, amount, password),
              update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              },
            );
            console.log("awaiting metamask/web3 confirm result...", result);
            console.log(await result);
          }}
        >
          Create Profile!
        </Button>
      </div>
      <Divider />
    </div>
  );
}
