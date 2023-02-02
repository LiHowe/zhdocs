---
title: 笔刷 - Brush
---

# {{ $frontmatter.title }}

我们可以将 fabric 实例的 `isDrawingMode` 设置为 `true` 来开启自由绘制模式.

```ts
const c = new fabric.Canvas('c', {
  isDrawingMode: true,
})
```

<script setup>
import Runnable from '../../components/Runnable.vue'
import Gallary from './samples/gallary.vue'
</script>

通过设置 `canvas.freeDrawingBrush` 来更换不同模式的笔刷.

Fabric 为我们内置了4种类型的笔刷

+ 铅笔笔刷 - pencilBrush, 默认笔刷
+ 圆形笔刷 - circleBrush
+ 喷雾笔刷 - sprayBrush
+ 图案笔刷 - patternBrush

<Gallary />

## 图案笔刷 - patternBrush

使用 `new fabric.PatternBrush(canvas)` 语法来实例化笔刷

<Image src="https://s2.loli.net/2022/12/29/4WxsgGvUDfFCcNp.png" title="默认笔刷样式" width="200" />

我们可以覆盖笔刷的 `getPatternSrc` 方法来创建自定义图案笔刷， 也可以将图片作为 pattern 笔刷的图案


### 图片作为画笔图案

比如我们使用这张图片作为画笔的内容

<Image src="https://s2.loli.net/2022/12/29/EkIqLZorWHKY4TA.webp" title="画笔内容" zoom="0.8" width="200"/>

<Runnable type="view">

```ts
// 开启绘制模式
canvas.isDrawingMode = true
// 自定义指针
canvas.freeDrawingCursor = 'crosshair'
// 指定笔刷
canvas.freeDrawingBrush = new fabric.PatternBrush(canvas)
canvas.freeDrawingBrush.width = 15

const img = new Image()
img.src = 'https://s2.loli.net/2022/12/29/EkIqLZorWHKY4TA.webp'

canvas.freeDrawingBrush.source = img

```

</Runnable>

**那么我们想让图片小一些该如何调整呢?**

1. 依旧实例化PatternBrush
2. 覆盖笔刷的 `getPatternSrc` 方法
3. 自定义绘制图形
   1. 创建空白 canvas
   2. 设定 canvas 大小
   3. 将图片绘制到新 canvas 上
   4. 返回该 canvas 作为画笔内容
4. 应用画笔

<Runnable type="view">

```ts
// 开启绘制模式
canvas.isDrawingMode = true
// 自定义指针
canvas.freeDrawingCursor = 'pointer' // 默认为 crosshair
// 1. 实例化patternBrush
canvas.freeDrawingBrush = new fabric.PatternBrush(canvas)

// 2. 加载图片
const img = new Image()
img.src = 'https://s2.loli.net/2022/12/29/EkIqLZorWHKY4TA.webp'

// 设定整体画笔内容大小
const designSize = 40

// 3. 自定义绘制图形
canvas.freeDrawingBrush.getPatternSrc = function () {
  const c = fabric.document.createElement('canvas')
  const ctx = c.getContext('2d')
  c.width = c.height = designSize
  ctx.drawImage(img, 0, 0, designSize, designSize)
  return c
}

// 4. 应用画笔
canvas.freeDrawingBrush.source = canvas.freeDrawingBrush.getPatternSrc()
canvas.freeDrawingBrush.width = designSize

```

</Runnable>

### 自定义内容图案

我们也可以使用自定义绘制图形来作为笔刷内容

<Runnable type="view">

```ts
canvas.isDrawingMode = true

// 实例化笔刷
const squarePatternBrush = new fabric.PatternBrush(canvas)
// 指定笔刷绘制方法
squarePatternBrush.getPatternSrc = function() {
  const squareWidth = 10
  const squareDistance = 2
  // 新建canvas, 并设置canvas的宽高为 正方形大小
  const patternCanvas = fabric.document.createElement('canvas')
  patternCanvas.width = patternCanvas.height = squareWidth + squareDistance
 
  const ctx = patternCanvas.getContext('2d')
  ctx.fillStyle = this.color
  ctx.fillRect(0, 0, squareWidth, squareWidth)
 
  return patternCanvas
}


canvas.freeDrawingBrush = squarePatternBrush
canvas.freeDrawingBrush.width = 20
canvas.freeDrawingBrush.color = '#00a001'

squarePatternBrush.source = squarePatternBrush.getPatternSrc()
```
</Runnable>

## 其他设置

### 行为设置

+ `freeDrawingCursor`: 来变更绘制模式下的鼠标指针样式, 默认为 `'crosshair'`

具体支持指针列表可前往[MDN - Cursor](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)查看

+ `limitedToCanvasSize`

将绘制区域限制为 canvas 大小

### 笔刷样式设置

+ `width`: 笔刷粗细
+ `color`: 笔刷颜色
+ `shadow`: 笔刷阴影
+ `strokeDashArray`: 虚线
+ `strokeLineCap`: [线段端点风格](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#%E7%BA%BF%E5%9E%8B_line_styles)
  + `butt`: 默认
  + `round`
  + `square`
<Image src="https://s2.loli.net/2022/12/29/R2NGgrwvnHAKpdL.png" inline />
+ `strokeLineJoin`: 线段拐角风格
  + `miter`: 默认
  + `bevel`
  + `round`
<Image src="https://s2.loli.net/2022/12/29/2uB75jUSFQZcwnb.png" inline />
+ `shadow`: 阴影
