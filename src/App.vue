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

const panel_description_file_input: Ref<HTMLInputElement | undefined> = ref(undefined);

async function makePanel() {
  if (panel_description_file_input.value == undefined || panel_description_file_input.value.files == null || panel_description_file_input.value.files.length == 0) {
    alert("You must submit a panel description file");
    return;
  }
  const panel_description_file = panel_description_file_input.value.files[0];
  const panel_description = JSON.parse(await panel_description_file.text());
  console.log(panel_description);
  rows.value = panel_description.rows;
  columns.value = panel_description.columns;
  readouts.value = panel_description.readouts;
}
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
  <button @click="start">Start Receiving</button>
  <a href="https://github.com/Et-17/mbpet-data-panel/blob/43cde5c18d4ac9dcb1e4134fc26a630e1cd54c0b/documentation.md">
    <button>Documentation</button>
  </a>
  <input type="file" @input="makePanel" ref="panel_description_file_input">
</template>

<style lang="scss">
:root {
  --bento-gap: 20px;
}
</style>
