---
title: 自定义控制点
---

# {{ $frontmatter.title }}

fabric.js 提供了 `fabric.Control(opts)` API 来供我们创建自定义控制点, 比如我们需要一个 "复制" 按钮来
为我们选中的元素创建副本。

<Runnable type="view">

```ts

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  const size = this.cornerSize
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  ctx.roundRect(0, 0, size, size)
  ctx.restore()
}

const rect = new fabric.Rect({
  width: 100,
  height: 60,
  objectCaching: false,
  fill: 'yellow',
  transparentCorners: false
})

rect.controls.clone = new fabric.Control({
  x: -0.5,
  y: -0.5,
  cursorStyle: 'pointer',
  mouseUpHandler: handleCopy,
  render: renderIcon,
  cornerSize: 24,
})

function handleCopy() {

}

canvas.add(rect)
canvas.setActiveObject(rect)

console.log(rect.controls)

```

</Runnable>


<script setup>
import Runnable from '../components/Runnable.vue'

</script>
