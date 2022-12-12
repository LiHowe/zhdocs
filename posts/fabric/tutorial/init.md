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
```typescript{2}
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

import { useData } from 'vitepress'

console.log(useData())

const demo1 = ref()

onMounted(() => {
  const f1 = new fabric.Canvas(demo1.value, {
    containerClass: 'demo-canvas'
  })
})

</script>

## fabric 相关全局配置

// TODO
