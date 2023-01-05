<template>
  <div class="runnable-container">
    <div class="runnable-header">
      <span>
        <Icon name="terminal" />
        <span class="title-content">{{ title }}</span>
      </span>
      <Btn class="play-btn" @click="run" title="点击运行" icon="play"></Btn>
    </div>
    <div>
      <fabric-container v-if="type === 'view'" :static="static" :mounted="fbMounted"/>

      <div class="ops-container">
        <Btn v-for="b in opsList" :key="b.label" @click="b.onClick">
          {{ b.label }}
        </Btn>
      </div>

      <div class="toggle-code" @click="handleShowCode">
        <i class="iconfont icon-code" />
        {{ !showCodeFlag ? '查看' : '收起'}}代码
      </div>

      <div class="runnable-code" ref="code" v-show="showCodeFlag">
        <slot></slot>
      </div>



      <div class="runnable-result" v-if="type === 'log'">
        <p v-for="(log, i) in logs">{{i + 1}}. {{ log }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, withDefaults, onMounted } from 'vue'
import FabricContainer from './FabricContainer.vue'
import { fabric } from 'fabric'

const props = withDefaults(defineProps<{
  title?: string
  type?: 'log' | 'view'
  auto?: boolean // 是否自动运行
  showCode?: boolean
  static?: boolean // 是否使用 StaticCanvas
}>(), {
  type: 'log',
  title: 'Try it',
  auto: false,
  showCode: false,
  static: false,
})

const code = ref<HTMLDivElement>()

const logs = ref<any[]>([])


type BtnItem = {
  label: string
  onClick: () => void
}
const opsList = ref<BtnItem[]>([])

const canvas = ref()
const fb = ref()

function run() {
  if (!code.value) return
  const codeDiv = code.value.querySelector('pre.shiki') as HTMLDivElement
  const fnStr = codeDiv.innerText
  if (!fnStr) return
  const fn = new Function('params',
  `
  const {fabric, logs, canvas, addBtn} = params
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
    if (props.type === 'view') {
      canvas.value.clear()
      opsList.value.length = 0
      fn({
        fabric: fb.value,
        logs: logs.value,
        canvas: canvas.value,
        addBtn
      })
    } else {
      fn({
        fabric,
        logs: logs.value,
        addBtn
      })
    }
  } catch(e) {
    console.error(e)
  }
}

function addBtn(item: BtnItem) {
  opsList.value.push(item)
}

function fbMounted(f, c) {
  canvas.value = c
  fb.value = f
}

onMounted(() => {
  if (props.auto) {
    try {
      run()
    } catch (e) {
      console.log(e)
    }
  }
})


const showCodeFlag = ref(props.showCode)

function handleShowCode() {
  showCodeFlag.value = !showCodeFlag.value
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
      padding: 4px;
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

.toggle-code {
  display: block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  background: var(--vp-c-bg-soft);
  color: var(--vp-custom-block-details-text);
  border-radius: 0 0 8px 8px;
  &:hover {
    background: var(--vp-c-bg-mute);
  }
}
</style>
