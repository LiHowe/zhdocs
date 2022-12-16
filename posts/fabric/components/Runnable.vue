<template>
  <div class="runnable-container">
    <div class="runnable-header">
      <span>
        <Icon name="terminal" />
        <span class="title-content">{{ title ?? 'Try it' }}</span>
      </span>
      <Btn class="play-btn" @click="run" title="run" icon="play"></Btn>
    </div>
    <div>
      <div class="runnable-code" ref="code">
        <slot></slot>
      </div>
      <div class="runnable-result">
        <p v-for="(log, i) in logs">{{i + 1}}. {{ log }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { fabric } from 'fabric';

const props = defineProps<{
  title?: string
}>()

const code = ref<HTMLDivElement>()

const logs = ref<any[]>([])

function run() {
  if (!code.value) return
  const codeDiv = code.value.querySelector('pre.shiki') as HTMLDivElement
  const fnStr = codeDiv.innerText
  if (!fnStr) return
  const fn = new Function('fabric', 'logs', `
  const console = {
    log(...args) {
      logs.push(...args)
      window.console.log('[Runnable]:', ...args)
    }
  }
  ${fnStr}
  `)
  try {
    logs.value = []
    fn(fabric, logs.value)
  } catch(e) {
    console.error(e)
  }
}
</script>

<style scoped lang="scss">
.result {
  max-height: 200px;
  overflow-x: hidden;
  overflow-y: auto;
}
.runnable {
  &-container {
    border: 1px solid var(--vp-c-divider-light);
    border-radius: 8px;
  }
  &-header {
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: 14px;
    padding: 16px;
    background: var(--vp-c-bg-soft);
    border-radius: 8px 8px 0 0;
    font-weight: bold;
    color: var(--vp-custom-block-details-text);
    user-select: none;
    .play-btn {
      margin-left: auto;
    }
    .title-content {
      margin-left: 5px;
    }
  }
  &-code {
    :deep(div[class*="language-"]) {
      margin: 0;
      border-radius: 0 0 8px 8px;
    }
  }
  &-result {
    font-size: 12px;
    max-height: 300px;
    overflow: hidden auto;
  }
}

</style>
