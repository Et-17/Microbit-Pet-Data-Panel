<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { start, stop } from '@/receiver_management/receiver_management';
import { rows, columns, readouts } from '@/panel_construction';

const label_toggle_on: Ref<boolean> = ref(false);
const play_symbol: Ref<HTMLSpanElement | undefined> = ref(undefined);
const receiving = ref(false);

async function toggleReceiving() {
  if (receiving.value) {
    stop_receiving();
  } else if (!receiving.value) {
    startReceiving();
  }
}

async function startReceiving() {
  if (play_symbol.value == undefined) {
    return;
  }
  start();
  play_symbol.value.textContent = "stop";
  receiving.value = true;
}

function stop_receiving() {
  if (play_symbol.value == undefined) {
    return;
  }
  stop();
  play_symbol.value.textContent = "play_arrow";
  receiving.value = false;
}

const panel_description_file_input: Ref<HTMLInputElement | undefined> = ref(undefined);

async function uploadPanel() {
  if (panel_description_file_input.value == undefined) {
    return;
  }
  panel_description_file_input.value.click();
}

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
  <div id="navbar">
    <div id="navbar-buttons-container" :class="{ 'navbar-label-toggle-on': label_toggle_on }">
      <div class="navbar-button-container" @click="toggleReceiving">
        <span class="navbar-button-symbol material-symbols-rounded" ref="play_symbol">play_arrow</span>
      </div>
      <span class="navbar-label">Start Listening</span>
      <br>
      <div class="navbar-button-container" @click="uploadPanel">
        <span class="navbar-button-symbol material-symbols-rounded">data_array</span>
      </div>
      <span class="navbar-label">Upload Panel</span>
      <input id="navbar-file-upload" type="file" @input="makePanel" ref="panel_description_file_input">
      <br>
      <a
        href="https://github.com/Et-17/mbpet-data-panel/blob/prod/documentation.md">
        <div class="navbar-button-container">
          <span class="navbar-button-symbol material-symbols-rounded">notes</span>
        </div>
      </a>
      <span class="navbar-label">Help</span>
      <div id="label-toggle">
        <div class="navbar-button-container" @click="label_toggle_on = !label_toggle_on">
          <span class="navbar-button-symbol material-symbols-rounded"
            :class="{ 'label-toggle-on': label_toggle_on }">menu</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#navbar {
  position: fixed;
  left: var(--bento-gap);
  top: var(--bento-gap);
  bottom: var(--bento-gap);
  transition: 0.5s width;

  a {
    color: unset;
    cursor: unset;
  }
}

#navbar-buttons-container {
  width: 48pt;
  overflow: hidden;
  white-space: nowrap;
  transition: 0.5s width;

  &.navbar-label-toggle-on {
    width: 100%;
  }
}

.material-symbols-rounded {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.navbar-button-symbol {
  font-size: 24pt;
  line-height: 48pt;
  transition: 0.25s all;

  &:hover {
    transform: rotate(15deg);
    cursor: pointer;
  }
}

#label-toggle {
  position: absolute;
  bottom: 0;
}

.label-toggle-on {
  transform: rotate(90deg);

  &:hover {
    transform: rotate(105deg);
  }
}

.navbar-button-container {
  display: inline-block;
  height: 48pt;
  width: 48pt;
  text-align: center;
}

.navbar-label {
  font-size: 24pt;
  vertical-align: 11.5%;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#navbar-file-upload {
  display: none;
}
</style>