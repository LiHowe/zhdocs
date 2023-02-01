<template>
  <Demo>
    <FabricContainer :mounted="mounted">
      <template #ops>
        <el-button v-for="b in btns" type="primary" @click="changeBrush(b.value)">
          {{ b.label }}
        </el-button>
      </template>
    </FabricContainer>
  </Demo>
</template>

<script setup lang="ts">
import FabricContainer from '../../../components/FabricContainer.vue'
import { ref } from 'vue'

const btns = ref([
  {
    label: '铅笔',
    value: 'PencilBrush'
  },
  {
    label: '圆形笔刷',
    value: 'CircleBrush'
  },
  {
    label: '喷雾笔刷',
    value: 'SprayBrush'
  },
  {
    label: '图案笔刷',
    value: 'PatternBrush'
  },
])

const points = Array.from(new Array(20), (x, i) => ({
  x: Math.random() * i * 10,
  y: Math.random() * i * 10,
}))

const canvas = ref()
const fabric = ref()

function mounted(fb: typeof fabric, c) {
  fabric.value = fb
  canvas.value = c
  c.freeDrawingBrush.width = 12
}

function changeBrush(type) {
  const brush = new fabric.value[type](canvas.value)
  brush.color = 'rgba(100, 108, 255, 1)'
  canvas.value.freeDrawingBrush = brush
  const fakeEvent = { e: { isPrimary: true } }
  points.forEach(({ x, y }) => {
    brush.onMouseMove(new fabric.value.Point(x, y), fakeEvent)
  })
  brush.onMouseUp(fakeEvent);
}
</script>

