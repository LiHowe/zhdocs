<template>
  <div class="demo-container">
    <div class="title" v-if="title">
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
    line-height: 1;
    font-size: 14px;
    padding: 16px;
    background: var(--vp-c-bg-soft);
    border-radius: 8px 8px 0 0;
    font-weight: bold;
    color: var(--vp-custom-block-details-text);
  }
  .content {
    padding: 16px;
    overflow: auto;
  }
}
</style>
