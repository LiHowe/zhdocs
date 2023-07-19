<template>
  <div class="demo-container">
    <div class="title" v-if="title">
      <span>
        {{ title }}
      </span>
      <el-button type="text" class="title-btn" title="重新运行" @click="reload">
        <i class="iconfont icon-refresh"></i>
      </el-button>
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

  :deep(div[class*="language-"]) {
    margin: 0;
    border-radius: 0;
  }

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
    width: 100%;
    overflow: hidden auto;
    border: 1px solid var(--vp-c-bg-soft);
    border-top-color: transparent;
  }
}

</style>
