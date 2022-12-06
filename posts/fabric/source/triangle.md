---
title: 三角形 - Triangle
---

# {{ $frontmatter.title }}

## 构造函数

因为三角形并没有专属的图形属性, 所以并未提供专属构造函数.  
三角形相当于一个 `type = 'circle` 的普通 `FabricObject`

## 绘制方法 - `_render`

![绘制过程](https://s2.loli.net/2022/11/30/neaITyGHtAmbqU8.png)

::: details 源码解析

```typescript
export class Triangle {
  // ...其他属性及方法
  _render(ctx: CanvasRenderingContext2D) {
    const widthBy2 = this.width / 2,
      heightBy2 = this.height / 2;
    // 1. 开始绘制
    ctx.beginPath();
    // 2. 首先移动到 点(-w/2, h/2), 然后连线到 点(0, -h/2), 最后连线到 点(w/2, h/2)
    ctx.moveTo(-widthBy2, heightBy2);
    ctx.lineTo(0, -heightBy2);
    ctx.lineTo(widthBy2, heightBy2);
    // 3. 结束绘制
    ctx.closePath();

    this._renderPaintInOrder(ctx);
  }
}
```

:::

## 转为SVG - `toSVG`

因为SVG没有提供三角形绘制标签, 所以需要使用闭合多边形 `<polygon>` 标签配合 path
来绘制

::: details 源码解析

```typescript
export class Triangle {
  // ...其他属性及方法
  _toSVG() {
    // 宽高各一半
    const widthBy2 = this.width / 2,
      heightBy2 = this.height / 2,
      // 其实就是将_render的绘制方法'翻译'一下
      // 首先移动到 点(-w/2, h/2), 然后连线到 点(0, -h/2), 最后连线到 点(w/2, h/2)
      points = `${-widthBy2} ${heightBy2},0 ${-heightBy2},${widthBy2} ${heightBy2}`;
    return ['<polygon ', 'COMMON_PARTS', 'points="', points, '" />'];
  }
}
```

:::
