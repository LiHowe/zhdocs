---
title: 线段 - Line
source: line.class.ts
---

# {{ $frontmatter.title }}


## 构造函数 - `constructor`

构造函数主要做了两件事情：

1. 设置两个端点的x, y坐标(如果未提供点坐标， 则使用(0,0))
2. 设置位置及宽高

```ts
export class Line extends FabricObject {
  // ...
  constructor(points, options) {
    if (!points) {
      points = [0, 0, 0, 0];
    }

    super(options);

    this.set('x1', points[0]);
    this.set('y1', points[1]);
    this.set('x2', points[2]);
    this.set('y2', points[3]);

    this._setWidthHeight(options);
  }
}
```

## 绘制方法 - `_render`

```ts
export class Line extends FabricObject {
  // ...
  _render(ctx) {
    // 开始绘制
    ctx.beginPath();
    // 根据宽高计算起点终点
    const p = this.calcLinePoints();
    ctx.moveTo(p.x1, p.y1);
    ctx.lineTo(p.x2, p.y2);

    ctx.lineWidth = this.strokeWidth;

    // TODO: test this
    // make sure setting "fill" changes color of a line
    // (by copying fillStyle to strokeStyle, since line is stroked, not filled)
    const origStrokeStyle = ctx.strokeStyle;
    ctx.strokeStyle = this.stroke || ctx.fillStyle;
    this.stroke && this._renderStroke(ctx);
    ctx.strokeStyle = origStrokeStyle;
  }
}
```

## 转为SVG - `toSVG`

```ts
export class Line extends FabricObject {
  _toSVG() {
    const p = this.calcLinePoints();
    return [
      '<line ',
      'COMMON_PARTS',
      'x1="',
      p.x1,
      '" y1="',
      p.y1,
      '" x2="',
      p.x2,
      '" y2="',
      p.y2,
      '" />\n',
    ];
  }
}
```
