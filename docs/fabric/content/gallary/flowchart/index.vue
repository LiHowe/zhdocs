<template>
  <div class="flowchart-container" ref="container">
    <!-- 画布 -->
    <canvas ref="canvasEl" width="500" height="300"></canvas>
    <!-- 操作栏 -->
    <div class="ops-container">

    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fabric } from 'fabric'

const container = ref<HTMLDivElement>()

onMounted(() => {
  useFabric()
})

function useFabric() {
  const canvasEl = ref<HTMLCanvasElement>()
  if (!canvasEl.value) return
  console.log('use Fabric')
  const canvas = ref<fabric.Canvas>()
    canvas.value = new fabric.Canvas(canvasEl.value, {
    containerClass: 'flowchart',
    width: container.value?.clientWidth
  })
  return {
    cv: canvas.value,
    setCv: (c: fabric.Canvas) => canvas.value = c
  }
}

</script>
<style scoped lang="scss">
.flowchart-container {
  border: 1px solid #e9e9e9;
}

.flowchart {
  border: 1px solid #e9e9e9;
}

.ops-container {

}
</style>
