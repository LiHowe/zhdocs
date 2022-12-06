# 介绍

本文档基于 `fabric 5.x` 版本进行编写. 在写该文档的这段时间 fabric 开发者们也在积极地
将老旧代码更新到TypeScript写法(这个时间点有点尴尬,我一边写,它一边改), 不过整体的思路还是
不变的, 阅读本文档可以着重于思路而非具体代码实现.

fabric 同样也不支持 IE11及古老游览器

而且目前 Canvas 原生提供越来越多便利的 API 供我们更方便的绘制图形, fabric 6.x 也会逐步
跟进更新为这些 api. 这里是开发者的一些讨论: [GitHub | Leveraging new canvas api](https://github.com/fabricjs/fabric.js/issues/8387).

Canvas2D更新API可以前往该博客查看: [It's always been you, Canvas2D](https://developer.chrome.com/blog/canvas2d/)

## fabric 对象一览

```mermaid
graph LR
fb[(fabric)]
fb --> obj(Object:基础对象)
fb --> Point:点
fb --> Intersection:交叉点
fb --> util:工具类
fb --> brush(BaseBrush:笔刷)
fb --> r(rendering:渲染)
fb --> f(fill:填充)

r --> Canvas:标准画布
r --> StaticCanvas:静态画布

f --> Color:颜色
f --> Gradient:渐变
f --> Pattern:图案
f --> Shadow:阴影

obj --> Shape(Shape:图形)

style Shape fill:#42b883,stroke:#42b883,color:#fff
click Shape "/tutorial/shape.html" "a link"

Shape --> Circle:圆形
Shape --> Line:线段
Shape --> Triangle:三角形
Shape --> Rect:矩形
Shape --> Ellipse:椭圆形
Shape --> Polygon:多边形
Shape --> Polyline:折线

obj --> Group:组合
obj --> Text:文本
obj --> Image:图片
obj --> Path:路径

brush --> PencilBrush:钢笔笔刷
brush --> CircleBrush:圆形笔刷
brush --> SprayBrush:喷雾笔刷
brush --> PatternBrush:图案笔刷
```
