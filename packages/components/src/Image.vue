<template>
  <div class="image-wrapper" :class="wrapperClass" :style="wrapperStyle">
    <img class="image" :src="src" :alt="title" :style="imgStyle"/>
    <p class="image-title">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue'
const props = withDefaults(defineProps<{
  src: string
  title: string
  inline?: boolean
  zoom?: number | string
  width?: number | string
  height?: number | string
}>(), {
  inline: false,
  zoom: 1
})

// TODO: 1. 点击放大
// TODO: 2. 懒加载, loading占位图

const imgStyle = computed(() => {
  const s = {}
  if (props.inline) {
    s['display'] = 'inline'
    s['verticalAlign'] = 'middle'
  }
  if (props.zoom) {
    s['transform'] = `scale(${props.zoom})`
  }
  return s
})

const wrapperStyle = computed(() => {
  const s = {}
  if (props.width) s['width'] = props.width + 'px'
  if (props.height) s['height'] = props.height + 'px'
  return s
})

const wrapperClass = computed(() => {
  const cls = []
  if (props.inline) cls.push('inline')
  return cls
})

</script>

<style lang="scss" scoped>
.image-wrapper {
  text-align: center;
  user-select: none;
  margin: 0 auto;
  &.inline {
    display: inline-block;
    vertical-align: middle;
  }
  .image {
    margin: 0 auto;
  }
  .image-title {
    text-align: center;
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
}
</style>
