<script setup lang="ts">
import { ref } from 'vue';
import CardBase from './CardBase.vue';
import { listeners, type Message } from '@/receiver_management/message_handling';

const current_state = ref("no values received");

async function receive(num: number) {
  current_state.value = props.states[num];
}

const props = defineProps<{
  name: string
  cs: number
  rs: number
  ce?: number
  re?: number
  listeningKey: string
  states: Record<number, string>
  default_state?: string
}>();
</script>

<template>
  <CardBase :cs="cs" :rs="rs" :ce="ce" :re="re" :listeningKey="listeningKey" @new-value="receive">
    <div class="state-card-title-container">
      <span class="state-card-name"> {{ name }} </span>
      <span class="state-card-value"> {{ listeningKey }} </span>
    </div>
    <span class="state-card-state"> {{ current_state ?? default_state }}</span>
  </CardBase>
</template>

<style lang="scss">
.state-card-title-container {
  position: absolute;
  top: 25%;
  width: 75%;
  left: 12.5%;
}

.state-card-name {
  display: block;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
}

.state-card-value {
  display: block;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  opacity: 75%;
}

.state-card-state {
  position: absolute;
  top: 60%;
  width: 100%;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
}
</style>
