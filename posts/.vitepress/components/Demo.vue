<template>
  <div class="demo-container">
    <div class="title" v-if="title">
      <span>
        {{ title }}
      </span>
      <Btn class="title-btn" @click="reload">
        <i class="iconfont icon-refresh"></i>
      </Btn>
    </div>
    <div class="content" v-if="f">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, nextTick } from 'vue'
const props = withDefaults(defineProps<{
  title: string
}>(), {
  title: 'Playground'
})

const f = ref(true)

function reload() {
  f.value = false
  nextTick(() => {
    f.value = true
  })
}
</script>

<style scoped lang="scss">
.demo-container {
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 8px;

  .title {
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: 14px;
    padding: 16px;
    background: var(--vp-c-bg-soft);
    border-radius: 8px 8px 0 0;
    font-weight: bold;
    color: var(--vp-custom-block-details-text);
  }
  .title-btn {
    margin: 0;
    padding: 4px;
    margin-left: auto;
  }
  .content {
    padding: 16px;
    overflow: auto;
  }
}

</style>
