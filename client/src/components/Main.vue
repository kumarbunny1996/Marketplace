<template>
  <div class="main">
    <h1>NFT MARKETPLACE</h1>
    <h2>ADD PRODUCTS</h2>
    <input-component v-bind="productNameProps"></input-component>
    <input-component v-bind="priceProps"></input-component>
    <button @click="add">Add</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import InputComponent from "./InputComponent.vue";

export default {
  components: { InputComponent },
  name: "Main",

  setup() {
    let productNameProps = ref({});
    let priceProps = ref({});
    let productName = ref();
    let price = ref();

    const handleName = (prodName) => {
      productName = prodName;
      console.log(productName);
    };

    const handlePriceInp = (prodPrice) => {
      price = prodPrice;
      console.log(price);
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

     const add = ()=>{
      console.log(productName, price);
    }

    return {
      productNameProps,
      priceProps,
      add
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
</style>
