---
title: 常见问题
---

# {{ $frontmatter.title }}

### 在我使用 Vue3.x 的时候, 新添加到画布的对象的控制点无法点击(元素除移动外无法进行其他操作)

> GitHub 上相似问题 https://github.com/fabricjs/fabric.js/issues/6680

这是由于将 canvas 对象变为响应式的原因, 移除响应式即可解决问题
```ts
const canvasEl = ref<HTMLCanvasElement>()
  
const canvas = ref<fabric.Canvas>() // [!code --]
canvas.value = new fabric.Canvas(canvasEl.value, { // [!code --]
  // config... // [!code --]
}) // [!code --]
canvas.value.add(new fabric.Rect({ width: 40, height: 40 })) // [!code --]

let canvas: fabric.Canvas | null = null // [!code ++]
canvas = new fabric.Canvas(canvasEl.value,{ // [!code ++]
  // config... // [!code ++]
}) // [!code ++]
canvas.add(new fabric.Rect({ width: 40, height: 40 })) // [!code ++]

```
