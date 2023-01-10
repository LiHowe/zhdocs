---
title: 渐变色 - Gradient
description: 如何创建并使用fabric渐变色对象
---

# {{ $frontmatter.title }}

<script setup>
import Runnable from '../components/Runnable.vue'
import Play from './gradient/samples/Play.vue'
</script>

## 总结

+ 渐变可用于 Fabric 对象的 填充(`fill`) 与 边框(`stroke`)
+ 类型: `linear` -线性渐变, `radial` -径向渐变
+ 初始化 `new fabric.Gradient()`
+ `colorStops` 数组用来定义渐变色块
+ `coords` 用来定义起点(`x1, y1`)与终点(`x2, y2`)的坐标, `radial` 需定义 `r1`, `r2`

## 使用

渐变色分为 **线性渐变** 与 **径向渐变**
 
<!--@include: ./gradient/createGrad.md -->

<!--@include: ./gradient/useGrad.md -->

<!--@include: ./gradient/api.md -->

## 相关链接

+ [源码解析 | 渐变色](/fabric/source/gradient)
+ [Fabric | Class:Gradient](http://fabricjs.com/docs/fabric.Gradient.html)
