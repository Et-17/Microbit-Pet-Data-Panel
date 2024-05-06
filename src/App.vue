<script setup lang="ts">
import { start } from './receiver_management/receiver_management';
import Card from './CardTypes/CardBase.vue';
import GraphCard from './CardTypes/GraphCard.vue';
import NumberCard from './CardTypes/NumberCard.vue';
import StateCard from './CardTypes/StateCard.vue';
import BentoBox from './BentoBox.vue';
import NavBar from './NavBar/NavBar.vue';
import { rows, columns, readouts } from './panel_construction';
import { ref, type Ref } from 'vue';
</script>

<template>
  <NavBar />
  <BentoBox :rows="rows" :columns="columns">
    <template v-for="readout in readouts" :key="readout">
      <GraphCard v-if="readout.type == 'graph'" :name="readout.name" :cs="readout.position.cs" :rs="readout.position.rs"
        :ce="readout.position.ce" :re="readout.position.re" :listeningKey="readout.key"
        :max_data_points="readout.max_data_points" :max_value="readout.max_value" :min_value="readout.min_value" />
      <NumberCard v-if="readout.type == 'number'" :name="readout.name" :cs="readout.position.cs"
        :rs="readout.position.rs" :ce="readout.position.ce" :re="readout.position.re" :listeningKey="readout.key"
        :unit="readout.unit" />
      <StateCard v-if="readout.type == 'state'" :name="readout.name" :cs="readout.position.cs" :rs="readout.position.rs"
        :ce="readout.position.ce" :re="readout.position.re" :listeningKey="readout.key" :states="readout.states"
        :default_state="readout.default" />
    </template>
  </BentoBox>
</template>

<style lang="scss">
:root {
  --bento-gap: 20px;
}
</style>
