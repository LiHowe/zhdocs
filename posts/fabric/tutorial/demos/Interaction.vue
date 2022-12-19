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

function mounted(fb, c) {
  const rect = new fb.Rect({
    width: 60,
    height: 60,
    fill: '#42b883'
  })
  c.add(rect)
  r.value = rect
  initCheckbox()
  useZoom(c)
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
