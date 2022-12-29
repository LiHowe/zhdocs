---
title: 交互
---

# {{ $frontmatter.title }}

交互包含了对**画布整体**或**画布内元素**的各种操作, 比如
缩放画布、 拖动画布内图形等操作, 我们可以通过变更画布及画布内元素的属性来限制用户的特定交互行为.

## 画布元素交互相关属性列表

可以通过 `set(key, value)` 的方式fabric对象交互相关的属性:

<!--@include: ../source/parts/control.md -->

<script setup>
import Interaction from './demos/Interaction.vue'
</script>

## Playground

<Interaction />
 
