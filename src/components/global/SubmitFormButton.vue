<template>
  <div id="SubmitFormButton">
    <button 
      class="float-right mt-2 inline-block bg-green-500 hover:bg-green-700 font-bold text-white no-underline px-4 py-3"
      @click="$emit('submit', true)"
      :type="type"
      >{{ btnText }}</button
    >
  </div>
</template>
<script setup>
import { defineProps, toRefs } from "vue";
const props = defineProps({
  btnText: String,
  type:String
});
const { btnText,type } = toRefs(props);
</script>
