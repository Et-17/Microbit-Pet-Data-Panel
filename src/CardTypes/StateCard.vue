<script setup lang="ts">
import { ref, type Ref } from 'vue';
import CardBase from './CardBase.vue';

const current_state: Ref<string | undefined> = ref(undefined);

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
  <CardBase class="state-card-base" :cs="cs" :rs="rs" :ce="ce" :re="re" :listeningKey="listeningKey" @new-value="receive">
    <span class="state-card-name"> {{ name }} </span>
    <span class="state-card-value"> {{ listeningKey }} </span>
    <div class="state-card-state-container">
      <span class="state-card-state"> {{ current_state ?? default_state }}</span>
    </div>
  </CardBase>
</template>

<style lang="scss">
.state-card-base {
  display: flex;
  flex-direction: column;
}

.state-card-name {
  flex-grow: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
}

.state-card-value {
  flex-grow: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.25rem;
  opacity: 75%;
}

.state-card-state-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state-card-state {
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
}
</style>
