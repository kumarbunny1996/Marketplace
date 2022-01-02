<template>
  <div>
    <Main></Main>
  </div>
</template>

<script>
import Main from "./components/Main.vue";
import {ethers } from "ethers";
import { onBeforeMount, toRefs } from "vue";
import Marketplace from "../../src/build/Marketplace.json";

export default {
  components: { Main },

  name: "App",

  props: {
    account: {
      type: String,
    },
    marketplace:{
      type: Object,
    },
    products: {
      type: Array,
    },
    productCount: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    let provider;
    let signer;
    let { account, productCount, marketplace, loading } = toRefs(props);

    const loadEthereum = () => {
      //provider -> gnanache network
      window.ethereum
        ? (provider = new ethers.providers.JsonRpcProvider(
            "http://127.0.0.1:7545/"
          ))
        : window.alert("non ethereum browser is detected");
      //console.log(provider);
      signer = provider.getSigner();
      //console.log(signer);
    };

    const loadBlockchainData = async () => {
      const eth = window.ethereum;
      const accounts = await eth.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      console.log(account);
      const networkData = Marketplace.networks[5777];
      networkData
        ? (marketplace = new ethers.Contract(
            networkData.address,
            Marketplace.abi,
            signer
          ))
        : window.alert("smart contract is not deployed");
      let productCountBN = await marketplace.functions.productCount.call();
      productCount = Number(productCountBN.toString());
      loading = false;
      console.log(marketplace);
      console.log(productCount);
      console.log(loading);
    };

    // const createProduct = (_name,_price) =>{
    //   loading = true;
    //   console.log(loading);
    //   marketplace.functions.createProduct(_name,_price).request({from: account}).then(receipt=>{
    //     if(receipt){
    //       loading = false;
    //       console.log(loading); 
    //       console.log(receipt);
    //     }
    //   });
    // }

    onBeforeMount(() => {
      loadEthereum();
      loadBlockchainData();
    });

    // onMounted(()=>{
    //   createProduct();
    // });

    return {
      loadEthereum,
      loadBlockchainData,
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
