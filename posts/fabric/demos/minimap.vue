<template>
  <canvas ref="main" :width="size.width" :height="size.height"></canvas>
  <canvas ref="map" :width="size.width * mapRatio" :height="size.height * mapRatio"></canvas>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const mapRatio = ref(0.2)

const size = ref({
  width: 500,
  height: 400,
})

</script>

<style lang="scss" scoped>

</style>
