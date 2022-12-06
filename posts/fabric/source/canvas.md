---
title: 初始化
---

# {{ $frontmatter.title }}

我们从实例化fabric对象入手来阅读源码

先来看一下执行 `new fabric.Canvas(xx)` 生成的DOM结构
```html
<div class="canvas-container" style="width: 200px; height: 200px; position: relative; user-select: none;">
  <canvas class="lower-canvas" height="200" width="200" style="position: absolute; width: 200px; height: 200px; left: 0px; top: 0px; touch-action: none; user-select: none;"></canvas>
  <canvas class="upper-canvas" width="200" height="200" style="position: absolute; width: 200px; height: 200px; left: 0px; top: 0px; touch-action: none; user-select: none; cursor: default;"></canvas>
</div>
```
可以看到, 我们提供了一个canvas元素, fabric 使用其生成了一个 `container` div与`upper`, `lower`两个canvas, 我们了解了初始化方法执行结果后再来阅读源码.

首先 `new fabric.Canvas(xx)` 为 fabric 实例的初始化方法, 所以我们通过在源码中全局搜索(`fabric.Canvas =`)找到 `Canvas` 类的定义文件 `canvas.class.ts`, 再从文件中找到对应的定义代码:

```typescript {1}
fabric.Canvas = fabric.util.createClass(
  fabric.StaticCanvas,
  { /* ... */ },
)
```

从源码中我们可以看到, fabric并未使用传统的 `export class xxx` 的形式来定义类, 而是使用了其工具类 `fabric.util.createClass()` 来创建类.

`createClass()` 方法第一个参数为类继承的父类, 第二个参数为类的属性.
其中, 构造函数使用 **`initialize`** 方法来定义, 所以我们来从该方法入手.


## 构造函数 | initialize

```typescript
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

### 初始化静态画布(`lower-canvas`) | _initStatic


`_initStatic` 方法位于 `static_canvas.class.ts`

```typescript
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
![img.png](/imgs/getBoundingClientRect.png)
+ 通过 [`window.getComputedStyle()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) 来获取 canvas 的计算后的CSS属性值

:::tip 知识点
可以通过 [`parseInt('300px', 10)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 的方式快速将 style 中的 px 转为数字.
:::

+ `left`: BoundingClientRect的`left` + `scrollLeft` - document的`clientLeft` + ComputedStyle的`borderLeftWidth`与`paddingLeft`
+ `top`: 同left

### 初始化交互画布(`upper-canvas`) | _initInteractive

`_initInteractive` 方法位于 `canvas.class.ts`

```typescript
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

#### _initWrapperElement

创建容器 `div`, 


## 总结

`new fabric.Canvas()` 主要用来创建canvas元素
