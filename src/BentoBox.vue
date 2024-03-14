<script setup lang="ts">
import Card from './CardTypes/CardBase.vue';

const props = defineProps<{
  columns: number
  rows: number
}>();
</script>

<template>
  <div id="bento-box" :style="{gridTemplateColumns: `repeat(${columns + 2}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`}">
    <div class="padding-cell" v-for="row in rows" :style="{gridColumn: 1, gridRow: row}"></div>
    <slot>
      <Card :cs="0" :rs="0" :ce="columns - 1" :re="rows - 1" id="empty-bento-announcement" key="">
        No content given to the bento box
      </Card>
    </slot>
    <div class="padding-cell" v-for="row in rows" :style="{gridColumn: columns + 2, gridRow: row}"></div>
  </div>
</template>

<style>
#bento-box {
  display: grid;
  gap: var(--bento-gap);
  padding: 0;
  margin: var(--bento-gap);
}

#empty-bento-announcement {
  text-align: center;
}

.padding-cell {
  aspect-ratio: 1;
}
</style>

