<template>
  <div class="main">
    <h1>NFT MARKETPLACE</h1>
    <h2>ADD PRODUCTS</h2>
    <input-component v-bind="productNameProps"></input-component>
    <input-component v-bind="priceProps"></input-component>
    <button @click="addNftProduct">Add</button>
    <h2>BUY PRODUCTS</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">NAME</th>
          <th scope="col">PRICE</th>
          <th scope="col">OWNER</th>
           <th scope="col">BUY</th>
        </tr>
      </thead>
      <tbody v-for="(product, index) in nftProductsArr" :key="index">
        <tr scope="row" v-if="!product.purchased" class="trow">
          <td>{{ product.id.toString() }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}Eth</td>
          <td>{{ product.owner }}</td>
          <td>
            <button
              @click="purchaseProduct(product.id.toString(), product.price)"
            >
              Buy Now
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import InputComponent from "./InputComponent.vue";
export default {
  components: { InputComponent },
  name: "Main",
  props: {
    nftProductsArr: {
      type: Array,
    },
  },
  setup(props, context) {
    console.log(props, context);
    let productNameProps = ref({});
    let priceProps = ref({});
    let productName = "";
    let price = "";

    const handleName = (prodName) => {
      if (prodName === "") return;
      productName = prodName;
    };

    const handlePriceInp = (prodPrice) => {
      if (prodPrice === "") return;
      price = prodPrice;
    };

    productNameProps = {
      placeholder: "Product Name",
      type: "text",
      name: "productName",
      onInput: handleName,
    };
    priceProps = {
      placeholder: "Price",
      type: "text",
      name: "price",
      onInput: handlePriceInp,
    };

    const addNftProduct = () => {
      console.log(productName, price);
      let productObj = {
        name: productName,
        price: price,
      };
      context.emit("addProduct", productObj);
    };

    const purchaseProduct = (id, price) => {
      console.log(id, price);
      context.emit("productPurchased", id, price);
    };

    // const isArr = () => {
    //   console.log(nftProductsArr);
    //   return nftProductsArr.length == 0 ? false : true;
    // };

    return {
      productNameProps,
      priceProps,
      addNftProduct,
      purchaseProduct,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #4d4d44;
}
.container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  justify-content: space-evenly;
}
table {
  border-collapse: collapse;
  width: 100%;
}
thead{
  width: 100%;
}
.trow:nth-child(even) {
  background-color: #dfd6d6;
}
table tr:hover {
  background-color: #ddd;
}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #085375;
  color: white;
}
table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
