<template>
  <div>
    <Main
      @addProduct="createProduct"
      :nftProductsArr="list"
      @productPurchased="purchaseNft"
    ></Main>
  </div>
</template>

<script>
import connectEthereum from "@/composables/loadEth.js";
import loadBlockchainData from "@/composables/loadBlockchainData.js";
import injectedStore from "@/composables/userInjectionStore";
import addProductToContract from "@/composables/getList";
//import { ethers } from "ethers";

import Main from "./components/Main.vue";

export default {
  components: { Main },

  name: "App",

  setup() {
    let signer;
    let marketplace;
    // let loading = true;

    const { loadEthereum } = connectEthereum();
    signer = loadEthereum();
    const { loadSmartContract } = loadBlockchainData(signer);
    marketplace = loadSmartContract();
    const { productCount, list, prodListAction } = injectedStore({
      marketplace,
    });
    console.log(productCount, list);
    const { createProduct } = addProductToContract({
      marketplace,
      signer,
    });

    const purchaseNft = async(_id, price) => {
      let overrides = {
        value: price//ethers.utils.parseEther(price).toString(),
      };
      console.log(overrides);
     let res = await marketplace
         .connect(signer)
        .purchaseProduct(_id, overrides);
        console.log(res);
    };

    return {
      loadEthereum,
      loadSmartContract,
      createProduct,
      productCount,
      list,
      prodListAction,
      purchaseNft,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
