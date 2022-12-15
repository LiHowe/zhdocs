---
title: 动画 - animation
wip: true
---

# {{ $frontmatter.title }} <Badge v-if="$frontmatter.wip" type="warning" text="WIP" />

fabric 设置元素动画的方式有两种:

1. `fabricObject.animate`
2. `fabric.util.animate`

其中 `fabric.util.animate` 更适合于同时控制多个具有类似属性或动画效果的元素.

## 配置动画

### 单个元素动画

我们可以通过 `obj.animate(attr, targetValue, options)` 方法来为画布元素添加动画效果, 比如我们将一个矩形的宽度变为双倍

```ts
const rect = new fb.Rect({
  width: 30,
  height: 50,
  fill: '#42b883'
})
canvas.add(rect)
rect.animate('width', '*=2', {
  onChange: canvas.renderAll.bind(canvas)
})
```

因为 **`animate` 方法并不会自动帮我们调用 canvas 的渲染方法, 所以需要在 `onChange` 方法中自行调用渲染方法.**

#### `onChange(value, valueProgress, timeProgress`

方法共有三个参数

+ `value`: 当前动画进度下的对应属性值
+ `valueProgress`: 值变化的**进度**, 动画开始为0, 动画结束为1, 过程中为浮点数
+ `timeProgress`: 当前动画的时间**进度**, 开始为0, 结束为1

我们可以通过该函数来记录当前动画进行的进度, 用于后续取消动画后的恢复操作.

### 多个元素动画

我们也可以使用 `obj.animate` 来分别为待配置对象设置动画, 也可以使用 `fabric.util.animate(option)` 来为多个元素同时添加动画.

#### fabric.util.animate(option)

+ `startValue`: 动画开始值, 可以传入单个值, 也可以传入数组来同时控制多个值, 参数的顺序和数量与 `onChange` 方法入参对应
+ `endValue`: 动画结束值, = 100
+ `duration`: 动画持续时长, 默认是500ms
+ `easing`: 缓动动画, 默认是defaultEasing
+ `onChange`: 动画过程函数(参数数量与startValue一致)
+ `abort`: 取消方法
+ `onComplete`: 动画完成时调用的函数
+ `delay`: 延迟, 默认0ms

比如我们同时将两个矩形旋转180°, 一个顺时针一个逆时针.

```ts
const r1 = new fb.Rect({ 
  width: 80,
  height: 30,
  fill: '#42b883',
  left: 40,
  top: 40,
})
const r2 = fb.util.object.clone(r1)
// 调整第二个矩形位置, 并设置原点为右上角
r2.set({
  'left': r1.left + r1.width,
  originX: 'right',
  originY: 'top'
})
canvas.add(r1, r2)

fabric.util.animate({
  startValue: 0,
  endValue: 180,
  onChange: (angle: number) => {
    r1.set('rotate', angle)
    r2.set('rotate', -angle)
    canvas.requestRenderAll()
  }
})

```

<script setup>
import AnimationPlayground from './demos/Animation.vue'
</script>

## 取消动画

## 暂停/恢复动画

## 路径动画

## Playground

<AnimationPlayground />

## 参考链接

+ [官网](http://fabricjs.com/fabric-intro-part-2)
