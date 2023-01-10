---
title: 渐变色 - Gradient
source: src/gradient/gradient.class.ts
description: fabric 渐变色的实现原理(源码分析)
---

# {{ $frontmatter.title }}

源码位置: {{ $frontmatter.source }}

## 构造函数

Gradient的构造函数并未做过多的处理, 只是对各个属性进行初始化赋值.

根据 `type` 的不同, Gradient 对象的 `coords` 属性也有所不同, `radial` 类型的渐变将会比 `linear` 类型的
多包含 `r1`, `r2` 属性

```ts
export class Gradient {
  constructor({
                type = 'linear' as T,
                gradientUnits = 'pixels',
                coords,
                colorStops = [],
                offsetX = 0,
                offsetY = 0,
                gradientTransform,
                id,
              }: GradientOptions<T>) {
    this.id = id ? `${id}_${uid()}` : uid();
    this.type = type;
    this.gradientUnits = gradientUnits;
    this.gradientTransform = gradientTransform || null;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.coords = {
      ...(this.type === 'radial' ? radialDefaultCoords : linearDefaultCoords),
      ...coords,
    } as GradientCoords<T>;
    this.colorStops = colorStops.slice();
  }
}
```

## 从SVG标签创建对象 - fromElement

> 阅读该片段需要具备一些SVG相关基础知识, 免得一脸懵

`fromElement` 为静态方法, 用于使用SVG的渐变色标签来创建Fabric渐变色对象.

方法定义为:

```ts
export class Gradient {
  static fromElement(
    el: SVGGradientElement,
    instance: FabricObject,
    svgOptions: SVGOptions
  ): Gradient<GradientType> {
    // 设置Gradient对象的单位
    const gradientUnits = parseGradientUnits(el);
    // 新建Gradient对象并返回
    return new this({
      id: el.getAttribute('id') || undefined,
      // 根据标签名来判断是linear还是radial
      type: parseType(el),
      // 坐标转换
      coords: parseCoords(el, {
        width: svgOptions.viewBoxWidth || svgOptions.width,
        height: svgOptions.viewBoxHeight || svgOptions.height,
      }),
      // 色块转换
      colorStops: parseColorStops(el, svgOptions.opacity),
      gradientUnits,
      gradientTransform: parseTransformAttribute(
        el.getAttribute('gradientTransform') || ''
      ),
      ...(gradientUnits === 'pixels'
        ? {
          offsetX: -instance.left,
          offsetY: -instance.top,
        }
        : {
          offsetX: 0,
          offsetY: 0,
        }),
    });
  }
}
```

步骤:
1. 首先, fabric会先调用 `parseGradientUnits` 来根据传入的元素来决定渐变色对象的计算单位.

::: tip 补充说明
SVG [`<linearGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient) 和 [`<radialGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient) 标签的
:::

## 相关链接

+ [MDN | 创建线性渐变](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)
+ [MDN | 创建径向渐变](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)
