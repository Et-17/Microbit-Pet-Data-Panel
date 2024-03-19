<script setup lang="ts">
import { computed, ref } from 'vue';
import CardBase from './CardBase.vue';
import { listeners, type Message } from '@/receiver_management/message_handling';

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
  <CardBase :cs="cs" :rs="rs" :ce="ce" :re="re" :listeningKey="listeningKey" @new-value="receive">
    <div class="number-card-title-container">
      <span class="number-card-name"> {{ name }} </span>
      <span class="number-card-value"> {{ listeningKey }} </span>
    </div>
    <span class="number-card-number"> {{ current_number.toString() + unit }} </span>
  </CardBase>
</template>

<style lang="scss">
.number-card-title-container {
  position: absolute;
  top: 25%;
  width: 75%;
  left: 12.5%;
}

.number-card-name {
  display: block;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}

.number-card-value {
  display: block;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  opacity: 75%;
}

.number-card-number {
  position: absolute;
  top: 60%;
  width: 100%;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
}
</style>
