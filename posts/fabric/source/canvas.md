---
title: 初始化
description: fabric 初始化都做了些什么?
---

# {{ $frontmatter.title }}

## 总结

+ `new fabric.Canvas()` 实际上创建了3个 `canvas` 与一个 `div`, 分别为

  + 顶部画布(`upper-canvas`): 用于处理交互
  + 底层画布(`lower-canvas`): 用于显示元素, 为静态canvas
  + 缓存画布(`cacheCanvas`): 用于缓存画布元素, 缓存画布不插入到文档中
  + 容器(`div.canvas-container`)

+ `new fabric.StaticCanvas` 只创建了一个无交互的canvas, 且不支持画笔.

+ 画布的默认画笔为 `PencelBrush`.

+ 相同事件条件下, canvas 的事件监听要先于对象触发, 比如画布与对象同时监听了对象添加事件,
`object:add` 和 `added`, 那么 `object:add` 会先触发.

## 实例化 Canvas

我们从实例化fabric对象入手来阅读源码

先来看一下执行 `new fabric.Canvas(xx)` 生成的DOM结构

```html
<div class="canvas-container" style="width: 200px; height: 200px; position: relative; user-select: none;">
  <canvas class="lower-canvas" height="200" width="200" style="position: absolute; width: 200px; height: 200px; left: 0px; top: 0px; touch-action: none; user-select: none;"></canvas>
  <canvas class="upper-canvas" width="200" height="200" style="position: absolute; width: 200px; height: 200px; left: 0px; top: 0px; touch-action: none; user-select: none; cursor: default;"></canvas>
</div>
```

可以看到, Fabric 使用传入的 canvas 生成了一个 `div` 容器, 容器内包含 `upper-canvas`, `lower-canvas`两个canvas.

那么接下来我们看一下**构造方法到底做了些什么**, 为什么需要生成这样的DOM结构?

首先, 我们来看一下 `Canvas` 的定义

```ts {1}
fabric.Canvas = fabric.util.createClass(
  fabric.StaticCanvas,
  { /* ... */ },
)
```

::: tip 说明

Fabric并未使用传统的 `export class xxx` 的形式来定义类, 而是使用了其工具类 `fabric.util.createClass()` 来创建类.

这是因为 Fabric 这个库创建时间很早很早, 其在npm发布的时间最早可以追溯到惊人的 **11** 年前...

所以一些语法及写法并未及时调整及变更(又不是不能用...)

<Image src="https://s2.loli.net/2023/01/16/4rHoWqKFafjTN9t.png" />

:::

`createClass()` 方法第一个参数为类继承的父类, 第二个参数为类的属性.
其中, 构造函数使用 **`initialize`** 方法来定义, 所以我们来从该方法入手.

## 构造函数

```ts
{
  initialize: function (el, options) {
    options || (options = {});
    // 更新方法的上下文
    this.renderAndResetBound = this.renderAndReset.bind(this);
    this.requestRenderAllBound = this.requestRenderAll.bind(this);
    // 实例化静态Canvas, 即 lowerCanvas 底层canvas
    this._initStatic(el, options);
    // 实例化交互Canvas, 即 upperCanvas 顶层canvas
    this._initInteractive();
    // 创建缓存Canvas
    this._createCacheCanvas();
  }
}
```

可以看出, 在 `new fabric.Canvas()` 的时候主要做了以下几件事情

1. 更新方法上下文
2. 创建静态canvas
3. 创建交互canvas
4. 创建缓存canvas

<Image src="https://s2.loli.net/2023/01/16/zDvMkrXLhbqsx4I.png" title="层级示意图" />

### 初始化静态画布

`_initStatic` 方法位于 `static_canvas.class.ts`, 用于创建底层画布.

1. 初始化画布内元素数组 `_objects`
2. 创建canvas元素
3. 根据传入配置初始化画布对象配置
4. 初始化高分屏缩放(根据 `devicePixelRatio` 来设置画布的 `width` 与 `height`)
5. 计算canvas偏移量(对应 `_offset` 属性)

::: details 方法源码

