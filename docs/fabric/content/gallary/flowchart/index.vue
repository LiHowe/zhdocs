<template>
  <div class="flowchart-container">
    <!-- 画布 -->
    <canvas ref="canvas" width="500" height="300"></canvas>
    <!-- 操作栏 -->
    <div class="ops-container">

    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fabric } from 'fabric'

const canvas = ref('canvas')

onMounted(() => {
  if (!canvas.value) return
  const fb = new fabric.Canvas(canvas.value)

})

function initFabric() {

}

</script>
<style scoped lang="scss">
.flowchart-container {

}

.ops-container {

}
</style>
