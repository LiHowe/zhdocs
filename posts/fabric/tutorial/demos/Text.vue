<template>
  <div class="container">
    <canvas ref="textCanvas" width="300" height="300"></canvas>
    <div class="operator-container">
      <div v-for="item in operators" :key="item.label">
        {{ item.label }}
        <input :type="item.type" :value="textOptions[item.label]" @change="e => changeAttr(e, item)">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, reactive, toRaw } from 'vue'
import { fabric } from 'fabric'

const textCanvas = ref()

const fb = ref()

const t = ref()

const textOptions = reactive({
  text: 'fabric教程',
  fontSize: 40,
  fontWeight: 'normal',
  fontFamily: 'Times New Roman',
  underline: false,
  overline: false,
  linethrough: false,
  textAlign: 'left',
  fontStyle: 'normal',
  lineHeight: 1.16,
  textBackgroundColor: ''
})

function addText() {
  t.value = new fabric.Text(textOptions.text, {
    left: 40,
    top: 40,
  })
  console.log(t.value)
  fb.value.add(t.value)
}

type OperatorItem = {
  type: string
  label: string
}
const operators = ref<OperatorItem[]>([])

// 创建操作
function buildOperator() {
  for (const [k, v] of Object.entries(textOptions)) {
    const item = {} as OperatorItem
    if (typeof v === 'string') {
      item.type = 'input'
    } else if (typeof v === 'boolean') {
      item.type = 'checkbox'
    } else if (typeof v === 'number'){
      item.type = 'number'
    }
    item.label = k
    operators.value.push(item)
  }
}

function changeAttr(e: InputEvent, item: OperatorItem) {
  const { target } = e
  const { checked, value } = target as HTMLInputElement
  const { type, label } = item
  t.value.set(label, type === 'checkbox' ? checked : value)
  textOptions[label] = type === 'checkbox' ? checked : value
  fb.value.requestRenderAll()
}

onMounted(() => {
  fb.value = new fabric.Canvas(textCanvas.value, {
    containerClass: 'fb-container'
  })
  addText()
  buildOperator()
})

</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 300px 300px;
  gap: 10px;
}
.operator-container {
  margin-top: 10px;
  input {
    margin: 0 5px;
    border-bottom: 1px solid var(--vp-c-divider-light);
    padding: 0 5px;
    border-radius: 5px;
    &:focus {
      outline: 1px solid var(--vp-c-green);
    }
  }
}
</style>
