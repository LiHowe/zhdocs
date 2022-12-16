<template>
  <button class="h-btn" :disabled="loading">
    <div v-if="loading" class="btn-icon loading">
      <i class="iconfont icon-loading"></i>
    </div>
    <div v-if="icon" class="btn-icon">
      <i :class="['iconfont', `icon-${icon}`]"></i>
    </div>
    <span v-if="!isEmpty" class="btn-label">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

const props = defineProps<{
  loading?: boolean,
  icon?: string,
}>()

const slots = useSlots()

const isEmpty = computed(() => !slots.default)

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
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
  color: inherit;
  display: inline-block;
  & +.btn-label {
    margin-left: 5px;
  }
  &.loading {
    animation: rotate linear infinite 2s;
  }
}


</style>
