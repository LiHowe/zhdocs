---
title: 图形 - Shapes
---

# {{ $frontmatter.title }}

Fabric 内置了7种基本图形:

1. 圆形 (`fabric.Circle`)
2. 椭圆 (`fabric.Ellipse`)
3. 线段 (`fabric.Line`)
4. 闭合多边形 (`fabric.Polygon`)
5. 开放多边形(折线) (`fabcir.Polyline`)
6. 矩形 (`fabric.Rect`)
7. 三角形 (`fabric.Triangle`)

使用 `new fabric.Rect(options?)` 进行创建图形, 所有的图形对象都继承了 [fabric.Object](/source/object/), 具体共通属性及方法请
前往 [源码解析/对象](/source/object/) 查看, 这里我们只根据各个图形的特有属性来进行说明.

<!--@include: ./parts/rect.md-->

<!--@include: ./parts/triangle.md-->

<!--@include: ./parts/circle.md-->

<!--@include: ./parts/ellipse.md-->

<!--@include: ./parts/line.md-->

<!--@include: ./parts/polygon.md-->
