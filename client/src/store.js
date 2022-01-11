import { createStore } from "vuex";
import { ethers } from "ethers";

let getCountData = async (payload) => {
  let prodCountBN = await payload.marketplace.functions.productCount();
  let productCount = Number(prodCountBN.toString());
  return productCount;
};

let getListData = async (state, payload) => {
  let products = state.products;
  for (let i = 1; i <= state.productCountBN; i++) {
    const product = await payload.marketplace.functions.products(i);
    products = [...products, product];
  }
  return products;
};

export default createStore({
  state: () => {
    return {
      productCountBN: 0,
      products: [],
    };
  },
  mutations: {
    storeProdCountBN(state, count) {
      state.productCountBN = count;
    },
    storeProductList(state, list) {
      state.products = list;
    },
  },
  actions: {
    async addProduct({ state }, payload) {
      console.log(state);
      let _name = payload.prodObj.name;
      let _price = ethers.utils.parseEther(payload.prodObj.price).toString();
      let obj = await payload.marketplace
        .connect(payload.signer)
        .functions.createProduct(_name, _price);
      console.log(obj);
    },

    async getProdCountBN({ commit }, payload) {
      commit("storeProdCountBN", await getCountData(payload));
    },

    async getProductList({ commit, state, dispatch }, payload) {
      await dispatch("getProdCountBN", payload);
      commit("storeProductList", await getListData(state, payload));
    },
  },
});
