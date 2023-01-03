---
title: 序列化
---

# {{ $frontmatter.title }} <Badge type="warning" text="WIP"/>

<script setup>
import Runnable from '../components/Runnable.vue'
</script>

我们通常需要将画布数据持久化到服务器上, 这时候我们就需要用到 fabric 的序列化相关操作及方法了.

fabric 的核心序列化方法为 `toObject()` 和 `toJSON()` 两种方法

## toObject(propertiesToInclude?)

将 fabric 对象转换为普通对象

+ `propertiesToInclude`: 可选参数, 字符串数组. 用来标识哪些**自定义**属性会被导出.

比如, 我们正常创建一个矩形 `r` , 然后分别调用以下方法来查看它们之间的区别.

+ `console.log(r)`
+ `console.log(r.toObject())`
+ `console.log(r.toJSON())`
+ `console.log(JSON.stringify(r))`

<Runnable>

```ts
const r = new fabric.Rect({
  width: 30,
  height: 30,
  fill: '#00a001',
})

// 由于某些业务场景添加的奇怪属性 // [!code hl]
r._tag = 'hzzzh' // [!code hl]

console.log(r.toObject())
console.log(r.toJSON())
console.log(JSON.stringify(r))
console.log(r.toObject(['_tag'])) // [!code hl]
console.log(r.toObject(Object.keys(r))) // [!code hl]
```

</Runnable>

我们业务中难免会有一些字段需要挂在fabric Object 上， 但是我们根据上面的输出结果看到
并未包含我们自定义的属性 `_tag`, 这时候就需要用到 `toString()` 方法来输出我们特定的属性。

## toJSON()

等同于 `toObject()`, 无参数设置, 下面我们来看一下该方法的源码：

```ts
toJSON() {
  // delegate, not alias
  return this.toObject();
}
```

## 图片输出

+ [`canvas.toDataURL()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
