<script setup lang="ts">
import { ref } from 'vue';
import CardBase from './CardBase.vue';

const current_number = ref(0);

async function receive(num: number) {
  current_number.value = num;
}

const props = defineProps<{
  name: string
  cs: number
  rs: number
  ce?: number
  re?: number
  listeningKey: string
  unit?: string
}>();
</script>

<template>
  <CardBase class="number-card-base" :cs="cs" :rs="rs" :ce="ce" :re="re" :listeningKey="listeningKey" @new-value="receive">
    <span class="number-card-name"> {{ name }} </span>
    <span class="number-card-value"> {{ listeningKey }} </span>
    <div class="number-card-number-container">
      <span class="number-card-number"> {{ current_number.toString() + (unit ?? "") }} </span>
    </div>
  </CardBase>
</template>

<style lang="scss">
.number-card-base {
  display: flex;
  flex-direction: column;
}

.number-card-name {
  flex-grow: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
}

.number-card-value {
  flex-grow: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.25rem;
  opacity: 75%;
}

.number-card-number-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number-card-number {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
}
</style>