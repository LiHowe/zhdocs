<template>
  <canvas ref="mainEl" width="670" height="400"></canvas>
  <!-- <span>
    缩放倍数: {{ main }}
  </span> -->
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { fabric } from 'fabric';
import { useMiniMap } from './useMini'

const mainEl = ref<HTMLCanvasElement>()

const state = reactive({
  zoom: 1
})

onMounted(() => {
  if (!mainEl.value) return
  const main = new fabric.Canvas(mainEl.value)

  main.add(new fabric.Rect({
    width: 40,
    height: 40,
  }))

  main.renderAll()

  useMiniMap(main, {
    offset: 5,
  })

})

</script>
<style>
.canvas-container {
  position: relative;
  border: 1px solid #e9e9e9;
}
</style>
