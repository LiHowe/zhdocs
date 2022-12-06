---
title: 椭圆 - Ellipse
---

# {{ $frontmatter.title }}

椭圆本质上是将一个完整的正圆形进行**矩阵变换**, 在**垂直方向**上进行**缩放**.  
相当于创建一个以 `rx` 为半径的圆形 `Circle`

```typescript
new fabric.Ellipse({
  rx: 100,
  ry: 50,
})
// 上面代码本质上等同于
new fabric.Circle({
  radius: 100,
  scaleY: 50 / 100,
})
```
## 构造函数 - `constructor`

```typescript
export class Ellipse extends FabricObject {
  // ...
  constructor(options: Record<string, unknown>) {
    super(options);
    this.set('rx', (options && options.rx) || 0);
    this.set('ry', (options && options.ry) || 0);
  }
}
```


## 绘制方法 - `_render`

绘制椭圆主要用到的方法有 
+ [`arc()`: 绘制弧线](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc?qs=arc())
+ [`transform()`: 矩阵变换](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform)

:::info 方法介绍

`arc()`: 在绘制圆形的文章中有介绍,[源码解析/Circle](./circle.md)

`transform(a, b, c, d, e, f)`
对图形内容进行变换, 可以同时改变图形的 `旋转`, `缩放`, `平移`, `倾斜`

变换矩阵: <Image title="变换矩阵" src="https://s2.loli.net/2022/11/30/jcpa9GveFhiMAzo.png" inline />
  + `a`: 水平缩放
  + `b`: 垂直倾斜
  + `c`: 水平倾斜
  + `d`: 垂直缩放
  + `e`: 水平平移
  + `f`: 垂直平移
:::

### 源码解析

```typescript
export class Triangle {
  // ...其他属性及方法
  _render(ctx: CanvasRenderingContext2D) {
    // 开始绘制
    ctx.beginPath();
    // 保存上下文状态
    ctx.save();
    // 对圆弧进行垂直方向上的缩放, 缩放比例取决于 ry/rx
    ctx.transform(1, 0, 0, this.ry / this.rx, 0, 0);
    // 绘制弧形(360°, 完整的圆)
    ctx.arc(0, 0, this.rx, 0, twoMathPi, false);
    // 还原上下文状态
    ctx.restore();
    this._renderPaintInOrder(ctx);
  }
}
```


## 转为SVG - `toSVG`

因为SVG有提供椭圆绘制标签, 所以直接使用椭圆 `<ellipse>` 标签绘制即可(提供 `rx`, `ry`)

### 源码解析

```typescript
export class Triangle {
  // ...其他属性及方法
  _toSVG() {
    return [
      '<ellipse ',
      'COMMON_PARTS',
      'cx="0" cy="0" ',
      'rx="',
      this.rx,
      '" ry="',
      this.ry,
      '" />\n',
    ];
  }
}
```
