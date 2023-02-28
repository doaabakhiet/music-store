<template>
    <div id="AccountView" class="max-w-4xl mx-auto">
        <TopNavigation/>
        <router-view />
        <FooterSection/>
    </div>
</template>
<script setup>
import FooterSection from '@/components/structure/FooterSection.vue';
import TopNavigation from '@/components/structure/TopNavigation.vue';
</script>
<style lang="scss"></style>
