---
title: 动画 - animation
---

<script setup>
import AnimationPlayground from './samples/Animation.vue'
import Easing from './samples/Easing.vue'
import Runnable from '../../components/Runnable.vue'
</script>

# {{ $frontmatter.title }}

fabric 设置元素动画的方式有两种:

1. `obj.animate(attr, value, options)`
2. `fabric.util.animate(options)`

其中 `fabric.util.animate` 更适合于同时控制多个具有类似属性或动画效果的元素.

## 方法说明

<!--@include: ./parts/objAnimate.md-->

<!--@include: ./parts/utilAnimate.md-->

## 为元素添加动画

<!--@include: ./parts/singleAnime.md-->

<!--@include: ./parts/multipleAnime.md-->

<!--@include: ./parts/cancelAnime.md-->

<!--@include: ./parts/runningAnime.md-->

<!--@include: ./parts/pauseAnime.md-->

<!--@include: ./parts/pathAnime.md-->

<!--@include: ./parts/easeAnime.md-->
 
## 参考链接

+ [官网](http://fabricjs.com/fabric-intro-part-2)
