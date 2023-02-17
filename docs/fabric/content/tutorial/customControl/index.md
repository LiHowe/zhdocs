---
title: 控制点 - Controls
---

# {{ $frontmatter.title }}

## 介绍

控制点 Control **在画布元素被选中(激活)状态时候显示**, 用于元素的缩放, 拉伸, 变形等操作

<Image src="https://s2.loli.net/2023/02/16/mogq9bz6nV7NB5T.png" title="控制点位置对照" width="200" />


## 设置控制点

### 隐藏全部控制点

我们可以在初始化对象的时候设置 `hasControls` 为 `false` 来隐藏控制点, 也可以使用 `set` 方法直接操作对象属性来后期设置.

```ts
const rect = new fabric.Rect({
  width: 100,
  height: 40,
  hasControls: false, // [!code hl]
})

// 或者
rect.set('hasControls', false) // [!code hl]

```

<Image src="https://s2.loli.net/2023/02/16/vjInAxE68DW5Cty.png" title="无控制点" />

### 隐藏部分控制点

fabric 对象提供了两种方法来供我们设置控制点的隐藏与显示

+ `setControlVisible(控制点名称)`: 用于设置单个控制点的显示隐藏
+ `setControlsVisibility(键值对)`: 可用于同时设置多个控制点的显示隐藏

比如, 我们想隐藏旋转控制点(mtr), 那么我们可以使用上面方法进行设置:

```ts
// 还是以 Rect 为例
const rect = new fabric.Rect({ width: 100, height: 40 })

rect.setControlVisible('mtr', false) // [code hl]

// 或者 
rect.setControlsVisibility({
  mtr: false
})

```
<Image src="https://s2.loli.net/2023/02/16/RwFWhXPjDiTmbYu.png" title="隐藏旋转控制点" />

## 设置控制点样式

### 设置控制点大小

可以通过设置 `cornerSize` 属性来变更控制点的大小

```ts
rect.set('cornerSize', 10)
```

### 设置控制点颜色

默认控制点颜色为 <span class="color-block" style="background: rgb(178,204,255)">rgb(178,204,255)</span>, 无边框颜色,
所以我们可以通过设置 `cornerColor` 与 `cornerStrokeColor` 来分别设置控制点的填充与边框颜色

比如, 我们先来一个**红配绿**, 将控制点设为<span class="color-block" style="background: green; color:white">绿色</span>, 控制点边框设为<span class="color-block" style="background: red;color:white">红色</span>
```ts
rect.set({
  cornerColor: 'green',
  cornerStrokeColor: 'red'
})
```

我们将会看到以下的样式

<Image src="https://s2.loli.net/2023/02/16/hH1W6lynURBxNk2.png" title="红配绿" />

fabric 的对象控制点默认是无填充的, 所以我们需要将[控制点设置为 `填充`](#设置填充) 来看一下整体效果

<Image src="https://s2.loli.net/2023/02/16/PNfUkZIbrCi3oFB.png" title="丑炸了的红配绿" />


### 设置控制点形状

fabric 默认的控制点样式为矩形, 我们还可以将控制点设置为 `圆形○`

```ts
rect.set('cornerStyle', 'circle')
```

<Image src="https://s2.loli.net/2023/02/16/r7ZiAUJ8NuMCYHp.png" title="圆形控制点" />


### 移除控制点与图形的连接

有时候我们不想要旋转控制点与图形之间的连线, 那么该如何设置呢?

```ts
rect.controls.mtr.withConnection = false
```

<Image src="https://s2.loli.net/2023/02/16/31AILDBGfvMtCzV.png" title="移除控制点与图形的连接" />

:::tip
其他的控制点也可以通过配置该属性来添加连接线, 比如我们为 `mb` 控制点添加连接线

```ts
rect.controls.mb.offsetY = 10
rect.controls.mb.withConnection = true
```

<Image src="https://s2.loli.net/2023/02/16/Y9mbtFxKGNkSfTW.png" title="其他控制点添加连接线" />
:::

### 设置填充

默认控制点是无填充的, 如果需要填充控制点, 则可以在初始化的时候指定 `transparentCorners` 为 `false` 或者后期设置该属性为 `false`

```ts
rect.set('transparentCorners', false)
```

<Image src="https://s2.loli.net/2023/02/16/WCXgwcjxzPQIUAl.png" title="设置填充" />


## 添加自定义控制点

fabric.js 提供了 `fabric.Control(opts)` API 来供我们创建自定义控制点, 比如我们需要一个 "删除" 按钮来删除我们选中的Rect元素。

我们需要以下步骤来为Rect添加删除按钮

1. 新建控制点(`new fabric.Control`)
2. 定义控制点的渲染方法(`render`)与点击方法(`mouseUpHandler`)
3. 为图形添加新控制点

:::danger 注意

因为自定义控制点本质上还是Control, 所以会受到目标对象的 `hasControl` 属性影响

:::

## Control 定义

### 属性

+ `x`, `y`

控制点的相对位置，(0, 0) 是元素对象的中心， -0.5 为左/上， 0.5 为右/下 `(-0.5, -0.5)` 为左上角

+ `actionName`

表明控制点的动作，默认为 `'scale'`(缩放控制)

+ `offsetX`, `offsetY`

控制点水平、垂直方向的偏移量

+ `cursorStyle`

鼠标样式， 默认为 `crosshair`.

> 如果自定义了 `cursorStyleHandler` 方法， 该属性将会被忽略

`cursorStyleHandler` 用于动态设置控制点样式， `cursorStyle` 用于设置静态样式

### 方法

+ `mouseDownHandler`

用于处理鼠标按下事件

+ `mouseUpHandler`

用于处理鼠标抬起事件

+ `actionHandler`

相当于mousemove, 用于处理鼠标移动时的事件

+ `render(ctx, left, top, styleOverride, fabricObject)`

用于自定义渲染控制点的方法

## 例子

<Playground />

<script setup>
import Playground from './samples/pg.vue'
</script>

## 参考链接

+ [fabric Demo - Customization](http://fabricjs.com/customization)
+ [fabric Demo - Controls Customization](http://fabricjs.com/controls-customization)
