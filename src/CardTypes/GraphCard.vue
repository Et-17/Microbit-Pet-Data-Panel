<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardBase from './CardBase.vue';
import { listeners, type Message } from '@/receiver_management/message_handling';
import Chart from 'chart.js/auto'

const body_text = ref("hi");
let current_label_counter = 0;

function receive(num: number) {
  if (chart == undefined || chart.data.labels == undefined) {
    return;
  }
  // console.log(chart.data.datasets[0].data);
  // console.log(chart.data.labels)
  // chart.data.datasets[0].data.push(num);
  // chart.data.labels.push((chart.data.labels[chart.data.labels.length - 1] ?? 0) + 1);
  // if (chart.data.datasets[0].data.length > props.max_data_points) {
  //   chart.data.datasets[0].data.splice(3, 1);
  //   chart.data.labels.splice(3, 1);
  // }
  // chart.update();

  // chart.data.labels.push(current_label_counter);
  // chart.data.datasets[0].data.push({ x: current_label_counter, y: num });
  // current_label_counter += 1;
  // if (chart.data.datasets[0].data.length > props.max_data_points) {
  //   chart.data.labels.shift();
  // }

  for (let i = 0; i < chart.data.datasets[0].data.length - 1; i++) {
    chart.data.datasets[0].data[i] = chart.data.datasets[0].data[i + 1];
  }
  chart.data.datasets[0].data[chart.data.datasets[0].data.length] = num;
  chart.update();
}

const graph = ref(undefined);
let chart: Chart | undefined = undefined;

onMounted(() => {
  if (graph.value == undefined) {
    return;
  }
  // chart = new Chart(graph.value, {
  //   type: "bar",
  //   data: {
  //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //     datasets: [{
  //       label: "# of Votes",
  //       data: [12, 19, 3, 5, 2, 3],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // });
  chart = new Chart(graph.value, {
    type: "line",
    data: {
      datasets: [{
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    // options: {
    //   scales: {
    //     x: {
    //       display: false
    //     }
    //   }
    // }
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
  </CardBase>
</template>
