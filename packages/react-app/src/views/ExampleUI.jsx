import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function ExampleUI({
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

  const [like, setLike] = useState("loading...");
  const [useraddress, setUserAddress] = useState("loading...");
  const [swipeamount, setSwipeAmount] = useState("loading...");

  const [user1address, setUser1Address] = useState("loading...");
  const [user2address, setUser2Address] = useState("loading...");
  const [user1password, setUser1Password] = useState("loading...");
  const [user2password, setUser2Password] = useState("loading...");

  return (
    <div>
      {/* --------------------- Swipe on User button ----------------- */}
      <h2>Swipe on User</h2>
      <div style={{ margin: 8 }}>
        <Input
          placeholder="Like? (true or false)"
          onChange={e => {
            setLike(!!e.target.value);
          }}
        />
        <Input
          placeholder="user address"
          onChange={e => {
            setUserAddress(e.target.value);
          }}
        />
        <Input
          placeholder="amount"
          onChange={e => {
            setSwipeAmount(e.target.value);
          }}
        />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* look how you call setPurpose on your contract: */
            /* notice how you pass a call back for tx updates too */
            const result = tx(writeContracts.DKDating.swipeOnUser(like, useraddress, swipeamount), update => {
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
            });
            console.log("awaiting metamask/web3 confirm result...", result);
            console.log(await result);
          }}
        >
          Swipe!
        </Button>
      </div>
      <Divider />
    </div>
  );
}
