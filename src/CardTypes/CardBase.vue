<script setup lang="ts">
import { type Message, listeners } from '@/receiver_management/message_handling';

listeners.push((message: Message) => {
  console.log("message" + message.key);
  console.log("props" + props.listeningKey);
  if (message.key == props.listeningKey) {
    emit("new-value", message.value);
  }
});

const emit = defineEmits<{
  (e: 'new-value', value: number): void
}>();

const props = defineProps<{
  cs: number
  rs: number
  ce?: number
  re?: number
  listeningKey: string
}>();

console.log(props.listeningKey);
</script>

<template>
  <div class="bento-card" :style="{gridColumnStart: cs + 2, gridRowStart: rs + 1, gridColumnEnd: `span ${1+(ce ?? cs)-cs}`, gridRowEnd: `span ${1+(re ?? rs)-rs}`}">
    <slot></slot>
  </div>
</template>

<style>
.bento-card {
  position: relative;
  border-radius: 10px;
  background-color: grey;
}
</style>
