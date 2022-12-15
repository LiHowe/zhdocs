---
title: 线段 | fabric.Line
source: line.class.ts
---

# {{ $frontmatter.title }}


## 绘制方法 - `_render`

绘制圆形主要使用到了 canvas 的 [arc()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc)
方法

`arc` 方法用来绘制一定角度的弧形, 语法为

```ts
function arc (
  x: number,                // 圆心x坐标
  y: number,                // 圆心y坐标
  radius: number,           // 圆的半径
  startAngle: number,       // 开始弧度
  endAngle: number,         // 结束弧度
  counterclockwis = false, // 逆时针绘制
): void {}
```

### 源码解析

```ts
export class Circle {
  // ... 其他属性及方法
  _render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      0,
      0,
      this.radius,
      degreesToRadians(this.startAngle),
      degreesToRadians(this.endAngle),
      false
    );
    this._renderPaintInOrder(ctx);
  }
}
```

## 转换为SVG - `_toSVG`

用于将图形转换为SVG的方法.

首先, 让我们先来看一下基础的SVG circle绘制

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" />
</svg>
```

`<circle>` 所绘制的圆形是一个360°圆, 无法满足 fabric 的弧形绘制,
所以转SVG方法需要按照待转换的圆是否是整圆(角度能被360整除, `angle % 360 === 0`)来区分.

> 角度与弧度: 1° = π / 180弧度

源码:

```ts
export class Circle {
  // ... 其他属性及方法
  _toSVG(): (string | number)[] {
    const angle = (this.endAngle - this.startAngle) % 360;
    // 整圆
    if (angle === 0) {
      return [
        '<circle ',
        'COMMON_PARTS',
        'cx="0" cy="0" ',
        'r="',
        this.radius,
        '" />\n',
      ];
    } else {
      // 圆弧
      const { radius } = this;
      // 计算开始弧度和结束弧度
      const start = degreesToRadians(this.startAngle),
        end = degreesToRadians(this.endAngle),
        // 计算起始点 x, y
        startX = cos(start) * radius,
        startY = sin(start) * radius,
        // 计算结束点 x, y
        endX = cos(end) * radius,
        endY = sin(end) * radius,
        // 是否是大圆弧(角度超过180)
        largeFlag = angle > 180 ? '1' : '0';
      return [
        `<path d="M ${startX} ${startY}`,
        ` A ${radius} ${radius}`,
        ' 0 ',
        `${largeFlag} 1`,
        ` ${endX} ${endY}`,
        '" ',
        'COMMON_PARTS',
        ' />\n',
      ];
    }
  }
}
```
