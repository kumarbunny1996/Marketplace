import { onBeforeMount } from "vue";
import { ethers } from "ethers";
import Marketplace from "../../../src/build/Marketplace.json";

export default function loadBlockchainData(signer) {
  let marketplace;
  const loadSmartContract = () => {
    const networkData = Marketplace.networks[5777];
    networkData
      ? (marketplace = new ethers.Contract(
          networkData.address,
          Marketplace.abi,
          signer
        ))
      : window.alert("smart contract is not deployed");
    return marketplace;
  };

  onBeforeMount(loadSmartContract);

  return {
    loadSmartContract,
  };
}

// get ethereum account address from metamask
// const eth = window.ethereum;
// const accounts = await eth.request({ method: "eth_requestAccounts" });
// account = accounts[0];
// console.log(account);
