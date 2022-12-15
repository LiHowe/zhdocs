---
title: 折线以及多边形 - Polygon & Polyline
source: polyline.class.ts
---

# {{ $frontmatter.title }}

Polygon 与 Polyline 分别对应源码中的 `shapes/polygon.class.ts` 与 `shapes/polyline.class.ts`,
让我们从折线(`Polyline`)的构造函数入手开始阅读

## 构造函数 - `constructor`

```ts {8-9}
export class Polyline extends FabricObject {
  // ... 其他属性及方法
  constructor(points: IPoint[] = [], { left, top, ...options }: any = {}) {
    // 调用父类构造方法(设置 points 及其他属性)
    super({ points, ...options });
    // 对象是否已被实例化的标识
    this.initialized = true;
    // 设置边界盒子
    this.setBoundingBox(true);
    // 如果提供了数字类型的left和top, 则设置图形位置
    typeof left === 'number' && this.set('left', left);
    typeof top === 'number' && this.set('top', top);
  }
}
```

这里我们可以看到一个 `setBoundingBox` 方法, 该方法用来根据我们提供的点坐标数组(`points`)来确定
折线的边界盒子大小及位置信息, 下面我们来看下这个方法

### 设置边界盒子 - `setBoundingBox`

`setBoundingBox(adjustPosition?: boolean)` 接收一个可选的 `是否调整位置` 的标识参数, 在上一步中, 折线的构造函数
传入该参数为 `true`, 所以我们就使用 `true` 来带入阅读.

```ts
export class Polyline extends FabricObject {
  // ... 其他属性及方法
  setBoundingBox(adjustPosition?: boolean) {
    const { left, top, width, height, pathOffset, strokeOffset } =
      this._calcDimensions();
    this.set({ width, height, pathOffset, strokeOffset });
    adjustPosition && this.setPositionByOrigin(new Point(left, top), 'left', 'top');
  }
}
```

可以看到, 该方法主要做了以下事情:
1. **调用 `_calcDimensions` 来计算盒子尺寸**
2. 使用计算结果更新对象的 宽(`width`), 高(`height`), 路径偏移量(`pathOffset`), 边框偏移量(`strokeOffset`)
3. 使用计算结果的 `left` 和 `top` 值作为整个图形边界盒子的原点(`left`, `top`)

接下来我们看一下 `_calcDimensions` 是如何根据我们提供的 `points` 来计算大小的.

::: details 什么时候 `setBoundingBox` 不传值或者传false呢?

当**同时满足**以下条件的时候会重新计算对象**边界盒子(BoundingBox)**的尺寸(不会重设原点)
1. 对象的 `strokeUniform` 属性值为 `true`
2. 对象的 `strokeBBoxAffectingProperties` 属性值包含 `strokeUniform`的同时还包含 `'scaleX'` 或者 `'scaleY'`
3. 对象的 `strokeLineJoin` 值**不**为 `round`
4. `scaleX` 或者 `scaleY` 值发生改变

:::

### 计算边界盒子尺寸 - `_calcDimensions`

```ts
export class Polyline extends FabricObject {
  // ... 其他属性及方法
  _calcDimensions() {
    // exactBoundingBox 属性默认为 false, 且已标记废弃, 这里直接当 points = this.points
    const points = this.exactBoundingBox
      ? this._projectStrokeOnPoints().map(
        (projection) => projection.projectedPoint
      )
      : this.points;
    // 如果没有传入的points为空数组, 直接返回属性全为初始值的尺寸对象
    if (points.length === 0) {
      return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        pathOffset: new Point(), // {x: 0, y: 0}
        strokeOffset: new Point(),
      };
    }
    // 构建边界盒子
    const bbox = makeBoundingBoxFromPoints(points);
    // 构建没有边框的盒子, 实际上与bbox相同, 因为 points = this.points
    const bboxNoStroke = makeBoundingBoxFromPoints(this.points);
    // x轴偏移量
    const offsetX = bbox.left + bbox.width / 2,
      offsetY = bbox.top + bbox.height / 2;
    // 计算路径偏移, 因为 skewX, skewY默认为0, 所以 pathOffset在未设置skew的情况下与offset相同
    const pathOffsetX =
      offsetX - offsetY * Math.tan(degreesToRadians(this.skewX));
    const pathOffsetY =
      offsetY - pathOffsetX * Math.tan(degreesToRadians(this.skewY));
    // 遗留修正 = 边框宽度 / 2, strokeWidth 默认为1, 这里即为 1/2
    // TODO: remove next line
    const legacyCorrection =
      !this.fromSVG && !this.exactBoundingBox ? this.strokeWidth / 2 : 0;
    return {
      ...bbox,
      left: bbox.left - legacyCorrection,
      top: bbox.top - legacyCorrection,
      pathOffset: new Point(pathOffsetX, pathOffsetY),
      strokeOffset: new Point(bboxNoStroke.left, bboxNoStroke.top).subtract(
        new Point(bbox.left, bbox.top)
      ),
    };
  }
}
```

