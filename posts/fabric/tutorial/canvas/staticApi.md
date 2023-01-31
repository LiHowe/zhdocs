<!-- Static Canvas API -->
### 属性

| 属性名                  | 说明                                                                                   | 默认值          |
| ----------------------- | -------------------------------------------------------------------------------------- | --------------- |
| `backgroundColor`       | 背景颜色                                                                               | `''`            |
| `backgroundImage`       | 背景图片                                                                               | `null`          |
| `overlayColor`          | 叠加色                                                                                 | `''`            |
| `overlayImage`          | 叠加图片                                                                               | `null`          |
| `includeDefaultValues`  | `toObject`及`toDatalessObject`是否包含默认值                                           | `true`          |
| `stateful`              | 表明对象的状态是否应该被保存                                                           | `false`         |
| `renderOnAddRemove`     | 添加与移除元素的时候重新渲染                                                           | `true`          |
| `controlsAboveOverlay`  | 对象的控制点是否应该在叠加图上层渲染                                                   | `false`         |
| `allowTouchScrolling`   | 表示当使用触摸屏并在画布上拖动时，浏览器是否可以滚动。                                 | `false`         |
| `imageSmoothingEnabled` | 表明canvas是否使用图片平滑, 浏览器环境默认开启                                         | `true`          |
| `viewportTransform`     | 视窗的变换                                                                             | `[1,0,0,1,0,0]` |
| `backgroundVpt`         | 背景图片是否受`viewportTransform`影响                                                  | `true`          |
| `overlayVpt`            | 叠加图片是否受`viewportTransform`影响                                                  | `true`          |
| `enableRetinaScaling`   | 是否启用高分屏缩放(根据 `devicePixelRatio`)                                            | `true`          |
| `vptCoords`             | 表明视窗的四角, 属性为 `tl,tr,bl,br`                                                   | `{}`            |
| `skipOffscreen`         | 根据 `vptCoords` 与 `object.aCoords`, 跳过不在当前视窗中的元素渲染                     | `true`          |
| `clipPath`              | 切割路径, `clipPath` 会切割掉控件, 可以使用 `controlsAboveOverlay = true` 来避免该行为 | `undefined`     |

### 方法

> 未列举全部方法, 只列了一些常用的方法

#### `supports(methodName): boolean | null` <Badge type="warning" text="static"/> 

检查当前canvas是否支持该方法.(无论是Canvas元素的方法还是上下文对象的方法)

#### `add(...object): fabric.Canvas`

向 canvas 添加元素, 然后渲染 canvas(如果`renderOnAddRemove`不是`false`的话).

#### `remove(...object): fabric.Canvas`

移除canvas元素, 然后渲染 canvas(如果`renderOnAddRemove`不是`false`的话).

---

#### `bringForward(object, intersectingopt): fabric.Canvas`

将元素向上移动一个层级.

#### `bringToFront(object): fabric.Canvas`

将元素向上移动到**顶层**.

#### `sendBackwards(object, intersectingopt): fabric.Canvas`

将元素向下移动一个层级.

#### `sendToBack(object): fabric.Canvas`

将元素向上移动到**底层**.

#### `moveTo(object, index): fabric.Canvas`

将元素移动到指定层级

#### `centerObject(object): fabric.Canvas`

将元素置于画布中心

#### `centerObjectH(object): fabric.Canvas`

将元素置于画布水平中心

#### `centerObjectV(object): fabric.Canvas`

将元素置于画布垂直中心

#### `viewportCenterObject(object): fabric.Canvas`

将元素置于视窗中心

#### `viewportCenterObjectH(object): fabric.Canvas`

将元素置于视窗水平中心

#### `viewportCenterObjectV(object): fabric.Canvas`

将元素置于视窗垂直中心

#### `straightenObject(object): fabric.Canvas`

摆正元素(调整角度)

#### `clear(): fabric.Canvas`

清空画布元素

---

#### `calcOffset()`

用于计算 canvas 元素相对于 document 的偏移量.

#### `calcViewportBoundaries(): object`

计算当前viewportTransform下画布的4个角的位置。使用对象的绝对坐标（aCoords）帮助确定对象是否在当前渲染的视口中。

#### `dispose(): fabric.Canvas`

清空画布元素并销毁对象

#### `clearContext(ctx): fabric.Canvas`

清除指定canvas上下文的全部元素

#### `clone(callbackopt, propertiesopt)`

克隆画布实例(包含数据)

#### `cloneWithoutData(callbackopt)`

克隆画布实例而不克隆现有数据。这基本上是复制画布的尺寸、剪裁属性等，但保留数据为空（这样你就可以用你自己的数据填充它）。

#### `complexity(): number`

返回集合的复杂度

#### `contains(object, deep): boolean`

检查canvas是否包含指定元素, 如果 `deep` 为 `true`, 则会检查所有子元素, 否则只检查 `_objects`

#### `isEmpty(): boolean`

画布是否是空的

#### `renderAll(): fabric.Canvas`

渲染画布

#### `requestRenderAll(): fabric.Canvas`

为下一个动画帧添加一个`renderAll`请求。如果一个渲染请求已经存在, 则不会做任何事.

该方法用于避免同一帧下执行过多的 `renderAll`

#### `renderCanvas(ctx, objects): fabric.Canvas`

渲染 `background`, `objects`, `overlay` 与 `controls`.

---

#### `setBackgroundColor(backgroundColor, callback): fabric.Canvas`

设置画布的背景颜色, 除了普通颜色外, 还可以设置为 `fabric.Pattern`.

`callback` 通常为 `canvas.renderAll.bind(canvas)`

#### `setBackgroundImage(image, callback, optionsopt): fabric.Canvas`

设置背景图片

#### `setOverlayColor(overlayColor, callback): fabric.Canvas`

设置前景色

#### `setOverlayImage(image, callback, optionsopt): fabric.Canvas`

设置前景图片

---

#### `setViewportTransform(vpt): fabric.Canvas`

设置矩阵变换

#### `setZoom(value): fabric.Canvas`

设置缩放

#### `zoomToPoint(point, value): fabric.Canvas`

以指定点为中心缩放.

#### `toDataURL(opts)`

将画布导出为base64, `opts` 可配置参数如下:

+ `format`: 图片格式, `jpeg` 或 `png`
+ `quality`: 图片质量
+ `multiplier`: 图片缩放比例
+ `left`: 剪裁图片, 左侧的距离
+ `top`: 剪裁图片, 顶部的距离
+ `width`: 剪裁图片, 图片的宽度
+ `height`: 剪裁图片, 图片的高度
+ `enableRetinaScaling`: 是否开启高分辨率缩放
