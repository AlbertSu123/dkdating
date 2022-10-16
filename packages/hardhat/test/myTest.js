const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("My Dapp", function () {
  let DKDating;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("DKDating", function () {
    it("Should deploy DKDating", async function () {
      const hi = await ethers.getContractFactory("DKDating");

      DKDating = await hi.deploy();
    });

    describe("E2E workflow()", function () {
      it("Create Users", async function () {
        const [Joe, Josephine] = await ethers.getSigners();
        await DKDating.connect(Joe).createUser("Joe", "I like blockchain", "https://media-exp1.licdn.com/dms/image/C5603AQH8IqUFT8lhJg/profile-displayphoto-shrink_800_800/0/1658029968722?e=1671667200&v=beta&t=Um9GYDI1FZw20U2OUsVvfwHVkE6dj-glLT6VWGYXApg", 100, 1);
        await DKDating.connect(Josephine).createUser("Josephine", "I don't like blockchain", "https://www.google.com/url?sa=i&url=https%3A%2F%2Fblog.google%2Fproducts%2Fchrome%2F&psig=AOvVaw0FlNt-W4kbqeRliBLPuQ1D&ust=1666004436949000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPDsm6fM5PoCFQAAAAAdAAAAABAH", 100, 1);
      });

      it("Swipe on Users", async function () {
        const [Joe, Josephine] = await ethers.getSigners();
        await DKDating.connect(Joe).swipeOnUser(true, Josephine.address, 1);
        await DKDating.connect(Josephine).swipeOnUser(true, Joe.address, 1);
      });

      it("Swipe on Users", async function () {
        const [Joe, Josephine] = await ethers.getSigners();
        await DKDating.connect(Joe).date(Joe.address, Josephine.address, 1, 1) 
      });
    });
  });
});
