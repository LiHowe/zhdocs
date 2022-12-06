<template>
  <div ref="wrapper" class="wrapper">
    <canvas class="main" ref="canvasEl" width="600" height="400"></canvas>
  </div>
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { ref, onMounted, computed } from 'vue'
// import * as dat from 'dat.gui'

const canvasEl = ref<HTMLCanvasElement>()
const fb = ref()
const rect = ref()
const wrapper = ref()

const keyEncode: Record<string, string> = {
  type: '类型',
  originX: '水平中心',
  originY: '垂直中心',
  top: '上',
  left: '左',
  width: '宽度',
  height: '高度',
  scaleX: 'X缩放',
  scaleY: 'Y缩放',
  flipX: '水平翻转',
  flipY: '垂直翻转',
  opacity: '透明度',
  angle: '旋转角度',
  skewX: 'X倾斜角度',
  skewY: 'Y倾斜角度',
  cornerSize: '控制点大小',
  touchCornerSize: '触控点大小',
  transparentCorners: '透明控制点',
  hoverCursor: '鼠标hover指针',
  moveCursor: '鼠标移动指针',
  padding: '内边距',
  borderColor: '边框颜色',
  cornerColor: '控制点颜色',
  cornerStrokeColor: '控制点边框颜色',
  cornerStyle: '控制点样式',
  centeredScaling: '中心缩放',
  centeredRotation: '中心旋转',
  fill: '填充颜色',
  fillRule: '填充规则',
  globalCompositeOperation: '合成操作类型',
  backgroundColor: '背景颜色',
  selectionBackgroundColor: '选中背景颜色',
  stroke: '边框',
  strokeWidth: '边框宽度',
  strokeLineCap: '边框切线类型',
  strokeLineJoin: '边框交线类型',
  strokeMiterLimit: 'miter限制',
  borderOpacityWhenMoving: '移动时边框透明度',
  borderScaleFactor: '边框缩放系数',
  minScaleLimit: '最小缩放限制',
  selectable: '可选中',
  evented: '响应事件',
  visible: '可见',
  hasControls: '有控制点',
  hasBorders: '有边框',
  perPixelTargetFind: '根据像素查找元素',
  includeDefaultValues: '序列化包含默认值',
  lockMovementX: '禁用水平移动',
  lockMovementY: '禁用垂直移动',
  lockRotation: '禁用旋转',
  lockScalingX: '禁用水平缩放',
  lockScalingY: '禁用垂直缩放',
  lockSkewingX: '禁用水平倾斜',
  lockSkewingY: '禁用垂直倾斜',
  lockScalingFlip: '禁用缩放翻转',
  excludeFromExport: '不导出',
  objectCaching: '对象缓存',
  statefullCache: '有状态的缓存',
  noScaleCache: '缩放不更新缓存',
  strokeUniform: '边框宽度是否随着对象缩放变化',
  dirty: '脏',
  __corner: '最后一个角',
  paintFirst: '先绘制边还是先填充',
  activeOn: '对象触发时机',
  inverted: '剪裁外侧',
  absolutePositioned: '绝对位置',
}

const keyDecode = Object.entries(keyEncode).reduce((res, [k, v]) => {
  res[v] = k
  return res
}, {})

// 构建中文属性
const fakeRect = computed(() => {
  const obj: Record<string, any> = {}
  for(const key in rect.value) {
    if (typeof rect.value[key] === 'object' || rect.value[key] instanceof Function) continue
    obj[keyEncode[key] ?? key] = rect.value[key]
  }
  return obj
})

const controllers = ref<Record<string, any>>({})

async function initGui() {
  const dat = await import('dat.gui')
  const gui = new dat.GUI({
    name: 'Rect Controller',
    autoPlace: false
  })
  gui.domElement.id = 'gui'
  for(const x in fakeRect.value) {
    try {
      const fn = /颜色/gi.test(x) ? 'addColor' : 'add'
      controllers.value[x] = gui[fn](fakeRect.value, x).onChange(val => {
        const k = keyDecode[x] ?? x
        rect.value.set(k, val)
        fb.value.requestRenderAll()
      })
    } catch (e) {
      console.error('error with',x,e)
    }
  }
  wrapper.value.append(gui.domElement)
}

onMounted(() => {
  const fbObj = new fabric.Canvas(canvasEl.value!)
  const rectObj = new fabric.Triangle({
    width: 100,
    height: 100,
    top: 40,
    left: 40,
    fill: 'rgba(255,0,0, 0.5)',
    backgroundColor: 'rgba(27,255,0,0.5)',
    selectionBackgroundColor: 'rgba(47,100,227, 0.5)'
  })
  fbObj.add(rectObj)
  rect.value = rectObj
  fb.value = fbObj
  rectObj.on('modified', (...args) => {
    console.log(args)
  })
  initGui()
})


</script>

<style scoped>
.wrapper {
  position: relative;
  overflow: hidden auto;
}
.main {
  border: 1px solid #e9e9e9;
}
</style>

<style>
#gui {
  position: absolute;
  top: 0;
  right: 0;
  overflow: hidden auto;
  height: 100%;
  width: 280px;
}
#gui .closed {
  display: none;
}
#gui li + li {
  margin-top: 0;
}
#gui div.c input {
  line-height: 1;
}
</style>
