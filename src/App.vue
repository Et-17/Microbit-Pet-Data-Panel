<script setup lang="ts">
import Card from './Card.vue';
</script>

<template>
  <div id="bento-container">
    <div class="padding-cell" v-for="row in 4" :style="{gridColumn: 1, gridRow: row}"></div>
    <Card style="grid-area: 1 / 2" />
    <Card style="grid-area: 1 / 3" />
    <Card style="grid-area: 1 / 4" />
    <Card style="grid-area: 1 / 5 / span 2" />
    <Card style="grid-area: 2 / 2 / span 3" />
    <Card style="grid-area: 2 / 3 / span 2 / span 2" />
    <Card style="grid-area: 3 / 5" />
    <Card style="grid-area: 4 / 3 / span 1 / span 3" />
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