该方法逻辑如下:
1. 没有points, 直接返回预设"空"尺寸对象
2. 调用 `makeBoundingBoxFromPoints` 来使用点集合来构建盒子对象.
3. 计算偏移量
4. 返回各个计算结果

:::details `makeBoundingBoxFromPoints` 过程

找到points中最小的x, y与最大的x, y分别作为盒子的左上与右下顶点即可计算出盒子的 `left`, `top`, `width`, `height`

```ts
const { min, max } = points.reduce(
  ({ min, max }, curr) => {
    return {
      min: min.min(curr),
      max: max.max(curr),
    };
  },
  { min: new Point(points[0]), max: new Point(points[0]) }
);
```

比如给定的points为 `(10,10), (30,20), (20,40)` 三个点

1. 找到所有点最小的x与y作为左上角: `(10, 10)` 
2. 找到所有点最大的x与y作为右下角: `(30, 40)`
3. 盒子的 `left` 为 `10`, `top` 为 `10`, `width` 为 `30 - 10 = 20`, `height` 为 `40 - 10 = 30`

:::


我们可能会产生以下疑惑:

**Q: `pathOffset`有什么用? 为什么这么计算?**

**A:** 用来处理用户设置了倾斜(`skewX`, `skewY`)时候的计算


## 绘制方法 - `_render`

多边形与折线共用一个渲染方法 `_render`, 它们通过 `isOpen()` 方法来区分, 折线的 `isOpen()` 返回 `true` 表明不闭合路径,
而多边形则相反, `isOpen()` 返回 `false` 表明闭合绘制路径.

下面我们来看一下折线绘制过程
1. 获取提供的点的长度以及

```ts {9-13,21}
export class Polyline {
  // ... 其他属性及方法
  _render(ctx: CanvasRenderingContext2D) {
    const len = this.points.length,
      x = this.pathOffset.x,
      y = this.pathOffset.y;
    
    // 没有提供点坐标或者提供了奇怪的点坐标(有x没有y)
    if (!len || isNaN(this.points[len - 1].y)) {
      // do not draw if no points or odd points
      // NaN comes from parseFloat of a empty string in parser
      return;
    }
    ctx.beginPath();
    ctx.moveTo(this.points[0].x - x, this.points[0].y - y); 
    for (let i = 0; i < len; i++) {
      const point = this.points[i];
      ctx.lineTo(point.x - x, point.y - y);
    }
    // 区分是绘制多边形还是折线
    !this.isOpen() && ctx.closePath();
    this._renderPaintInOrder(ctx);
  }
}
```

从代码中9-13行逻辑我们可以得出以下结论
1. 不会绘制**空点集合**
2. 不会绘制**最后一个点的y**不合法的点集合
3. 点的x不合规不会影响绘制
4. 除最后一个点外的点的y不合规不会影响绘制

:::warning 题外话: 回忆一下`isNaN` 与 `Number.isNaN` 的区别

+ `isNaN` 比较的时候会对入参进行类型转换后比较
+ `Number.isNaN` 则不会对入参进行类型转换, 即 除了传入 `NaN` 外, `Number.isNaN` 均返回 false
:::

### 逻辑验证

我们分别用以下情况来验证下绘制方法的逻辑, 看下fabric分别会绘制出什么样的图形.
1. 空集合
2. 给定4个点, 最后一个点的y不存在或不合规
3. 给定4个点, 最后一个点的x不存在或不合规
4. 给定4个点, 其中第二个点的y不合规
5. 给定4个点, 其中第二个点的x不合规
6. 给定4个点, 其中第一个点的y不合规
7. 给定4个点, 其中第一个点的x不合规

