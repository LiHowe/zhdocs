<template>
  This is mind flow
  <canvas ref="main" width="800" height="500"></canvas>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Hierarchy from '@antv/hierarchy'
import { fabric } from 'fabric';
import { buildTree } from './algorithm'

const root = {
  id: 'Root',
  x: 40, y: 60,
  children: [
    {
      id: 'SubTreeNode1',

    },
    {
      id: 'SubTreeNode2',
      children: [
        {
          id: 'SubTreeNode2.1'
        },
        {
          id: 'SubTreeNode2.2'
        }
      ]
    }
  ]
}

const main = ref<HTMLCanvasElement>()

onMounted(() => {
  const ctx = main.value?.getContext('2d')
  const canvas = new fabric.Canvas(main.value)

  const rootNode = buildTree(root, {
    hGap: 30,
    vGap: 20,
  })

  const shapes = []
  drawTree(rootNode)


  function drawTree(root) {

    const { x, y, width, height } = root
    const rect = new fabric.Rect({
      top: y,
      left: x,
      width,
      height,
      fill: root.isRoot() ? 'red' : '#001',
      data: root
    })

    rect.on('mousedown', e => {
      console.log(e.target)
    })

    shapes.push(rect)
    if (root.children && root.children.length) {
      root.children.forEach(x => {
        drawTree(x)
      })
    }
  }

  function drawLine(arr) {
    const lines = []
    const centerR = t => [t.x + t.width, t.y + t.height / 2]
    const centerL = t => [t.x, t.y + t.height / 2]


    arr.forEach(({ data: x }) => {
      if (x.parent) {
        const [x1, y1] = centerR(x.parent)
        const [x2, y2] = centerL(x)
        const path = `
        M ${x1} ${y1}
        L ${(x1 + x2) / 2} ${y1}
        L ${(x1 + x2) / 2} ${y2}
        L ${x2} ${y2}
        `
        let line = new fabric.Path(path, {
          stroke: 'red',
          fill: ''
        })
        lines.push(line)
      }
    })

    canvas.add(...lines)
    console.log(lines)
  }

  drawLine(shapes)

  canvas.add(...shapes)

})


</script>
<style scoped>
</style>
