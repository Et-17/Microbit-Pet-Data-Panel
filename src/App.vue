<script setup lang="ts">
import Card from './Card.vue';
</script>

<template>
  <div id="bento-container">
    <div class="padding-cell" v-for="row in 4" :style="{gridColumn: 1, gridRow: row}"></div>
    <Card :cs="1" :rs="1" />
    <Card :cs="2" :rs="1" />
    <Card :cs="3" :rs="1" />
    <Card :cs="4" :rs="1" :re="2" />
    <Card :cs="1" :rs="2" :re="4" />
    <Card :cs="2" :rs="2" :ce="3" :re="3" />
    <Card :cs="4" :rs="3" />
    <Card :cs="2" :rs="4" :ce="4" /> 
    <div class="padding-cell" v-for="row in 4" :style="{gridColumn: 6, gridRow: row}"></div>
  </div>
</template>

<style lang="scss">
:root {
  --bento-gap: 20px;
}

#bento-container {
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: var(--bento-gap);
  padding: 0;
  margin: var(--bento-gap);
}

.padding-cell {
  aspect-ratio: 1;
}
</style>
