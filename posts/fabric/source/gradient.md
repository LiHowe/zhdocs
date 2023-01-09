---
title: 渐变色 - Gradient
source: src/gradient/gradient.class.ts
---

# {{ $frontmatter.title }}

源码位置: {{ $frontmatter.source }}

### fromElement

> 阅读该片段需要具备一些SVG相关基础知识, 免得一脸懵

`fromElement` 为静态方法, 用于使用SVG的渐变色标签来创建Fabric渐变色对象.

方法定义为:

```ts
static fromElement(
  el: SVGGradientElement,
  instance: FabricObject,
  svgOptions: SVGOptions
): Gradient<GradientType>
```

步骤:
1. 首先, fabric会先调用 `parseGradientUnits` 来根据传入的元素来决定渐变色对象的计算单位.

::: tip 补充说明
SVG [`<linearGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient) 和 [`<radialGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient) 标签的
:::

## 相关链接

+ [MDN | 创建线性渐变](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient)
+ [MDN | 创建径向渐变](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createRadialGradient)
