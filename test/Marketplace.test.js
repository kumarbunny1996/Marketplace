const { assert } = require("chai");
const { default: Web3 } = require("web3");
require("chai").use(require("chai-as-promised")).should();

const Marketplace = artifacts.require("../src/contracts/Marketplace.sol");

contract(Marketplace, async ([deployer, seller, buyer]) => {
  let marketplace;

  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe("deployment", async () => {
    it("deployed successfully", async () => {
      const address = await marketplace.address;
      assert.notEqual(address, "0x0");
      assert.notEqual(address, null);
      assert.notEqual(address, "");
      assert.notEqual(address, undefined);
    });
    it("has name", async () => {
      const name = await marketplace.name();
      assert.equal(name, "dapp");
    });
  });

  describe("products", async () => {
    let result, productCount;

    before(async () => {
      result = await marketplace.createProduct(
        "iphone X",
        web3.utils.toWei("1", "Ether"),
        { from: seller }
      );
      productCount = await marketplace.productCount();
      // console.log(productCount);
    });

    it("creates product", async () => {
      assert.equal(productCount.toNumber(), 1);
      // console.log(result.logs);
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        "id is matching"
      );
      assert.equal(event.name, "iphone X", "name is correct");
      assert.equal(event.price, "1000000000000000000", "price is correct");
      assert.equal(event.owner, seller, "owner is correct");
      assert.equal(event.purchased, false, "purchased is correct");

      await marketplace.createProduct("", web3.utils.toWei("1", "Ether"), {
        from: seller,
      }).should.be.rejected;
      await marketplace.createProduct("iphone X", 0, { from: seller }).should.be
        .rejected;
    });

    it('sells products', async()=>{
      let sellerOldBalance;
      //track the balance of seller
      sellerOldBalance = await web3.eth.getBalance(seller);
      sellerOldBalance = new web3.utils.BN(sellerOldBalance);
      console.log("sellerOldBalance", sellerOldBalance.toString());
      // SUCCESS buyer purchase product
      result = await marketplace.purchaseProduct(productCount, {
        from: buyer,
        value: web3.utils.toWei("1", "ether"),
      });
      console.log(result);
      //check logs
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        productCount.toNumber(),
        "id is matching"
      );
      assert.equal(event.name, "iphone X", "name is correct");
      assert.equal(event.price, "1000000000000000000", "price is correct");
      assert.equal(event.owner, buyer, "owner is correct");
      assert.equal(event.purchased, true, "purchased is correct");

      let sellerNewBalance;
      sellerNewBalance = await web3.eth.getBalance(seller);
      sellerNewBalance = new web3.utils.BN(sellerNewBalance);
      console.log("sellerNewBalance", sellerNewBalance.toString());

      let price;
      price = web3.utils.toWei("1", "ether");
      price = new web3.utils.BN(price);
      console.log('price', price.toString());

      let expectedBalance = sellerOldBalance.add(price);
      console.log("expectedBalance", expectedBalance.toString());

      assert.equal(sellerNewBalance.toString(), expectedBalance.toString());

      // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
      await marketplace.purchaseProduct(99, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected; // FAILURE: Buyer tries to buy without enough ether
      // FAILURE: Buyer tries to buy without enough ether
      await marketplace.purchaseProduct(productCount, {
        from: buyer,
        value: web3.utils.toWei("0.5", "Ether"),
      }).should.be.rejected;
      // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
      await marketplace.purchaseProduct(productCount, {
        from: deployer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await marketplace.purchaseProduct(productCount, {
        from: buyer,
        value: web3.utils.toWei("1", "Ether"),
      }).should.be.rejected;
    });
  });
});
