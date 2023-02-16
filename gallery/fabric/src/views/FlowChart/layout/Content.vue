<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { canvas, useFabric } from '../hooks/fabric'

const main = ref<HTMLCanvasElement>()

onMounted(() => {
  canvas.value = main.value
  useFabric()
})
</script>
<template>
  <canvas ref="main" width="800" height="400"></canvas>
</template>
<style lang="scss">
.flowchart-container {
  border: 1px solid #e9e9e9;
}
</style>
