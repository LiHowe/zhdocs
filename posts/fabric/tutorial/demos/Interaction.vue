<template>
  <Demo>
    <FabricContainer :mounted="mounted">
      <template #ops>
        <Cbx
          v-for="c in ctrls"
          :key="c.key"
          :label="c.label"
          :title="c.key"
          v-model="c.checked"
          @change="(v: boolean) => handleChange(c, v)"
        />
        <Btn @click="selectAll">选中全部</Btn>
        <Btn @click="getActiveObj">获取选中元素</Btn>
      </template>
    </FabricContainer>
  </Demo>
</template>
<script setup lang="ts">
import FabricContainer from '../../components/FabricContainer.vue';
import { ref } from 'vue'
import { fabric } from 'fabric'

// the rect
const r = ref()

const canvas = ref()

function mounted(fb, c) {
  const rect = new fb.Rect({
    width: 60,
    height: 60,
    fill: '#42b883'
  })
  const circle = new fb.Circle({
    radius: 50,
    left: 50
  })
  c.add(rect, circle)
  canvas.value = c
  r.value = rect
  initCheckbox()
}

type CtrlItme = {
  key: string
  label: string
  checked?: boolean
}

const ctrls = ref<CtrlItme[]>([])

function initCheckbox() {
  const list: CtrlItme[] = [
    {
      key: 'evented',
      label: '响应事件'
    },
    {
      key: 'selectable',
      label: '可选中'
    },
    {
      key: 'lockMovementX',
      label: '禁用水平移动'
    },
    {
      key: 'lockMovementY',
      label: '禁用垂直移动'
    },
    {
      key: 'lockRotation',
      label: '禁用旋转'
    },
    {
      key: 'lockScalingX',
      label: '禁用水平缩放'
    },
    {
      key: 'lockScalingY',
      label: '禁用垂直缩放'
    },
    {
      key: 'lockSkewingX',
      label: '禁用水平倾斜'
    },
    {
      key: 'lockSkewingY',
      label: '禁用垂直倾斜'
    },
    {
      key: 'lockScalingFlip',
      label: '禁用缩放翻转'
    },
  ]
  ctrls.value = list.map(x => {
    x['checked'] = r.value.get(x.key)
    return x
  })
}

function handleChange(item: CtrlItme, v: boolean) {
  r.value.set(item.key, v)
}

function getActiveObj() {
  console.log('getActiveObject', canvas.value.getActiveObject())
  console.log('getActiveObjects', canvas.value.getActiveObjects())
}

function selectAll() {
  canvas.value.discardActiveObject()
  const selection = new fabric.ActiveSelection(canvas.value.getObjects(), { canvas: canvas.value })
  canvas.value.setActiveObject(selection)
  canvas.value.requestRenderAll()
}

function useZoom(canvas: fabric.Canvas, opt?: {
  max: number,
  min: number
} = {
  max: 20,
  min: 0.01,
}) {
  canvas.on('mouse:wheel', ({ e, pointer }) => {
    e.preventDefault()
    e.stopPropagation()

    const delta = e.deltaY
    let zoom = canvas.getZoom()
    zoom *= 0.999 ** delta
    canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, zoom)

    console.log(canvas.viewportTransform)
  })
}

</script>
<style scoped>

</style>
