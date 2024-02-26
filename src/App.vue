<script setup lang="ts">
import Card from './Card.vue';
import BentoBox from './BentoBox.vue';
</script>

<template>
  <BentoBox :rows="4" :columns="4">
    <Card :cs="1" :rs="1" />
    <Card :cs="2" :rs="1" />
    <Card :cs="3" :rs="1" />
    <Card :cs="4" :rs="1" :re="2" />
    <Card :cs="1" :rs="2" :re="4" />
    <Card :cs="2" :rs="2" :ce="3" :re="3" />
    <Card :cs="4" :rs="3" />
    <Card :cs="2" :rs="4" :ce="4" /> 
  </BentoBox>
</template>

<style lang="scss">
:root {
  --bento-gap: 20px;
}
</style>
