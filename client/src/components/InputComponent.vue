<template>
  <div class="inpComp">
    <input
      :type="type"
      :name="name"
      v-model="inputVal"
      :placeholder="placeholder"
      required
    />
    <label :for="name">{{ placeholder }}</label>
  </div>
</template>

<script>
import { ref, watch } from "@vue/runtime-core";
export default {
  name: "InputComponent",
  props: {
    type: {
      type: String,
    },
    name: {
      type: String,
    },
    value: {
      type: String,
      default:""
    },
    placeholder: {
      type: String,
    },
    onInput: {
      type: Function,
      default: () => {},
    },
  },

  setup(props) {

    let inputVal = ref('');
    const setDef = ()=>{
      let { value } = props;
      inputVal = value;
    }

    watch(inputVal,(newVal) => {
      let {onInput}=props;
      inputVal.value = newVal;
      onInput(inputVal);
    });

    return {
      setDef
    };
  },
};
</script>

<style></style>
