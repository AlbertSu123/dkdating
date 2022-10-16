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
  const [name, setName] = useState("loading...");
  const [bio, setBio] = useState("loading...");
  const [picture, setPicture] = useState("loading...");
  const [amount, setAmount] = useState("loading...");
  const [password, setPassword] = useState("loading...");

  const [like, setLike] = useState("loading...");
  const [useraddress, setUserAddress] = useState("loading...");
  const [swipeamount, setSwipeAmount] = useState("loading...");

  const [user1address, setUser1Address] = useState("loading...");
  const [user2address, setUser2Address] = useState("loading...");
  const [user1password, setUser1Password] = useState("loading...");
  const [user2password, setUser2Password] = useState("loading...");

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Example UI:</h2>
        <Divider />
        {/* --------------------- Create user button ----------------- */}
        <h2>Create Profile</h2>
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
              const result = tx(writeContracts.DKDating.createUser(name, bio, picture, amount, password), update => {
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
            Create Profile!
          </Button>
        </div>
        <Divider />
        {/* --------------------- Swipe on User button ----------------- */}
        <h2>Swipe on User</h2>
        <div style={{ margin: 8 }}>
          <Input
            placeholder="Like?"
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
              console.log(name, bio, picture, amount, password);
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
        {/* --------------------- Date button ----------------- */}
        <h2>Go on Date!</h2>
        <div style={{ margin: 8 }}>
          <Input
            placeholder="User 1 Address"
            onChange={e => {
              setUser1Address(!!e.target.value);
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
              console.log(name, bio, picture, amount, password);
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
            Swipe!
          </Button>
        </div>
        <Divider />
        Your Address:
        <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
        <Divider />
        ENS Address Example:
        <Address
          address="0x34aA3F359A9D614239015126635CE7732c18fDF3" /* this will show as austingriffith.eth */
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        {/* <h2>Your Balance: {readContracts && readContracts.DKDating ? readContracts.DKDating.balance(address) : 0}</h2> */}
        <div>OR</div>
        <Balance address={address} provider={localProvider} price={price} />
        <Divider />
        <div>🐳 Example Whale Balance:</div>
        <Balance balance={utils.parseEther("1000")} provider={localProvider} price={price} />
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        <h2>Your Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h2>
        <Divider />
        Your Contract Address:
        <Address
          address={readContracts && readContracts.DKDating ? readContracts.DKDating : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <Divider />
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* look how you call setPurpose on your contract: */
              tx(writeContracts.DKDating.setPurpose("🍻 Cheers"));
            }}
          >
            Set Purpose to &quot;🍻 Cheers&quot;
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /*
              you can also just craft a transaction and send it to the tx() transactor
              here we are sending value straight to the contract's address:
            */
              tx({
                to: writeContracts.DKDating.address,
                value: utils.parseEther("0.001"),
              });
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Send Value
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* look how we call setPurpose AND send some value along */
              tx(
                writeContracts.DKDating.setPurpose("💵 Paying for this one!", {
                  value: utils.parseEther("0.001"),
                }),
              );
              /* this will fail until you make the setPurpose function payable */
            }}
          >
            Set Purpose With Value
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* you can also just craft a transaction and send it to the tx() transactor */
              tx({
                to: writeContracts.DKDating.address,
                value: utils.parseEther("0.001"),
                data: writeContracts.DKDating.interface.encodeFunctionData("setPurpose(string)", ["🤓 Whoa so 1337!"]),
              });
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Another Example
          </Button>
        </div>
      </div>

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in DKDating.sol! )
      */}
      <Events
        contracts={readContracts}
        contractName="DKDating"
        eventName="SetPurpose"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      />

      <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 256 }}>
        <Card>
          Check out all the{" "}
          <a
            href="https://github.com/austintgriffith/scaffold-eth/tree/master/packages/react-app/src/components"
            target="_blank"
            rel="noopener noreferrer"
          >
            📦 components
          </a>
        </Card>

        <Card style={{ marginTop: 32 }}>
          <div>
            There are tons of generic components included from{" "}
            <a href="https://ant.design/components/overview/" target="_blank" rel="noopener noreferrer">
              🐜 ant.design
            </a>{" "}
            too!
          </div>

          <div style={{ marginTop: 8 }}>
            <Button type="primary">Buttons</Button>
          </div>

          <div style={{ marginTop: 8 }}>
            <SyncOutlined spin /> Icons
          </div>

          <div style={{ marginTop: 8 }}>
            Date Pickers?
            <div style={{ marginTop: 2 }}>
              <DatePicker onChange={() => {}} />
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Slider range defaultValue={[20, 50]} onChange={() => {}} />
          </div>

          <div style={{ marginTop: 32 }}>
            <Switch defaultChecked onChange={() => {}} />
          </div>

          <div style={{ marginTop: 32 }}>
            <Progress percent={50} status="active" />
          </div>

          <div style={{ marginTop: 32 }}>
            <Spin />
          </div>
        </Card>
      </div>
    </div>
  );
}
