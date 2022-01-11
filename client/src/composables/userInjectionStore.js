import { computed, inject, onBeforeMount } from "vue";

export default function injectedStore(payload) {
  const store = inject("mainStore");
  const productCount = computed(() => store.state.productCountBN);
  const list = computed(() => store.state.products);
  const prodListAction = () => {
    store.dispatch("getProductList", payload).finally(() => {
      let loading = false;
      console.log(loading);
    });
  };
  onBeforeMount(prodListAction);
  return {
    productCount,
    list,
    prodListAction,
  };
}

// const createProduct = (prodObj) => {
//   let _name = prodObj.name;
//   let _price = prodObj.price;
//   loading = true;
//   console.log(loading);
//   marketplace
//     .connect(signer)
//     .functions.createProduct(_name, _price)
//     .then((results) => {
//       if (results) {
//         loading = false;
//         console.log(loading);
//         console.log(results);
//       }
//     });
// };

//  <!-- <div  v-for="(product, index) in nftProductsArr"
//         :key="index">
//       <div v-if="!product.purchased"
//         class="container"
//       >
//         <h3>{{ product.id.toString() }}</h3>
//         <h3>{{ product.name }}</h3>
//         <h3>{{ product.price }}Eth</h3>
//         <h3>{{ product.owner }}</h3>
//         <button @click="purchaseProduct(product.id.toString(), product.price.toString())">
//           Buy Now
//         </button>
//       </div>
//     </div> -->
