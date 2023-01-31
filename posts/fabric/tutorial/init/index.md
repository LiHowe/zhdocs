---
title: 初始化 - Init
description: 如何初始化和使用Fabric
---
# {{ $frontmatter.title }}

## 创建 fabric 实例

语法: `new fabric.Canvas(元素或选择器)`

需要提供对应的canvas元素或者选择器, **注意 canvas 需要设置 `width` 和 `height` 属性**.

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

+ 我们传入的canvas将会作为 `lower-canvas` 并被 fabric生成div容器所包裹
+ 容器的默认 `class` 为 `canvas-container`  
+ 传入的canvas的class将会被继承到 `lower-canvas` 与 `upper-canvas` 上.  
+ 可以通过设置 `options.containerClass` 来改变默认的容器 `class`, 也就是上面代码中的canvas将会变成:

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

## 静态画布

fabric 还提供了 `StaticCavnas` 来供我们创建静态画布（用于展示， 无交互），
创建静态画布的语法与普通画布相同 

```ts
const staticCanvas = new fabric.StaticCanvas('#demo1')
```

## 清空与销毁画布

### 清空画布

调用 `canvas.clear()` 来清空画布内容

### 销毁画布

调用 `canvas.destory()` 来销毁画布


## 背景颜色设置

我们可以为画布设置背景颜色或者背景图片.

:::tip 提示
背景色与背景图片可以共存
:::

<Runnable type="view">

```ts
addBtn({
  label: '改变背景色',
  onClick: () => {
    canvas.backgroundColor = '#00a001'
    canvas.renderAll()
  }
})

addBtn({
  label: '改变背景图片',
  onClick: () => {
    canvas.setBackgroundImage('https://s2.loli.net/2022/12/29/EkIqLZorWHKY4TA.webp', canvas.renderAll.bind(canvas))
  }
})

addBtn({
  label: '添加前景图片',
  onClick: () => {
    canvas.setOverlayImage('https://media.giphy.com/media/MiMkaPISiQP16xZpQT/giphy.gif', canvas.renderAll.bind(canvas))
  }
})

addBtn({
  label: '添加矩形',
  onClick: () => {
    canvas.add(new fabric.Rect({ width: 40, height: 50, fill: 'red' }))
  }
})
```

</Runnable>


## fabric 相关全局配置

`Canvas` 常用配置

| 属性名                   | 说明                                                                                                             | 类型      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------- |
| `containerClass`         | canvas 容器class                                                                                                 | `string`  |
| `stopContextMenu`        | 是否禁用右键菜单                                                                                                 | `boolean` |
| `fireRightClick`         | canvas是否会触发鼠标右键点击事件                                                                                 | `boolean` |
| `fireMiddleClick`        | canvas是否会触发鼠标中键点击事件                                                                                 | `boolean` |
| `isDrawingMode`          | 是否开启自由绘制模式                                                                                             | `boolean` |
| `preserveObjectStacking` | 是否将当前选中元素置于顶层，默认会把选中元素置于顶层，取消选中时恢复原层级。开启后则在元素选中时也会维持原层级。 | `boolean` |
| `centeredScaling`        | 是否中心缩放                                                                                                     | `boolean` |
| `centeredRotation`       | 是否中心旋转                                                                                                     | `boolean` |

### 框选相关

| 属性名                   | 说明                                                                                                             | 类型      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------- |
| `selection` | 是否可框选元素 |  `boolean` |
| `selectionKey` | 元素多选组合键, 默认为 `shiftKey`(按住Shift, 点击元素可进行多选), 按键可变更为: `'altKey'`、`'shiftKey'`、`'ctrlKey'`、`null` | `string` |
| `altSelectionKey` | 该属性用于搭配 `preserveObjectStacking` 一同使用， 用于在元素层叠的时候能够在不改变元素层级的时候移动底层元素。 | |
| `selectionColor` | 选框的填充颜色 | `string` |
| `selectionBorderColor` | 鼠标选框边框的颜色 | `string` |
| `selectionDashArray` | 用于设置框选的边框虚线 | `number[]` |
| `selectionLineWidth` | 选框的边框粗细 | `number` |
| `selectionFullyContained` | 是否精准选中(只有框到图形才算选中, 比如三角形) | `boolean` |

### 鼠标指针设置

+ `hoverCursor`: 设置鼠标悬浮指针
+ `moveCursor`: 设置移动指针
+ `defaultCursor`: 设置默认指针
+ `freeDrawingCursor`: 设置自由绘制指针
+ `notAllowedCursor`: 设置禁用指针

## API

<!--@include:../canvas/staticApi.md -->

