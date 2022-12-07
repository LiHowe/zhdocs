<template>
  <button class="h-btn" :disabled="loading">
    <template v-if="loading">
      <div class="btn-icon">
        <i class="iconfont icon-loading"></i>
      </div>
    </template>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading?: boolean
}>()

</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.h-btn {
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--vp-c-brand);
  color: darken(#fff, 5%);
  & + & {
    margin-left: 5px;
  }
}
.btn-icon {
  color: darken(#fff, 5%);
  display: inline-block;
  margin-right: 5px;
  animation: rotate linear infinite 2s;
}


</style>
