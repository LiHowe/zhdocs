---
title: 颜色 - Color
---

<script setup>
import Runnable from '../../components/Runnable.vue'
import ColorNameMap from './samples/colorNameMap.vue'
</script>

# {{ $frontmatter.title }}

Fabric 中颜色分为基础颜色(Color)与渐变颜色(Gradient), Color类主要用于操作颜色的透明度及颜色的输出形式(`rgb(a)`, `hsl(a)`, `hex`), Gradient类则用于创建渐变色

## 颜色基础

+ RGB: 红(Red)、绿(Green)、蓝(Blue)三原色
+ HSL: 色相(Hue)、饱和度(Saturation)、亮度(Light)
+ HEX(十六进制): RGB的十六进制表示
+ a: alpha, 颜色的透明度

## 使用

实例化 Fabric 颜色: `new fabric.Color('black')`

fabric 颜色的数据源为 RGBa 数值数组, 比如 `[0,0,0,1]`

<!--@include: ./api.md --> 

## 相关链接

+ [Fabric Docs | Color](http://fabricjs.com/docs/fabric.Color.html)
+ [源码分析 | 颜色](/fabric/source/color)
