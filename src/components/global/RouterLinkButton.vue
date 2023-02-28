<template>
    <div id="RouterLinkButton">
        <router-link
              :to="url"
              class="float-right bg-transparent text-gray-900 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded "
              :class="[color ?'hover:bg-'+color+'-500 border-'+color+'-500':'hover:bg-green-500 border-green-500']"
              >{{btnText}}</router-link
            >
    </div>
</template>
<script setup>
import {defineProps,toRefs} from 'vue'
    const props=defineProps({
        btnText:String,
        url:{type:String,default:''},
        color:String,
    });
    const {btnText}=toRefs(props);
</script>