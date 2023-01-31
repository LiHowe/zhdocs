---
title: Fabric对象 - FabricObject
source: object.class.ts
---

<script setup>
import TutorialPlayground from '../../components/TutorialPlayground.vue'
</script>

# {{ $frontmatter.title }}

FabricObject为 fabric 所有2d图形对象的父类, 部分图形继承链如下

<Image src="https://s2.loli.net/2022/11/28/JxRqXQYyuHamsEN.png" title="继承链" />

## Playground

<ClientOnly>
<Demo title="Playground">
<TutorialPlayground />
</Demo>
</ClientOnly>

## 对象属性

### 基础属性
<!--@include: ./parts/objectBasicAttrs.md-->

### 交互相关设置
<!--@include: ./parts/control.md-->

### 边框相关属性
<!--@include: ./parts/objectBorder.md-->

### 控制点相关设置
<!--@include: ./parts/objectControls.md-->

### 变换相关属性
<!--@include: ./parts/objectTransform.md-->

### 鼠标指针相关
<!--@include: ./parts/cursor.md--> 

### 对象引用
<!--@include: ./parts/reference.md-->

### 其他属性
<!--@include: ./parts/others.md--> 

### aCoords

用来标识对象角位置(比如矩形的四个顶点拐角), 该属性值为一个对象
 
```ts
export type TCornerPoint = {
  tl: Point;
  tr: Point;
  bl: Point;
  br: Point;
}
```

![](https://s2.loli.net/2022/11/28/LFqTdBSHE6Vzmj8.png#crop=0&crop=0&crop=1&crop=1&id=kIE3Y&originHeight=166&originWidth=162&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

每个点(Point)对象的 `x`, `y` 取决于以下属性: `width`, `height`, `scaleX`, `scaleY`,
`skewX`, `skewY`, `angel`, `strokeWidth`, `top`, `left`

### lineCoords

用于对象检测, 描述对象角的位置,包括内边距(padding).
该属性值在`setCoords`时候被赋值与刷新

::: details 与 aCoords 的区别? <Badge type="warning" text="wip"/>
TODO

:::

## API <Badge type="warning" text="wip"/>
