---
title: 自定义控制点
---

# {{ $frontmatter.title }}

fabric.js 提供了 `fabric.Control(opts)` API 来供我们创建自定义控制点, 比如我们需要一个 "删除" 按钮来删除我们选中的Rect元素。

我们需要以下步骤来为Rect添加删除按钮

1. 新建控制点(`new fabric.Control`)
2. 定义控制点的渲染方法(`render`)与点击方法(`mouseUpHandler`)
3. 为图形添加新控制点

:::tip 提示

因为自定义控制点本质上还是Control, 所以会受到目标对象的 `hasControl` 属性影响

:::

## Control 定义

### 可定义属性

+ `x`, `y`

控制点的相对位置，(0, 0) 是元素对象的中心， -0.5 为左/上， 0.5 为右/下 `(-0.5, -0.5)` 为左上角

+ `actionName`

表明控制点的动作，默认为 `'scale'`(缩放控制)

+ `offsetX`, `offsetY`

控制点水平、垂直方向的偏移量

+ `cursorStyle`

鼠标样式， 默认为 `crosshair`.

> 如果自定义了 `cursorStyleHandler` 方法， 该属性将会被忽略

`cursorStyleHandler` 用于动态设置控制点样式， `cursorStyle` 用于设置静态样式

### 可定义方法

+ `mouseDownHandler`

用于处理鼠标按下事件

+ `mouseUpHandler`

用于处理鼠标抬起事件

+ `render(ctx, left, top, styleOverride, fabricObject)`

用于自定义渲染控制点的方法

## 例子

<Runnable type="view">

```ts

const deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E"

const img = document.createElement('img');
img.src = deleteIcon;

function renderIcon(ctx, left, top, styleOverride, fabricObject) {
  const size = this.cornerSize
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  // ctx.fillRect(0, 0, size, size)
  ctx.drawImage(img, -size/2, -size/2, size, size);
  ctx.restore()
}

const rect = new fabric.Rect({
  width: 100,
  height: 60,
  objectCaching: false,
  fill: 'yellow',
  transparentCorners: false,
})

rect.controls.delete = new fabric.Control({
  x: 0.5,
  y: -0.5,
  cursorStyle: 'pointer',
  actionName: 'delete',
  mouseUpHandler: handleDelete,
  render: renderIcon,
  cornerSize: 24,
})

function handleDelete() {
  console.log('delete')
  canvas.remove(rect)
}

canvas.add(rect) 
canvas.setActiveObject(rect)


```

</Runnable>

<script setup>
import Runnable from '../../components/Runnable.vue'

</script>
