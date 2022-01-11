import { ethers } from "ethers";
import { onBeforeMount } from "vue";

export default function connectEthereum() {
  //provider -> gnanache network
  const loadEthereum = () => {
    let provider, signer;
    provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545")
    signer = provider.getSigner();
    return signer;
  };

  onBeforeMount(loadEthereum);

  return {
    loadEthereum,
  };
}

// const loadEthereum = () => {
//   //provider -> gnanache network
//   window.ethereum
//     ? (provider = new ethers.providers.JsonRpcProvider(
//         "HTTP://127.0.0.1:7545"
//       ))
//     : window.alert("non ethereum browser is detected");
//   signer = provider.getSigner();
// };

// const loadBlockchainData = async () => {
//   const networkData = Marketplace.networks[5777];
//   networkData
//     ? (marketplace = new ethers.Contract(
//         networkData.address,
//         Marketplace.abi,
//         signer
//       ))
//     : window.alert("smart contract is not deployed");

//   console.log(marketplace);
//   let productCountBN = await marketplace.functions.productCount();
//   productCount = Number(productCountBN.toString());
//   loading = false;
//   // Load products
//   for (let i = 1; i <= productCount; i++) {
//     const product = await marketplace.functions.products(i);
//     products = [...products, product];
//   }
//   console.log(productCount);
//   console.log(products);
//   console.log(loading);
// };
