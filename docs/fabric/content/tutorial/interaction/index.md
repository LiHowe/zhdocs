---
title: 交互
---

# {{ $frontmatter.title }}

交互包含了对**画布整体**或**画布内元素**的各种操作, 比如
缩放画布、 拖动画布内图形等操作, 我们可以通过变更画布及画布内元素的属性来限制用户的特定交互行为.

## 画布元素交互相关属性列表

可以通过 `set(key, value)` 的方式fabric对象交互相关的属性:

<!--@include: ../../source/parts/control.md -->

<script setup>
import Interaction from './demos/Interaction.vue';
import Runnable from '../../components/Runnable.vue';

</script>

## 相关方法

### 选中指定元素

使用 `setActiveObject(targetObject)` 方法来选中指定的元素, 比如我们想要在添加一个矩形的同时将其选中, 则可以使用以下写法:

```ts
const rect = new fabric.Rect({
  width: 40,
  height: 40,
  fill: 'blue'
})

canvas.add(rect)
canvas.setActiveObject(rect)
```

### 获取画布当前选中元素

Fabric 提供了两个方法来获取画布的选中元素：

+ `getActiveObject()`: 返回canvas 的 _activeObject 对象
+ `getActiveObjects()`: 返回包含当前选中元素的数组

### 全选画布元素

```ts
const selection = new fabric.ActiveSelection(canvas.getObjects(), {
  canvas
})
canvas.setActiveObject(selection)
canvas.requestRenderAll()

```

### 取消选中

```ts
canvas.discardActiveObject()
```

### 组合

详见 [组合](/tutorial/group/)


### 摆正元素

fabric 提供了以下几种方法来供我们摆正元素(0°, 90°, 180°, 270°)

画布对象:

+ `canvas.straightenObject(obj)`: 调正元素， 然后重新渲染画布
+ `canvas.fxStraightenObject(obj)`： 同上（但是带动画）

图形对象：

+ `object.straighten()`
+ `object.fxStraighten({ onChange?, onComplete? })`
  + `onChange(angle)`: 变换过程中调用的方法
  + `onComplete()`: 变换完成调用的方法

::: tip 解释

1. `canvas.straightenObject(obj)` 本质上就是调用了 `obj` 的 `straighten()` 方法， 然后
调用 `canvas.requestRenderAll()` 来进行画布重绘
2. 而 `canvas.fxStraightenObject(obj)` 本质上则调用了 `obj` 的 `fxStraighten` 并提供了
`onChange` 方法来进行重绘画布

```ts
{
  straightenObject: function (object: FabricObject) {
    object.straighten();
    this.requestRenderAll();
    return this;
  },
  fxStraightenObject: function (object: FabricObject) {
    return object.fxStraighten({
      onChange: this.requestRenderAllBound,
    });
  },
}

```

:::

<Runnable type="view">

```ts
const r = new fabric.Rect({
  angle: 20,
  width: 40,
  height: 40,
  left: 50,
  top: 50,
})

canvas.add(r)

function withAnime() {
  r.rotate(35)
  setTimeout(() => {
    // 写法1:
    canvas.fxStraightenObject(r)
    // 写法2:
    // r.fxStraighten({
    //   onChange: r.canvas.requestRenderAllBound
    // })
  }, 1000)
}

function withoutAnime() {
  r.rotate(75)
  canvas.requestRenderAll()
  setTimeout(() => {
    // 写法1:
    canvas.straightenObject(r)
    // 写法2:
    // r.strainghten()
    // canvas.requestRenderAll()
  }, 1000)
}

addBtn({
  label: '带动画',
  onClick: withAnime
})

addBtn({
  label: '不带动画',
  onClick: withoutAnime
})

```

</Runnable>


## Playground

<Interaction />
 
