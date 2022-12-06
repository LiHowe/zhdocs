---
title: 矩形 | fabric.Rect
source: rect.class.ts
---

# {{ $frontmatter.title }}

## 构造函数 - `constructor`

矩形的构造函数十分简单, 直接放代码

```typescript
export class Rect extends FabricObject {
  // ... 其他属性及方法
  constructor(options: Record<string, unknown>) {
    super(options);
    this._initRxRy();
  }
}
```

### 初始化 rx, ry

该方法用来实现: 用户只提供了一个 `rx` 或者 `ry` 的时候使 `rx` 与 `ry` 保持相等

```typescript
export class Rect extends FabricObject {
  // ...
  _initRxRy() {
    const { rx, ry } = this;
    if (rx && !ry) {
      this.ry = rx;
    } else if (ry && !rx) {
      this.rx = ry;
    }
  }
}
```

## 绘制方法 - `_render`

矩形的绘制并没有使用 `canvas` 提供的 [`CanvasRenderingContext2D.rect()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect) 方法来绘制,
而是使用 [`moveTo()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo) 
搭配 [`lineTo()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo) 来逐边绘制.

因为我们在平时开发的时候会经常使用到圆角矩形, 而`rect()`方法所创建出来的矩形是直角矩形, canvas
又并未提供其他绘制圆角矩形的方法, 所以目前普遍的做法是使用 `lineTo()` 进行绘制, 在遇到圆角的时候
使用 `bezierCurveTo()` 来创建三次贝塞尔曲线绘制圆角.

::: details 三次贝塞尔曲线 | bezierCurveTo

绘制三次贝塞尔曲线有两个控制点,  `P1`, `P2`

![来源: wikipedia](https://s2.loli.net/2022/11/29/ruEpOeMgRZV1v2W.png)

**语法**

`ctx.bezierCurveTo(p1x, p1y, p2x, p2y, x, y);`

+ `p1x`, `p1y`: 为第一个控制点P1的 x, y
+ `p2x`, `p2y`: 为第二个控制点P2的 x, y
+ `x`, `y`: 为结束点的 x, y

**贝塞尔曲线学习资料**

+ [Wikipedia | 三次贝塞尔曲线](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
+ [JSInfo | 贝塞尔曲线](https://zh.javascript.info/bezier-curve)
:::

### 源码解析

由 `(x, y)` 为起点作为矩形左上角进行顺时针绘制.

其中有一个常量为 `kRect`, 该常量实际上是用于贝塞尔曲线绘制圆弧的"魔法数字(magic number)",
该数字用于使用贝塞尔曲线来逼近圆弧(_使用贝塞尔曲线来绘制与圆弧十分接近的圆弧..._)

具体的推导过程可以看这篇文章[Approximating a Circular Arc With a Cubic Bezier Path](http://hansmuller-flex.blogspot.com/2011/04/approximating-circular-arc-with-cubic.html)

![k](https://s2.loli.net/2022/11/29/ILaP9hG3jtok1Oz.png)

`k = 0.5522847498`, 用于绘制矩形的 k 为 `kRect`, `kRect = 1 - 0.5522847498`

笔者学识有限, 就不过多解释推导相关的东西了...

> 目前 CanvasRenderingContext2D 提供了 [roundRect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect)
> 方法供我们绘制圆角矩形, 且可以使用数组来操作每一个角的圆角半径.  
> 使用该方法需要考虑浏览器兼容性问题, 比如 chrome ver99+ 才支持该特性

```typescript
export class Rect {
  // 其他属性及方法
  _render(ctx: CanvasRenderingContext2D) {
    const { width: w, height: h } = this;
    const x = -w / 2;
    const y = -h / 2;
    const rx = this.rx ? Math.min(this.rx, w / 2) : 0;
    const ry = this.ry ? Math.min(this.ry, h / 2) : 0;
    const isRounded = rx !== 0 || ry !== 0;
    // 开始绘制
    ctx.beginPath();
    // 将画笔移动到起点
    ctx.moveTo(x + rx, y);
    // 绘制上边
    ctx.lineTo(x + w - rx, y);
    // 如果有圆角, 绘制左上拐角
    isRounded &&
    ctx.bezierCurveTo(
      x + w - kRect * rx,
      y,
      x + w,
      y + kRect * ry,
      x + w,
      y + ry
    );
    // 绘制右边
    ctx.lineTo(x + w, y + h - ry);
    // 有圆角绘制右下拐角
    isRounded &&
    ctx.bezierCurveTo(
      x + w,
      y + h - kRect * ry,
      x + w - kRect * rx,
      y + h,
      x + w - rx,
      y + h
    );
    // 绘制底边
    ctx.lineTo(x + rx, y + h);
    // 绘制左下拐角
    isRounded &&
    ctx.bezierCurveTo(
      x + kRect * rx,
      y + h,
      x,
      y + h - kRect * ry,
      x,
      y + h - ry
    );
    // 绘制左边
    ctx.lineTo(x, y + ry);
    // 绘制左上拐角
    isRounded &&
    ctx.bezierCurveTo(x, y + kRect * ry, x + kRect * rx, y, x + rx, y);
    // 结束绘制
    ctx.closePath();

    this._renderPaintInOrder(ctx);
  }
}
```

> `_renderPaintInOrder` 方法将会在后面 [源码分析/渲染方法](./renderer.md) 中进行说明


## 转为SVG - `_toSVG`

因为SVG的 `<rect>` 标签提供了 `rx`, `ry` 属性供我们绘制圆角, 所以讲canvas的矩形转为svg还是比较简单的.  
我们先来看下SVG `<rect>` 的结构

```html
<!-- 直角矩形 -->
<rect x="0" y="0" width="30" height="30" />
<!-- 圆角矩形 -->
<rect x="40" y="0" width="30" height="30" rx="5" ry="5"></rect>
```

<svg viewBox="0 0 200 50" style="width: 100%; height: 60px" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="0" width="30" height="30" />
<rect x="40" y="0" width="30" height="30" rx="5" ry="5"></rect>
</svg>

可以看到 `<rect>` 标签的属性与我们创建 `fabric.Rect` 的属性基本一致, 所以我们直接进行转换即可, 不需要其他判断处理逻辑.

::: details 方法源码

```typescript
export class Rect {
  // 其他属性及方法
  _toSVG() {
    const { width, height, rx, ry } = this;
    return [
      '<rect ',
      'COMMON_PARTS',
      `x="${-width / 2}" y="${
        -height / 2
      }" rx="${rx}" ry="${ry}" width="${width}" height="${height}" />\n`,
    ];
  }
}
```

:::
