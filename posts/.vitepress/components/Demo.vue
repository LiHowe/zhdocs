<template>
  <div class="demo-container">
    <div class="title">
      {{ title }}
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'
const props = withDefaults(defineProps<{
  title: string
}>(), {
  title: 'Demo'
})
</script>

<style scoped lang="scss">
.demo-container {
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 8px;

  .title {
    height: 30px;
    line-height: 32px;
    font-size: 14px;
    padding: 0 16px;
    background: #f5f5f5;
    border-radius: 8px 8px 0 0;
  }
  .content {
    padding: 16px;
    overflow: auto;
  }
}
</style>
