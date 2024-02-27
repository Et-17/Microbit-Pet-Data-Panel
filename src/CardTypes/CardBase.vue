<script setup lang="ts">
const props = defineProps<{
  cs: number
  rs: number
  ce?: number
  re?: number
}>();
</script>

<template>
  <div class="bento-card" :style="{gridColumnStart: cs + 2, gridRowStart: rs + 1, gridColumnEnd: `span ${1+(ce ?? cs)-cs}`, gridRowEnd: `span ${1+(re ?? rs)-rs}`}">
    <slot></slot>
  </div>
</template>

<style>
.bento-card {
  border-radius: 10px;
  background-color: grey;
  /* height: 100%; */
  /* width: 100%; */
}
</style>