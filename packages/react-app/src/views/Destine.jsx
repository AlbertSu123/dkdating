import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function Destine({
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
  const [user1address, setUser1Address] = useState("loading...");
  const [user2address, setUser2Address] = useState("loading...");
  const [user1password, setUser1Password] = useState("loading...");
  const [user2password, setUser2Password] = useState("loading...");

  return (
    <div>
      {/* --------------------- Date button ----------------- */}
      <h2>Go on Date!</h2>
      <div style={{ margin: 8 }}>
        <Input
          placeholder="User 1 Address"
          onChange={e => {
            setUser1Address(e.target.value);
          }}
        />
        <Input
          placeholder="User 2 Address"
          onChange={e => {
            setUser2Address(e.target.value);
          }}
        />
        <Input
          placeholder="User 1 Password"
          onChange={e => {
            setUser1Password(e.target.value);
          }}
        />
        <Input
          placeholder="User 2 Password"
          onChange={e => {
            setUser2Password(e.target.value);
          }}
        />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* look how you call setPurpose on your contract: */
            /* notice how you pass a call back for tx updates too */
            const result = tx(
              writeContracts.DKDating.date(user1address, user2address, user1password, user2password),
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
          Date!
        </Button>
      </div>
    </div>
  );
}
