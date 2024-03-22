<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardBase from './CardBase.vue';
import { listeners, type Message } from '@/receiver_management/message_handling';
// i know i'm not supposed to do this but i'm too busy and lazy to figure out
// the fancy tree shaking stuff
import Chart from 'chart.js/auto';

function receive(num: number) {
  if (chart == undefined || chart.data.labels == undefined) {
    return;
  }

  if (chart.data.datasets[0].data.length > props.max_data_points) {
    chart.data.datasets[0].data.shift();
    chart.update();
  } else if (chart.data.datasets[0].data.length <= props.max_data_points) {
    // i'm not entirely sure why i have to cast to a number here but it works
    chart.data.labels.push((chart.data.labels[chart.data.labels.length - 1] as number ?? 0) + 1);
  }
  chart.data.datasets[0].data.push(num);
  chart.update();
}

function remove_point() {
  if (chart == undefined || chart.data.labels == undefined) {
    return;
  }
  chart.data.datasets[0].data.shift();
  chart.update();
}

const graph = ref(undefined);
let chart: Chart | undefined = undefined;

onMounted(() => {
  if (graph.value == undefined) {
    return;
  }
  chart = new Chart(graph.value, {
    type: "line",
    data: {
      datasets: [{
        data: [],
        tension: 0.4
      }],
      labels: []
    },
    options: {
      scales: {
        y: {
          type: "linear",
          position: "left",
          max: props.max_value,
          min: props.min_value,
        },
      },
      elements: {
        point: {
          pointStyle: false
        }
      }
    },
  })
})

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
</script>

<template>
  <CardBase :cs="cs" :rs="rs" :ce="ce" :re="re" :listeningKey="listeningKey" @new-value="receive">
    <canvas ref="graph"></canvas>
    <button @click="remove_point">remove</button>
  </CardBase>
</template>
