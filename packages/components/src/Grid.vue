<script setup lang="ts">
/**
 * create_at: 2023/7/20
 * description: 用于分列, 使用 grid 布局而已, 默认 2 列(1列也没必要用)
 */
import { computed } from 'vue'

const props = defineProps({
  cols: {
    type: [Number,String],
    default: 2,
  },
  rows: {
    type: [Number, String],
    default: 1,
  }
})

const style = computed(() => ({
  'grid-template-columns': `repeat(${props.cols}, auto)`,
  'grid-template-rows': `repeat(${props.rows}, auto)`
}))

</script>
<template>
  <div class="col-wrapper" :style="style">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.col-wrapper {
  display: grid;
  width: 100%;
  grid-gap: 10px;
}
</style>
