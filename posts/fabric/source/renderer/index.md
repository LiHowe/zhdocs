---
title: 渲染
---

# {{ $frontmatter.title }} <Badge type="warning" text="wip"/>

我们知道, 在Canvas上绘制图形需要使用 `ctx.fill()` 及 `ctx.stroke()` 方法. 所以, fabric 也一定是使用了该方法进行绘制.

我们从 `Rect` 入手来看一下对象的绘制过程.

> Rect 的具体绘制过程在 [源码分析 - Rect](/fabric/source/rect/index) 中

