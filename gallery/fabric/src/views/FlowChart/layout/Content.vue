<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { canvas, useFabric } from '../hooks/fabric'

const main = ref<HTMLCanvasElement>()

onMounted(() => {
  canvas.value = main.value
  useFabric()
})
</script>
<template>
  <canvas ref="main" width="500" height="300"></canvas>
</template>
<style lang="scss">
.flowchart-container {
  border: 1px solid #e9e9e9;
}
</style>
