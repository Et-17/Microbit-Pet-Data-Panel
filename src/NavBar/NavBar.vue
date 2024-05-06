<script setup lang="ts">
import { ref } from 'vue';
import { columns } from '@/panel_construction';

const label_toggle_on = ref(false);
</script>

<template>
  <div id="navbar">
    <div id="navbar-buttons-container" :class="{'navbar-label-toggle-on': label_toggle_on}">
      <div class="navbar-button-container">
        <span class="navbar-button-symbol material-symbols-rounded">play_arrow</span>
      </div>
      <span class="navbar-label">Start Listening</span>
      <br>
      <div class="navbar-button-container">
        <span class="navbar-button-symbol material-symbols-rounded">data_array</span>
      </div>
      <span class="navbar-label">Upload Panel</span>
      <br>
      <div class="navbar-button-container">
        <span class="navbar-button-symbol material-symbols-rounded">notes</span>
      </div>
      <span class="navbar-label">Help</span>
      <div id="label-toggle">
        <div class="navbar-button-container" @click="label_toggle_on = !label_toggle_on">
          <span class="navbar-button-symbol material-symbols-rounded" :class="{'label-toggle-on': label_toggle_on}">menu</span>
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
</style>