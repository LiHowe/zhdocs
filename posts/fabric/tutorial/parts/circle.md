### 圆形 - Circle
<br/>

#### 使用

比如我们创建一个半径为 `30` 的圆

```ts {4}
import { fabric } from 'fabric'
// 半径为 30
const circle = new fabric.Circle({
  radius: 30
})
console.log(circle.getRadiusX()) // -> 30
circle.set('scaleX', 2)
console.log(circle.getRadiusX()) // -> 60
```

circle 还提供了起始角度 `startAngle` 与结束角度 `endAngle` 设置,
**那么我们想画一个 1/4 圆是不是直接直接分别赋值为`0` 与 `90` 就可以了呢?**

```ts {3,4}
new fabric.Circle({
  radius: 30,
  startAngle: 0,
  endAngle: 90,
  fill: 'rgba(27, 255, 0, 0.5)',
})
```

很不幸, 我们将会得到以下图形

<Image src="https://s2.loli.net/2022/11/29/hClIexdUnwQ5TRi.png" title="startAngle:0, endAngle: 90"/>

为什么会得到一个圆弧呢? 让我们来分析一下圆形的绘制过程:

<Image src="https://s2.loli.net/2022/11/29/dG9ijmZnAyVgkqU.png" title="第1步, 找到绘制起始点" inline/>
<Image src="https://s2.loli.net/2022/11/29/6OexnL4thIl7KDN.png" title="第2步, 找到绘制结束点" inline/>
<Image src="https://s2.loli.net/2022/11/29/vbtFqBmhGou5Iae.png" title="第3步, 顺时针绘制弧线" inline/>
<Image src="https://s2.loli.net/2022/11/29/xTdvKaYswMpboEc.png" title="第4步, 闭合弧线" inline/>
<Image src="https://s2.loli.net/2022/11/29/giHeaKNvF8ZzXjs.png" title="第5步, 填充" inline/>


我们可以通过调整 `startAngle` 来移动绘制开始点的位置, 比如我们将起始点移动到左侧(`startAngle: -180`),
然后绘制 1/4 圆(`endAngle: -90`), 那么我们将得到一个与上面对称的圆弧.

<Image src="https://s2.loli.net/2022/11/29/EkD2LcNgi9Ztd6o.png" title="圆弧" />

**如果我们将 `startAngle` 设置为 `0`, `endAngle` 设置为 `-90` 呢?**

我们将会得到下面这个图形, 可以参考上面的绘制步骤(着重留意第3步, **顺时针🔃**绘制).

<Image src="https://s2.loli.net/2022/11/29/uFpLUQZKGT9kIi4.png" title="-90度" />

最后, 让我们想一想如何来绘制一个 1/4 圆, 由绘制的原理我们可以看出, 要绘制 1/4 圆(或者可以称为除正圆,半圆外的其他角度的扇形),
我们可以有以下思路
1. 我们至少需要3个点(有一个点在圆心)
2. 使用圆弧与一个顶点在圆心的三角形进行组合(`Group`)
   // TODO

::: tip 常见问题

1. 半圆的绘制
```ts
new fabric.Circle({
  radius: 30,
  startAngle: 0,
  endAngle: 180,
  fill: 'rgba(27, 255, 0, 0.5)',
})
```

得到以下图形
<Image src="https://s2.loli.net/2022/11/29/Ur4PFxcsvzYuTHN.png" title="半圆" />

2. 总角度超出360°会是什么样式?

形态上与360度没有什么区别

:::

#### 图形属性及方法

| 属性         | 描述   | 默认值        |
|------------|------|------------|
| type       | 对象类型 | `'circle'` |
| radius     | 半径   | `0`        |
| startAngle | 开始角度 | `0`        |
| endAngle   | 结束角度 | `360`      |

| 方法                     | 描述              | 返回值      |
|------------------------|-----------------|----------|
| `getRadiusX()`         | 返回对象的水平半径(计算缩放) | `number` |
| `getRadiusY()`         | 返回对象的垂直半径(计算缩放) | `number` |
| `setRadius(r: number)` | 设置半径            | `void`   |

#### 源码解析

源码解析请前往[源码解析/圆形](/fabric/source/circle.md)查看


---
