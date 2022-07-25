import {expect} from "./chai-setup";

import {ethers, deployments, getNamedAccounts, getUnnamedAccounts} from 'hardhat';

describe("Token contract", function() {
  it("Deployment should assign the total supply of tokens to the owner", async function() {
    await deployments.fixture(["Token"]);
    const {tokenOwner} = await getNamedAccounts();

    const Token = await ethers.getContract("Token");
    const ownerBalance = await Token.balanceOf(tokenOwner);
    const supply = await Token.totalSupply();
    expect(ownerBalance).to.equal(supply);
  });

  it("users1 balanceof should 50 tokens", async function() {
    await deployments.fixture(["Token"]);
    const {tokenOwner} = await getNamedAccounts();
    const users = await getUnnamedAccounts();

    const TokenAsOwner = await ethers.getContract("Token", tokenOwner);
    await TokenAsOwner.transfer(users[0], 50);
    expect(await TokenAsOwner.balanceOf(users[0])).to.equal(50);

    const TokenAsUser0 = await ethers.getContract("Token", users[0]);
    await TokenAsUser0.transfer(users[1], 50);
    expect(await TokenAsOwner.balanceOf(users[1])).to.equal(50);
  });
});
