<script setup lang="ts">
import { ref } from 'vue'
import { useFabric } from '../hooks/fabric';
import { fabric } from 'fabric';
import { ArrowLine } from '../shapes/FlowLine'

const invisibleControl = [
  'ml', 'mr', 'mt', 'mb'
]

function addRect() {
  const rect = new fabric.Rect({
    width: 100,
    height: 40,
    stroke: '#e9e9e9',
    fill: '',
  })


  const points: fabric.Point[] = []

  rect.controls.mtr.withConnection = false
  rect.controls.mtr.render = (ctx, left, top, styleOverride, fabricObject) => {
    rect.controls.mt.render(ctx, left, top, {
      cornerStyle: 'circle'
    }, fabricObject)
  }

  rect.cornerSize = 10

  addLinkControl(rect)
  console.log(rect)

  return rect
}

const linkControls: LinkControlName[] = ['mlc' , 'mrc' , 'mtc' , 'mbc']

type LinkControlName = 'mlc' | 'mrc' | 'mtc' | 'mbc'

const linkControlCoords: Record<LinkControlName, { x: number, y: number}> = {
  mlc: { x: -0.6, y: 0 },
  mrc: { x: 0.6, y: 0 },
  mtc: { x: 0, y: -0.8 },
  mbc: { x: 0, y: 0.8 }
}

function renderLinkIcon(ctx: CanvasRenderingContext2D, left, top, styleOverride, fabricObject) {
  const size = this.cornerSize ?? 10
  ctx.save()

  ctx.beginPath()
  ctx.translate(left, top)
  ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
  ctx.fillStyle = 'red'
  ctx.stroke()

  ctx.restore()
}

function addLinkControl(target: fabric.Object) {
  target.on('added', () => {
    linkControls.forEach((item: LinkControlName) => {
      target.controls[item] = new fabric.Control({
        ...linkControlCoords[item],
        actionName: 'link',
        actionHandler(eventData: MouseEvent, transformData: fabric.Transform, x: number, y: number) {
          console.log('actionHandler', {
            eventData,
            transformData,
            x, y
          })
          const target = transformData.target
          if (target.currentLine) {
            target.currentLine.set({
              x2: x,
              y2: y
            })
          }
          return true
        },
        mouseDownHandler(e, transform, x, y) {
          console.log('mouseDownHandler', {
            e, transform, x, y
          })
          initLine.bind(transform.target)(x, y)
          return true
        },
        mouseUpHandler(e, transform, x, y) {
          console.log('mouseUpHandler', {
            e, transform, x, y
          })
          return true
        },
        render: renderLinkIcon
      })
    })
  })

  function initLine(x: number, y: number) {
    // 使用 lines 来记录当前图形关联的线
    if (!this.lines) {
      this.lines = []
    }
    // 相同的起点与终点
    const line = new ArrowLine([x, y, x, y], {
      stroke: '#000'
    })

    console.log('初始化线段', line)

    this.lines.push(line)
    // 建立联系
    line.shape = this
    this.currentLine = line
    this.canvas.add(line)
  }

  // target.on('mouseup', ({ currentTarget, target }) => {
  //   console.log('target mouseup', currentTarget, target === currentTarget)
  // })
}


// link a to b
function link(a: fabric.Point, b: fabric.Point) {
  const line = new fabric.Line([a.x, a.y, b.x, b.y])
  fb.value?.add(line)
}

const fb = ref<fabric.Canvas>()

type Shapes = 'rect'

function useFlag() {
  const isDrawing = ref(false)
  return {
    isDrawing: isDrawing.value,
  }
}

const { isDrawing } = useFlag()

function add(type: Shapes) {
  if (!fb.value) {
    fb.value = useFabric()!
    fb.value.on('mouse:up', ({ currentTarget }) => {
      if (!currentTarget) return
      if (!isDrawing) return
      console.log('canvas: mouse:up', currentTarget)
    })
  }
  const shapeMap: Record<Shapes, Function> = {
    rect: addRect
  }
  const shape = shapeMap[type]()
  fb.value.add(shape)

}

</script>
<template>
  <header class="operation">
    <el-button @click="add('rect')">Rect</el-button>
    <el-button @click="link">link</el-button>
  </header>
</template>
<style scoped lang="scss">
</style>
