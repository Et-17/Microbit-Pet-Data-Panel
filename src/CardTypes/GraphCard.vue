<script setup lang="ts">
import { ref } from 'vue';
import CardBase from './CardBase.vue';
import { listeners, type Message } from '@/receiver_management/message_handling';

const body_text = ref("hi");

async function receive() {
  body_text.value += "graph\n";
}

const props = defineProps<{
  name: string
  cs: number
  rs: number
  ce?: number
  re?: number
  listeningKey: string
  max_data_points: number
  max_value?: number
  min_value?: number
}>();

console.log(props);
</script>

<template>
  <CardBase :cs="cs" :rs="rs" :ce="ce" :re="re" :listeningKey="listeningKey" @new-value="receive">
    {{body_text}}
  </CardBase>
</template>
