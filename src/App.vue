<script setup lang="ts">
import { start } from './receiver_management/receiver_management';

import Card from './CardTypes/CardBase.vue';
import GraphCard from './CardTypes/GraphCard.vue';
import NumberCard from './CardTypes/NumberCard.vue';
import StateCard from './CardTypes/StateCard.vue';
import BentoBox from './BentoBox.vue';
import { rows, columns, readouts } from './panel_construction';

console.log(readouts);
</script>

<template>
  <BentoBox :rows="rows" :columns="columns">
    <template v-for="readout in readouts">
      <GraphCard v-if="readout.type == 'graph'" :cs="readout.position.cs" :rs="readout.position.rs" :ce="readout.position.ce" :re="readout.position.re" :listeningKey="readout.key" />
      <NumberCard v-if="readout.type == 'number'" :cs="readout.position.cs" :rs="readout.position.rs" :ce="readout.position.ce" :re="readout.position.re" :listeningKey="readout.key"/>
      <StateCard v-if="readout.type == 'state'" :cs="readout.position.cs" :rs="readout.position.rs" :ce="readout.position.ce" :re="readout.position.re" :listeningKey="readout.key"/>
    </template>
  </BentoBox>
  <button @click="start">Click this</button>
</template>

<style lang="scss">
:root {
  --bento-gap: 20px;
}
</style>
