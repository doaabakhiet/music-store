<template>
    <div id="textInput">
        <div class="mb-4">
          <label
            for=""
            class="block uppercase tracking-wide text-xs font-bold mb-2 text-gray-700"
            :class="[labelColor ? 'text-gray-900':'text-gray-100']"
            >{{label}}</label
          >
          <input
            :type="inputType"
            v-model="inputComputed"
            :placeholder="placeholder"
            class="appearance-none block w-full bg-white text-gray text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
          <span class="text-red-500" v-if="error">{{error}}</span>
        </div>
    </div>
</template>
<script setup>
import {defineEmits,defineProps,toRefs,computed} from 'vue'
    const emit=defineEmits(['update:input']);
    const props=defineProps({
        label:String,
        labelColor:{type:Boolean,default:true},
        placeholder:{type:String,default:''},
        input:String,
        inputType:String,
        error:String
    });
    const {label,labelColor,placeholder,input,inputType,error}=toRefs(props);
    const inputComputed=computed({
        get:()=>input.value,
        set:(val)=>emit('update:input',val)
    });
</script>