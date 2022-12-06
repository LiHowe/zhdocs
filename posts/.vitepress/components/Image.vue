<template>
  <div class="image-wrapper" :class="wrapperClass">
    <img class="image" :src="src" :alt="title"/>
    <p class="image-title">{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue'
const props = withDefaults(defineProps<{
  src: string
  title: string
  inline?: boolean
}>(), {
  inline: false
})

// TODO: 1. 点击放大
// TODO: 2. 懒加载, loading占位图

const imgStyle = computed(() => {
  const s = {}
  if (props.inline) {
    s['display'] = 'inline'
    s['verticalAlign'] = 'middle'
  }
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
