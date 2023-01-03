<template>
  <div ref="wrapper" class="canvas-wrapper">
    <canvas ref="main" :width="size.width" :height="size.height"></canvas>
    <canvas ref="map" :width="size.width * mapRatio" :height="size.height * mapRatio"></canvas>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fabric } from 'fabric';
import { useZoom, useTranslate } from '../utils'


const mapRatio = ref(0.2)

const size = ref({
  width: 500,
  height: 400,
})


const wrapper = ref<HTMLDivElement>()

const main = ref<HTMLCanvasElement>()
const map = ref<HTMLCanvasElement>()

const preset = {"version":"3.6.3","objects":[{"type":"rect","version":"3.6.3","left":513,"top":160,"width":50,"height":50,"fill":"#8d476b","opacity":0.8},{"type":"circle","version":"3.6.3","left":174,"top":166,"width":100,"height":100,"fill":"#383881","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"triangle","version":"3.6.3","left":330,"top":242,"width":50,"height":50,"fill":"#c8eff0","opacity":0.8},{"type":"line","version":"3.6.3","left":328,"top":300,"width":150,"height":100,"stroke":"#98d727","x1":-75,"x2":75,"y1":-50,"y2":50},{"type":"polygon","version":"3.6.3","left":44,"top":257,"width":385,"height":245,"fill":"#6aefb4","points":[{"x":185,"y":0},{"x":250,"y":100},{"x":385,"y":170},{"x":0,"y":245}]},{"type":"textbox","version":"3.6.3","left":254,"top":195,"width":300,"height":75.03,"fill":"#049c82","angle":-9,"text":"Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor ","fontSize":20,"fontWeight":"","fontFamily":"helvetica","minWidth":20,"splitByGrapheme":false,"styles":{}},{"type":"i-text","version":"3.6.3","left":348,"top":326,"width":598.13,"height":150.06,"fill":"#d15803","scaleX":0.5,"scaleY":0.5,"angle":3,"text":"Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"text","version":"3.6.3","left":32,"top":438,"width":598.13,"height":254.93,"fill":"#69c5c5","scaleX":0.5,"scaleY":0.5,"angle":4,"text":"Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\nUt enim ad mini","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"rect","version":"3.6.3","left":175,"top":105,"width":50,"height":50,"fill":"#761c05","opacity":0.8},{"type":"circle","version":"3.6.3","left":187,"top":6,"width":100,"height":100,"fill":"#360560","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"triangle","version":"3.6.3","left":284,"top":390,"width":50,"height":50,"fill":"#fe047d","opacity":0.8},{"type":"line","version":"3.6.3","left":290,"top":434,"width":150,"height":100,"stroke":"#ad7cee","x1":-75,"x2":75,"y1":-50,"y2":50},{"type":"polygon","version":"3.6.3","left":20,"top":249,"width":385,"height":245,"fill":"#3a41a7","scaleX":0.55,"scaleY":0.55,"points":[{"x":185,"y":0},{"x":250,"y":100},{"x":385,"y":170},{"x":0,"y":245}]},{"type":"textbox","version":"3.6.3","left":269,"top":27,"width":300,"height":153.68,"fill":"#e19e54","angle":-1,"text":"Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\nUt enim ad minim veniam,\nquis no","fontSize":20,"fontWeight":"","fontFamily":"helvetica","minWidth":20,"splitByGrapheme":false,"styles":{}},{"type":"i-text","version":"3.6.3","left":391,"top":296,"width":493.52,"height":97.63,"fill":"#d63098","scaleX":0.5,"scaleY":0.5,"angle":-10,"text":"Lorem ipsum dolor sit amet,\nconsectetur ","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"text","version":"3.6.3","left":330,"top":544,"width":371.25,"height":45.2,"fill":"#4d690c","scaleX":0.5,"scaleY":0.5,"angle":5,"text":"Lorem ipsum dolor si","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"rect","version":"3.6.3","left":100,"top":66,"width":50,"height":50,"fill":"#1b39bb","opacity":0.8},{"type":"circle","version":"3.6.3","left":266,"top":98,"width":100,"height":100,"fill":"#4f8af4","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"triangle","version":"3.6.3","left":119,"top":152,"width":50,"height":50,"fill":"#6d16e6","opacity":0.8},{"type":"text","version":"3.6.3","left":365,"top":237,"width":493.52,"height":97.63,"fill":"#44c459","scaleX":0.5,"scaleY":0.5,"angle":-2,"text":"Lorem ipsum dolor sit amet,\nconsectet","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"i-text","version":"3.6.3","left":220.87,"top":288.28,"width":598.13,"height":202.5,"fill":"#42cf3f","scaleX":0.5,"scaleY":0.5,"angle":12.72,"text":"Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna al","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"circle","version":"3.6.3","left":0,"top":127,"width":100,"height":100,"fill":"#9e4b3c","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"rect","version":"3.6.3","left":530,"top":16,"width":50,"height":50,"fill":"#a209e7","opacity":0.8},{"type":"triangle","version":"3.6.3","left":88,"top":211,"width":50,"height":50,"fill":"#20286e","opacity":0.8},{"type":"line","version":"3.6.3","left":27,"top":237,"width":150,"height":100,"stroke":"#5e9fb3","x1":-75,"x2":75,"y1":-50,"y2":50},{"type":"circle","version":"3.6.3","left":371,"top":447,"width":100,"height":100,"fill":"#5ec5ba","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"i-text","version":"3.6.3","left":376,"top":444,"width":493.52,"height":150.06,"fill":"#ecb2cc","scaleX":0.5,"scaleY":0.5,"angle":-1,"text":"Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do ei","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"rect","version":"3.6.3","left":492,"top":505,"width":50,"height":50,"fill":"#9fa139","opacity":0.8},{"type":"triangle","version":"3.6.3","left":559,"top":527,"width":50,"height":50,"fill":"#d5eb95","opacity":0.8},{"type":"triangle","version":"3.6.3","left":566,"top":90,"width":50,"height":50,"fill":"#d3d188","opacity":0.8},{"type":"polygon","version":"3.6.3","left":834.66,"top":241.24,"width":385,"height":245,"fill":"#9580bf","scaleX":0.68,"scaleY":0.68,"angle":140,"points":[{"x":185,"y":0},{"x":250,"y":100},{"x":385,"y":170},{"x":0,"y":245}]},{"type":"rect","version":"3.6.3","left":643,"top":16,"width":50,"height":50,"fill":"#c1b138","scaleX":2.64,"scaleY":2.64,"opacity":0.8},{"type":"text","version":"3.6.3","left":389,"top":360,"width":22.25,"height":45.2,"fill":"#d6a02d","scaleX":0.5,"scaleY":0.5,"text":"L","fontWeight":"","fontFamily":"helvetica","styles":{}},{"type":"triangle","version":"3.6.3","left":625,"top":350,"width":50,"height":50,"fill":"#908f9f","opacity":0.8},{"type":"circle","version":"3.6.3","left":603,"top":454,"width":100,"height":100,"fill":"#578b25","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"circle","version":"3.6.3","left":681,"top":388,"width":100,"height":100,"fill":"#990621","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"circle","version":"3.6.3","left":676,"top":491,"width":100,"height":100,"fill":"#c2d944","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"circle","version":"3.6.3","left":644,"top":53,"width":100,"height":100,"fill":"#c1532e","opacity":0.8,"radius":50,"startAngle":0,"endAngle":6.283185307179586},{"type":"triangle","version":"3.6.3","left":601,"top":434,"width":50,"height":50,"fill":"#54cd04","opacity":0.8},{"type":"line","version":"3.6.3","left":435,"top":198,"width":150,"height":100,"stroke":"#d08d13","x1":-75,"x2":75,"y1":-50,"y2":50},{"type":"rect","version":"3.6.3","left":101,"top":12,"width":50,"height":50,"fill":"#7a7d9c","opacity":0.8},{"type":"rect","version":"3.6.3","left":14,"top":7,"width":50,"height":50,"fill":"#16c0ef","opacity":0.8},{"type":"rect","version":"3.6.3","left":22,"top":74.17,"width":50,"height":50,"fill":"#8a4cde","angle":355.3,"opacity":0.8}]}

onMounted(() => {
  const w = wrapper.value?.clientWidth
  const h = wrapper.value?.clientHeight


  const fbmain = new fabric.Canvas(main.value, {
    width: w,
    height: h,
  })
  const fbmap = new fabric.Canvas(map.value, {
    containerClass: 'canvas-map',
    width: w * mapRatio.value,
    height: h * mapRatio.value
  })

  function createCanvasEl() {
    // 假设画布内容为 800 * 600
    const designSize = { width: 800, height: 480 }
    // 记录原始视窗
    const originVPT = fbmain.viewportTransform
    // 计算设计大小缩放到画布大小的比率
    const mainRatio = fabric.util.findScaleToFit(designSize, fbmain)

    // 计算将整体画布缩放到minimap的比率
    const mapRatio = fabric.util.findScaleToFit(fbmain, fbmap)

    // 获取当前环境像素缩放比例
    const scaling = fbmap.getRetinaScaling()

    // 最终大小
    const finalWidth = designSize.width * mainRatio
    const finalHeight = designSize.height * mainRatio

    // 设置初始缩放及偏移
    fbmain.viewportTransform = [
      mainRatio, 0, 0, mainRatio,
      (fbmain.getWidth() - finalWidth) / 2,
      (fbmain.getHeight() - finalHeight) / 2,
    ]
    // 拷贝内容作为一个新的canvas
    const canvas = fbmain.toCanvasElement(mapRatio * scaling)
    // 还原变换矩阵
    fbmain.viewportTransform = originVPT
    return canvas
  }

  fbmain.loadFromJSON(preset, () => {
    const bg = new fabric.Image(createCanvasEl())

    const scaling = fbmain.getRetinaScaling()

    bg.scaleX = 1 / scaling
    bg.scaleY = 1 / scaling

    fbmap.backgroundColor = 'white'
    fbmap.centerObject(bg)
    fbmap.backgroundImage = bg
    fbmap.requestRenderAll()

    const range = new fabric.Rect({
      top: bg.top,
      left: bg.left,
      width: bg.width / scaling,
      height: bg.height / scaling,
      fill: 'rgba(0, 0, 255, 0.3)',
      transparentCorners: false,
      cornerColor: 'blue',
      strokeWidth: 0,
      selectable: false
    })

    range.controls = {
      br: fabric.Object.prototype.controls.br
    }

    fbmap.add(range)

    fbmain.on('object:modified', e => {
      fbmain.fire('modified')
    })

    fbmain.on('modified', () => {
      console.log('fbmain object modified')
      fbmap.backgroundImage._element = createCanvasEl()
      fbmap.requestRenderAll()
    })
  })


  useTranslate(fbmain, {
    onMove: updateMiniMapVP
  })
  useZoom(fbmain, {
    max: 10,
    min: 0.1,
    onZoom: updateMiniMapVP
  })

  // 更新迷你地图视窗变换
  function updateMiniMapVP() {
    const designSize = { width: 686, height: 480 }
    // 获取范围框
    const rect = fbmap.getObjects()[0]
    //
    const mainRatio = fabric.util.findScaleToFit(designSize, fbmain)
    const totalRatio = fabric.util.findScaleToFit(designSize, fbmap)
    const finalRatio = mainRatio / fbmain.getZoom()

    rect.scaleX = finalRatio
    rect.scaleY = finalRatio
    const mainVPT = fbmain.viewportTransform
    rect.top = fbmap.backgroundImage.top - mainVPT[5] * totalRatio / fbmain.getZoom()
    rect.left = fbmap.backgroundImage.left - mainVPT[4] * totalRatio / fbmain.getZoom()

    fbmap.requestRenderAll()

  }

})


</script>

<style lang="scss">
.canvas-wrapper {
  position: relative;
  border: 1px solid #e9e9e9;
}
.canvas-map {
  position: absolute !important;
  bottom: 5px;
  right: 5px;
  border: 1px solid #e9e9e9;
}
</style>
