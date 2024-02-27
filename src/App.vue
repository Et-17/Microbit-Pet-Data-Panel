<script setup lang="ts">
import Card from './CardTypes/CardBase.vue';
import GraphCard from './CardTypes/GraphCard.vue';
import NumberCard from './CardTypes/NumberCard.vue';
import StateCard from './CardTypes/StateCard.vue';
import BentoBox from './BentoBox.vue';
</script>

<template>
  <BentoBox :rows="3" :columns="4">
    <!-- <Card :cs="1" :rs="1" />
    <Card :cs="2" :rs="1" />
    <Card :cs="3" :rs="1" />
    <Card :cs="4" :rs="1" :re="2" />
    <Card :cs="1" :rs="2" :re="4" />
    <Card :cs="2" :rs="2" :ce="3" :re="3" />
    <Card :cs="4" :rs="3" />
    <Card :cs="2" :rs="4" :ce="4" />  -->
    <GraphCard :cs="0" :rs="0" :ce="1" :re="0" />
    <GraphCard :cs="2" :rs="0" :ce="3" :re="0" />
    <StateCard :cs="0" :rs="1" />
    <StateCard :cs="1" :rs="1" />
    <StateCard :cs="2" :rs="1" />
    <StateCard :cs="3" :rs="1" />
    <NumberCard :cs="0" :rs="2" :ce="3" :re="2" />
  </BentoBox>
</template>

<style lang="scss">
:root {
  --bento-gap: 20px;
}
</style>
