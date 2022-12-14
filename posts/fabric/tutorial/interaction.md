---
title: 交互
---

# {{ $frontmatter.title }}

交互包含了对画布整体或画布内元素的各种操作, 比如缩放画布, 拖动画布内图形等操作, 我们可以通过
变更画布及画布内元素的属性来限制用户的全部或部分交互行为.

## 画布元素交互相关属性列表

可以通过 `set(key, value)` 的方式fabric对象交互相关的属性:

<!--@include: ../source/parts/control.md -->

<script setup>
import Interaction from './demos/Interaction.vue'
</script>

## Playground

<Interaction />
