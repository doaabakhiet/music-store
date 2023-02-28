<template>
    <div id="CroppedImage">
        <div class="mb-4">
          <label
            for=""
            class="block uppercase tracking-wide text-xs font-bold mb-2 text-gray-700"
            >{{label}}</label
          >
            <img :src="image" class="w-full rounded border-solid border-4 border-green-500" alt="">
        </div>
    </div>
</template>
<script setup>
import {defineProps,toRefs} from 'vue'
    const props=defineProps({
        label:String,
        image:String
    });
    const {label,image}=toRefs(props);
</script>