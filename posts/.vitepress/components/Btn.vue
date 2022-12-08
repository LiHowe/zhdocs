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
  margin: 5px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-mute);
  transition: color linear .15s;
  &:hover {
    color: var(--vp-c-green);
  }
  &.primary {
    background-color: var(--vp-c-green-dark);
  }
  &.warning {
    background-color: var(--vp-c-yellow-dark);
  }
}
.btn-icon {
  color: var(--vp-c-text-1);
  display: inline-block;
  margin-right: 5px;
  animation: rotate linear infinite 2s;
}


</style>
