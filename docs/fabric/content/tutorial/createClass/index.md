---
title: 创建自定义图形类 - CreateClass
---

# {{ $frontmatter.title }} 

fabric 还提供了让我们创建自己的类与子类的能力, 通过 `util.createClass` 方法, 我们可以创建新的图形类以方便我们开发使用.

## 语法

`fabric.util.createClass(parent, properties?)`

+ `parent`: 创建的图形所继承的父类, 如果没有相似的可继承图形类, 可以选择继承 `fabric.Object` 基础类
+ `properties`: 所创建图形类的属性
  + `type`: 定义自己图形的类型
  + `initialize(opts)`: 图形对象的构造函数, 接收一个opts用来传递特定参数
  + `_render(ctx)`: 用来绘制图形的方法, 提供了 canvas context 参数来供我们自行处理绘制方法.
  + `toObject`: 图形的导出方法

## 使用

比如, 我们知道 fabric 并未内置扇形, 那么让我们先创建一个简单的扇形类 `Sector` 试验一下, 步骤如下:

1. 使用圆形作为父类(因为扇形属于圆形的一部分, 它们的基本属性也一致, 所以直接继承使用即可)
2. 定义(重写)我们的图形类型 `type` 为 `sector`(扇形)
3. 定义绘制方法 `_render`, 调用 `_renderPaintInOrder` 绘制

<<< @/tutorial/createClass/demos/Sector.ts

:::tip 提示
我们可以使用 `callSuper` 来调用父类方法
:::

然后让我们用同一个配置来分别创建 `Sector` 与 `Circle` 来验证一下扇形能否成功且正确的创建.

```ts
import { Sector } from './Sector.ts'
import { fabric } from 'fabric'

const commonOptions = {
  left: 10,
  top: 10,
  radius: 30,
  startAngle: 0,
  endAngle: 90,
  fill: '#42b883',
  opacity: 0.5,
}
// 扇形
const sector = new Sector(commonOptions)
// 圆形
const circle = new fabric.Circle(commonOptions)

const canvas = new fabric.Canvas('#demo')
canvas.add(sector, circle)

```

再让我们创建一个**稍微**复杂一点的图形, 比如...一个带文字的矩形?

```ts
export const LabeledRect = fabric.util.createClass(fabric.Rect, {
  label: '',
  type: 'labeledRect',
  fontsize: 20, // 设置字体大小
  color: '#333', // 设置文字颜色
  _render(ctx: CanvasRenderingContext2D) {
    this.callSuper('_render', ctx)
    ctx.font = `${this.fontsize}px Helvetica`
    ctx.fillStyle = this.color
    const { width } = ctx.measureText(this.label)
    ctx.fillText(
      this.label,
      -(this.width - width / 2) / 2,
      -(this.height - this.fontsize) / 2 + this.fontsize
      )
  }
})
```

## Playground

<CreateClass />

<script setup>
import CreateClass from './demos/CreateClass.vue'
</script>
