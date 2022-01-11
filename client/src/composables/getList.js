import { inject } from "vue";

export default function addProductToContract(payload) {
  const store = inject("mainStore");
  const createProduct = (prodObj) => {
    store.dispatch("addProduct", { ...payload, prodObj }).finally(() => {
      let loading = false;
      console.log(loading);
    });
  };
  return {
    createProduct,
  };
}
