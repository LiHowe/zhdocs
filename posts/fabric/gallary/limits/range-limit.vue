<template>
  <div>
    <canvas ref="canvas" width="400" height="300"></canvas>
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted, ref } from 'vue'
import { useCanvasMoveLimit, useShapeMoveLimit, useShapeScaleLimit } from '../utils'

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
  const c = new fabric.Canvas(canvas.value)
  const rect = new fabric.Rect({
    width: 50,
    height: 50,
    left: 50,
    top: 50,
    fill: '#04b931',
  })
  const circle = new fabric.Circle({
    radius: 30,
  })
  c.add(rect, circle)

  useShapeMoveLimit(rect)
  useShapeScaleLimit(rect)
  // useCanvasMoveLimit(c)
})

</script>

<style lang="scss">
.canvas-container {
  outline: 1px solid;
}
</style>
