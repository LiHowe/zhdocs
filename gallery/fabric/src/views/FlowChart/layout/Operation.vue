<script setup lang="ts">
import { addShape } from '../operation/addShape';
import { useRect, useLine } from '../shapes/basic'


const shapes = [
  {
    label: '矩形',
    shape: () => useRect(),
  },
  {
    label: '线段',
    shape: () => useLine(),
  }
]

</script>
<template>
  <header class="operation">
    <el-button v-for="item in shapes" @click="addShape(item.shape())"> {{ item.label }}</el-button>
  </header>
</template>
<style scoped lang="scss">
</style>
