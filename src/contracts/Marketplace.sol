// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
  string public name;
  uint public productCount = 0;
  mapping(uint => Product) public products;

  struct Product {
    uint id;
    string name;
    uint price;
    address payable owner;
    bool purchased;
  }

   event ProductCreated (
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
   );

    event ProductPurchased (
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
   ); 

  constructor() public {
    name = "dapp";
  }

  function createProduct(string memory _name, uint _price) public {
    require(bytes(_name).length > 0);
    require(_price > 0);
    productCount ++;
    products[productCount] = Product(productCount, _name, _price, payable(msg.sender), false);
    emit ProductCreated(productCount, _name, _price, payable(msg.sender), false);
  }

  function purchaseProduct(uint _id) public payable {
    Product memory _product = products[_id];
    address payable _seller = _product.owner;// fetch the owner
     require(_product.id > 0 && _product.id <= productCount);
      require(msg.value >= _product.price);
     require(!_product.purchased);
    // require(_seller == payable(msg.sender));// checks buyer is not the seller
    _product.owner = payable(msg.sender);
    _product.purchased = true;
    products[_id] = _product;
    payable(_seller).transfer(msg.value);
    emit ProductPurchased(productCount, _product.name, _product.price, _product.owner, _product.purchased);
  }
}