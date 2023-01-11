---
title: 动画 - animation
---

<script setup>
import AnimationPlayground from './animation/samples/Animation.vue'
import Easing from './animation/samples/Easing.vue'
import Runnable from '../components/Runnable.vue'
</script>

# {{ $frontmatter.title }}

fabric 设置元素动画的方式有两种:

1. `obj.animate(attr, value, options)`
2. `fabric.util.animate(options)`

其中 `fabric.util.animate` 更适合于同时控制多个具有类似属性或动画效果的元素.

## 方法说明

<!--@include: ./animation/parts/objAnimate.md-->

<!--@include: ./animation/parts/utilAnimate.md-->

## 为元素添加动画

<!--@include: ./animation/parts/singleAnime.md-->

<!--@include: ./animation/parts/multipleAnime.md-->

<!--@include: ./animation/parts/cancelAnime.md-->

<!--@include: ./animation/parts/runningAnime.md-->

<!--@include: ./animation/parts/pauseAnime.md-->

<!--@include: ./animation/parts/pathAnime.md-->

<!--@include: ./animation/parts/easeAnime.md-->
 
## 参考链接

+ [官网](http://fabricjs.com/fabric-intro-part-2)
