---
title: 渐变色 - Gradient
---

# {{ $frontmatter.title }}

<script setup>
import Runnable from '../components/Runnable.vue'
import Play from './gradient/samples/Play.vue'
</script>

## 总结

+ 渐变可用于 fabric 对象的 填充(`fill`) 与 边框(`stroke`)
+ 类型: `linear` -线性渐变, `radial` -径向渐变
+ 初始化 `new fabric.Gradient()`
+ `colorStops` 数组用来定义渐变色块
+ `coords` 用来定义起点(`x1, y1`)与终点(`x2, y2`)的坐标, `radial` 需定义 `r1`, `r2`


## 使用

渐变色分为 **线性渐变** 与 **径向渐变**

<Runnable type="view" static auto>

```ts

const rect = new fabric.Rect({
  width: 100,
  height: 50,
})
const linearGradient = new fabric.Gradient({
  type: 'linear',
  gradientUnits: 'pixels',
  coords: {
    x1: 0,
    y1: 0,
    x2: rect.width,
    y2: 0
  },
  colorStops: [
    { offset: 0, color: '#000' },
    { offset: 1, color: '#fff' },
  ]
})
rect.fill = linearGradient

const circle = new fabric.Circle({
  radius: 60,
  left: 50,
  top: 30,
})

const radialGradient = new fabric.Gradient({
  type: 'radial',
  // gradientUnits: 'pixels',
  coords: {
    x1: circle.radius,
    y1: circle.radius,
    x2: circle.radius,
    y2: circle.radius,
    r1: 0,
    r2: circle.radius,
  },
  colorStops: [
    { offset: 1, color: '#646cff' },
    { offset: 0, color: new fabric.Color('#fff').toRgba() },
  ]
})

// 或者 circle.set('fill', radialGradient)
circle.fill = radialGradient

canvas.add(rect,circle)
rect.center()

```

</Runnable>

### 创建 Gradient 对象

创建渐变对象支持以下属性配置:

+ `type`: 渐变类型, 支持线性渐变(`linear`)与径向渐变(`radial`), 默认为 `'linear'`
+ `gradientUnits`: 渐变坐标单位, 支持像素(`'pixels'`)及百分比(`'percentage'`), 默认为像素

:::tip 说明
`pixels`模式下, x1, y1等设置为具体的像素, 比如 `x1: 50, y1: 50` 代表起点为 `(50px, 50px)`, 比较适用于元素大小固定的场景, 而百分比(`percentage`)模式下 `x1: 1, y1: 0` 代表起点为 `(100%, 0%)`, 百分比是相对于目标元素大小的, 比较适合元素大小不固定的场景.
:::

+ `coords`: 起点与终点的配置(径向渐变还包含半径)
+ `colorStops`: 色块配置

<Play />

fabric 还支持使用 SVG `<radialGradient>` 标签来创建渐变色对象, 比如我们有以下渐变色标签

```html
<linearGradient id="linearGrad1">
  <stop offset="0%" stop-color="white"/>
  <stop offset="100%" stop-color="black"/>
</linearGradient>
```

使用上面的标签来创建 Fabric Gradient 对象:

```ts
const el = document.querySelector('#linearGrad1')
fabric.Gradient.fromElement(el)
```
 
<!--@include: ./gradient/api.md -->

## 相关链接

+ [源码解析 | 渐变色](/fabric/source/gradient)