```ts
{
  // static_canvas.class.ts
  _initStatic: function (el, options) {
    // 1. 初始化画布内元素 (该属性由 Collection 继承而来)
    this._objects = [];
    // 2. 创建底层画布
    this._createLowerCanvas(el);
    // 3. 初始化配置
    this._initOptions(options);
    // only initialize retina scaling once
    if (!this.interactive) {
      this._initRetinaScaling();
    }
    // 计算偏移量
    this.calcOffset();
  },
}
```

:::

#### _createLowerCanvas

创建 `<canvas class="lower-canvas"></canvas>` 并设置行内样式.

1. 为canvas添加class: `lower-canvas` 
2. 为canvas设置属性: `data-fabric="main"` , 标识该canvas已经被初始化过
3. 为canvas设置行内样式, 并将元素设置为不可选择  
   `userSelect: none`, `el.onselectstart = () => false`
4. 将对象的 `contextContainer` 设置为 canvas 的2d上下文(`getContext('2d')`)

#### _initOptions

设置对象属性, 根据options中的 `width` 和 `height` 更新 `lower-canvas` 属性及样式.

#### calcOffset

设置对象的 `_offset`, 即 canvas 相对于 document 的`left`,`top`偏移量

+ 通过 [`getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) 获取 canvas 的基本位置信息

    <Image src="https://s2.loli.net/2023/01/16/2tUmP6x3vfrDKwe.png" title="getBoundingClientRect说明" />

+ 通过 [`window.getComputedStyle()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) 来获取 canvas 的计算后的CSS属性值

    :::tip 知识点
    可以通过 [`parseInt('300px', 10)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 的方式快速将 `style` 中的 `px` 转为数字.
    :::

+ `left`: BoundingClientRect的`left` + `scrollLeft` - document的`clientLeft` + ComputedStyle的`borderLeftWidth`与`paddingLeft`
+ `top`: 同left

### 初始化交互画布

该方法做了以下几件事情:

1. 创建外层容器
2. 创建上层交互canvas
3. 初始化事件监听
4. 初始化高分辨率屏幕缩放
5. 初始化绘画画笔为 `PencilBrush`
6. 计算偏移量(与 `lower-canvas` 相同)

::: details 方法源码

```ts
{
  _initInteractive: function () {
    this._currentTransform = null;
    this._groupSelector = null;
    // 创建div容器
    this._initWrapperElement();
    // 创建顶层canvas
    this._createUpperCanvas();
    // 初始化事件监听器
    this._initEventListeners();
    // 初始化视网膜屏缩放
    this._initRetinaScaling();
    // 初始化自由绘画笔刷
    this.freeDrawingBrush =
      fabric.PencilBrush && new fabric.PencilBrush(this);
    // 同 lower-canvas, 计算位置偏移
    this.calcOffset();
  }
}
```

:::

### 创建缓存画布

创建一个与初始化canvas相同大小的canvas, 作为缓存canvas, 并赋值给 `cacheCanvasEl`, 同时将缓存canvas的上下文赋值给 `contextCache`.

```ts
_createCacheCanvas: function () {
  this.cacheCanvasEl = this._createCanvasElement();
  this.cacheCanvasEl.setAttribute('width', this.width);
  this.cacheCanvasEl.setAttribute('height', this.height);
  this.contextCache = this.cacheCanvasEl.getContext('2d');
}
```

具体缓存画布有什么作用, 我们在后面的章节进行分析.

## 为画布添加图形对象

当我们使用 `canvas.add()` 方法来将一个图形对象添加到画布上的时候, Fabric 会进行哪些操作呢?

1. 初始化对象的状态 `setupState`
2. 如果对象已经被添加到另一个canvas上, 则将会被从上一个canvas中移除后添加到当前canvas上.
3. 通过重新设置对象的 `canvas` 属性来将canvas与对象建立关联
4. 重新计算对象的坐标(`setCoords`)
5. 触发 canvas 的 `object:add` 事件与对象的 `added` 事件 **(`object:add` 要先于对象的 `added` 触发)**

