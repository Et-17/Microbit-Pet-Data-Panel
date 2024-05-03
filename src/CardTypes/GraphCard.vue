<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CardBase from './CardBase.vue';
// TODO: implement tree shaking
import Chart from 'chart.js/auto';

const graph = ref(undefined);
let chart: Chart | undefined = undefined;

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
      },
      plugins: {
        legend: {
          display: false
        }
      },
      maintainAspectRatio: false
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
  <CardBase class="graph-card-base" :cs="cs" :rs="rs" :ce="ce" :re="re" :listeningKey="listeningKey">
    <div class="graph-card-title-container">
      <span class="graph-card-name"> {{ name }} </span>
      <span class="graph-card-value"> {{ listeningKey }} </span>
    </div>
    <div class="graph-card-graph-container">
      <canvas ref="graph" class="graph-card-graph"></canvas>
    </div>
  </CardBase>
</template>

<style lang="scss">
.graph-card-base {
  display: flex;
  flex-direction: column;
}

.graph-card-title-container {
  flex-grow: 0;
  display: flex;
  align-items: baseline;
}

.graph-card-name {
  flex-grow: 0;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
}

.graph-card-value {
  margin-left: calc(var(--bento-gap) / 2);
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 1.25rem;
  opacity: 75%;
}

.graph-card-graph-container {
  flex-grow: 1;
  margin-top: var(--bento-gap);
}

.graph-card-graph {
  max-width: 100%;
  max-height: 100%;
}
</style>