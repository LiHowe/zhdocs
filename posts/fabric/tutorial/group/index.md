---
title: 组合 - Group
---

<script setup>
import Runnable from '../../components/Runnable.vue'
import GroupDemo from './demos/Group.vue'
</script>

# {{ $frontmatter.title }}

在我们平时的使用过程中, 单一的图形并不一定可以满足我们的开发需求, 有时候我们需要将多个元素
组合成为一个新的元素进行合并控制, 这时候我们就需要用到 Group 来操作.

## 使用

`Group` 也是继承于 `Fabric.Object` , 所以一些基础的位置设置等与图形设置相同.

### 创建组合

<!--@include: ./createGroup.md-->

### 组合选中元素

<!--@include: ./groupActive.md-->

### 修改组合内元素

<!--@include: ./updateGroupItem.md-->

### 追加/移除元素

<!--@include: ./addRemoveItem.md-->

## Playground

<GroupDemo />

## API

<!--@include: ./api.md-->

