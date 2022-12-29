---
title: 初始化 - Init
description: 如何初始化fabric
---
<style>
.demo-canvas {
  border: 1px solid var(--vp-c-divider-light);
}
</style>

# {{ $frontmatter.title }}

## 创建 fabric 实例

语法: `new fabric.Canvas(元素或选择器)`

需要提供对应的canvas元素或者选择器(`selector`), canvas 需要设置 `width` 和 `height` 属性.

比如:

```html
<canvas id="demo1" class="demo-canvas" height="200" width="200" ></canvas>

<script>
  // 直接传入id
  const fabricObj = new fabric.Canvas('#demo1')
  // 或者传入canvas dom
  const canvas = document.querySelector('#demo1')
  const fabricObj_1 = new fabric.Canvas(canvas)
</script>
```

:::info 提示
我们传入的canvas将会被替换为 fabric div容器, 容器的默认 `class` 为 `canvas-container`  
原本的canvas的class将会被继承到 `lower-canvas` 与 `upper-canvas` 上.  
可以通过设置 `options.containerClass` 来改变默认的容器 `class`, 也就是上面代码中的canvas将会变成:
```html
<div class="canvas-container" style="width: 200px; height: 200px; position: relative; user-select: none;">
  <canvas class="lower-canvas" height="200" width="200" style="position: absolute; width: 200px; height: 200px; left: 0px; top: 0px; touch-action: none; user-select: none;"></canvas>
  <canvas class="upper-canvas" width="200" height="200" style="position: absolute; width: 200px; height: 200px; left: 0px; top: 0px; touch-action: none; user-select: none; cursor: default;"></canvas>
</div>
```
通过下面代码来改变默认的div class
```ts{2}
const fabricObj = new fabric.Canvas('#demo1', {
  containerClass: 'custom-class custom-class2'
})
```
:::


:::info Demo
<div class="playground">
  <canvas ref="demo1"  height="200" width="200" ></canvas>
</div>
:::

<script setup lang="ts">
import { fabric } from 'fabric'
import { ref, onMounted } from 'vue'

const demo1 = ref()

onMounted(() => {
  const r = new fabric.Rect({ width: 20, height: 20, fill: '#e9e9e9' })

  const c = new fabric.Circle({ radius: 30, left: 33 })


  const f1 = new fabric.Canvas(demo1.value, {
    containerClass: 'demo-canvas',
    selectionKey: 'ctrlKey'
  })

  f1.add(r, c)
})

</script>

## fabric 相关全局配置

`new fabric.Canvas` 常用配置

+ `containerClass`: `string`

canvas 容器类名

+ `stopContextMenu`: `boolean`

是否禁用右键菜单

+ `fireRightClick`: `boolean`

canvas是否会触发鼠标右键点击事件

+ `fireMiddleClick`: `boolean`

canvas是否会触发鼠标中键点击事件

+ `isDrawingMode`: `boolean`

是否开启自由绘制模式

+ `preserveObjectStacking`: `boolean`

是否将当前选中元素置于顶层，默认会把选中元素置于顶层，取消选中时恢复原层级。
开启后则在元素选中时也会维持原层级。

+ `centeredScaling`: `boolean`

是否中心缩放

+ `centeredRotation`: `boolean`

是否中心旋转

### 框选相关

+ `selection`: `boolean`

是否可框选元素

+ `selectionKey`

元素多选组合键, 默认为 `shiftKey`(按住Shift, 点击元素可进行多选), 按键可变更为:
`'altKey'`、`'shiftKey'`、`'ctrlKey'`、`null`

> 当该值设置为非修饰键或者为空的时候, 为关闭多选功能

+ `altSelectionKey`

该属性用于搭配 `preserveObjectStacking` 一同使用， 用于在元素层叠的时候能够在不改变元素层级的时候移动底层元素。

+ `selectionColor`: `string`

选框的填充颜色

+ `selectionBorderColor`: `string`

鼠标选框边框的颜色

+ `selectionDashArray`: `number[]`

用于设置框选的边框虚线

+ `selectionLineWidth`: `number`

选框的边框粗细

+ `selectionFullyContained`: `boolean`

是否精准选中(只有框到图形才算选中, 比如三角形)

### 鼠标指针设置

+ `hoverCursor`: 鼠标悬浮指针
+ `moveCursor`: 移动指针
+ `defaultCursor`: 默认指针
+ `freeDrawingCursor`: 自由绘制指针
+ `notAllowedCursor`: 禁用指针
