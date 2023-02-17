<script setup lang="ts">
import { addShape } from '../operation/addShape';
import { useRect, useLine, useCurve, useTextRect, useText } from '../shapes/basic'
import { clear } from '@/views/FlowChart/operation/basic'

const ops = [
  {
    label: '矩形',
    action: () => addShape(useRect()),
  },
  {
    label: '线段',
    action: () => addShape(useLine()),
  },
  // {
  //   label: '曲线',
  //   action: () => addShape(useCurve()),
  // },
  {
    label: '文本框',
    action: () => addShape(useTextRect()),
  },
  {
    label: '文字',
    action: () => addShape(useText()),
  },
  {
    label: '清空',
    action: () => clear()
  }
]

</script>
<template>
  <header class="operation">
    <el-button v-for="item in ops" @click="item.action" :type="item.type?? 'default'">
      {{ item.label }}
    </el-button>
  </header>
</template>
<style scoped lang="scss">
</style>
