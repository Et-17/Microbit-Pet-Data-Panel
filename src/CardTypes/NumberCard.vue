<script setup lang="ts">
import CardBase from './CardBase.vue';

const props = defineProps<{
    cs: number
    rs: number
    ce?: number
    re?: number
}>();
</script>

<template>
  <CardBase :cs="cs" :rs="rs" :ce="ce" :re="re">
    This is a number card
  </CardBase>
</template>