<Demo>
<table class="canvas-wrapper">
  <tr>
    <td>
      <canvas ref="canvas" width="300" height="200" style="border: 1px solid #e9e9e9"></canvas>
      <p class="obj-info">
        <p>polyline 对象信息:</p>  
        <p>width: {{ poly.width }}</p>
        <p>height: {{ poly.height }}</p>
        <p>left: {{ poly.left }}</p>
        <p>top: {{ poly.top }}</p>
        <p>pathOffsetX: {{ poly.pathOffset && poly.pathOffset.x }}</p>
        <p>pathOffsetY: {{ poly.pathOffset && poly.pathOffset.y }}</p>
      </p>
    </td>
    <td>
      <span>{{ currentTitle }}</span>
      <pre style="font-size: 12px; width: 200px">
        {{ currentPoints }}
      </pre>
    </td>
  </tr>
</table>

<div>
  <button class="demo-btn" v-for="b in btns" :key="b.title" @click="handleClick(b)">{{ b.title }}</button>
</div>
</Demo>

<style>
.canvas-wrapper {
  height: 520px;
  width: 100%;
  font-size: 12px;
  overflow: hidden;
}
.canvas-wrapper p, pre {
  margin: 0;
  padding: 0;
}
.demo-btn {
  padding: 3px 8px;
  margin: 5px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fabric } from 'fabric'

const canvas = ref()
const fbObj = ref(null)
const poly = ref({})

const commonOpts = {
  left: 100,
  top: 100,
  stroke: '#000',
  fill: '',
}

const currentPoints = ref([])
const currentTitle = ref('1.空集合')

const btns = [
  {
    title: '0.正常图形(梯形)',
    points: [
      { x: 0, y: 20 }, 
      { x: 10, y: 0 },
      { x: 30, y: 0 },
      { x: 40, y: 20 },
    ]
  },
  {
    title: '1.空集合',
    points: []
  },
  {
    title: '2.最后一个y不合法',
    points: [
      { x: 0, y: 20 },
      { x: 10, y: 0 },
      { x: 30, y: 0 },
      { x: 40, y: 'howe' },
    ]
  },
  {
    title: '3.最后一个x不合法',
    points: [
      { x: 0, y: 20 },
      { x: 10, y: 0 },
      { x: 30, y: 0 },
      { x: 'howe', y: 20 },
    ]
  },
  {
    title: '4.第二个点的y不合规',
    points: [
      { x: 0, y: 20 },
      { x: 10, y: 'howe' },
      { x: 30, y: 0 },
      { x: 40, y: 20 },
    ]
  },
  {
    title: '5.第二个点的x不合规',
    points: [
      { x: 0, y: 20 },
      { x: 'howe', y: 0 },
      { x: 30, y: 0 },
      { x: 40, y: 20 },
    ]
  },
  {
    title: '6.第一个x不合规',
    points: [
      { x: 'howe', y: 20 },
      { x: 10, y: 0 },
      { x: 30, y: 0 },
      { x: 40, y: 20 },
    ]
  },
  {
    title: '7.第一个y不合规',
    points: [
      { x: 0, y: 'howe' },
      { x: 10, y: 10 },
      { x: 30, y: 10 },
      { x: 40, y: 30 },
    ]
  },
  {
    title: '8.第一个x,y均不合规',
    points: [
      { x: 'howe', y: 'howe' },
      { x: 10, y: 10 },
      { x: 30, y: 10 },
      { x: 40, y: 30 },
    ]
  },
]

function handleClick({ title, points }) {
  const f = fbObj.value
  f.clear()
  currentTitle.value = title
  currentPoints.value = points
  const p = new fabric.Polyline(points, commonOpts)
  poly.value = p
  drawGrid()
  f.add(p)
  f.setActiveObject(p)
  console.log(p)
}

function drawGrid() {
  const f = fbObj.value
  const lineOpts = { stroke: '#e9e9e9', opacity: .8, evented: false, selectable: false }
  const w = f.width
  const h = f.height
  for (let x = 0; x <= w; x+=10) {
    const l = new fabric.Line([x, 0, x, h], lineOpts)
    f.add(l)
    if (x % 100 === 0) l.set('stroke', '#42b883')
  }
  for (let y = 0; y <= h; y+=10) {
    const l = new fabric.Line([0, y, w, y], lineOpts)
    f.add(l)
    if (y % 100 === 0) l.set('stroke', '#42b883')
  }
}

onMounted(() => {
  const f = new fabric.Canvas(canvas.value)
  
  fbObj.value = f
})



</script>


通过Demo, 我们可以得出以下结论:
1. 最后一个点的x或y不合规都将会影响整体的绘制(不会有任何图形), 因为图形大小计算受到了影响.
2. 中间点坐标的不合规不会影响后续点的绘制(无效点将会被跳过)
3. 第一个点坐标不合规
   1. x 不合规: 点会被忽略
   2. y 不合规: y被作为0绘制
