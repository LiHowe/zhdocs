---
title: 介绍
---

# {{ $frontmatter.title }}

几乎所有的canvas绘图库都是基于原始canvas绘制方法进行一系列的封装, 本质上还是调用HTML Canvas API.
所以, 在阅读源码之前, 最好还是对Canvas原始的API有一些了解会好一些(同时也可以了解一些SVG的相关知识)

可以前往 [MDN-Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 进行初步的Canvas基础学习(大佬请无视)

因为部分功能源码较长, 所以后续文章将会对过长的源码进行一定程度的精简, 并分段说明.

:::tip 提示
源码中注释有很多, 大部分的属性及方法都有作者所写的解释,甚至会附上使用说明, 所以英语好的也可以直接看源码.
:::

## Src 目录结构

::: tip 说明
该目录结构仅为笔者写作时的结构, 框架会不断更新, 所以文件结构也可能会随时发生变化.
:::

```text
src
├── brushes                   笔刷
├── color                     颜色
├── controls                  控制器(元素拉伸旋转)
├── filters                   过滤器
├── gradient                  渐变
├── mixins                    混合
├── parser                    解析器
├── shapes                    图形
├── util                      工具类
├── __types__.ts
├── cache.ts
├── canvas.class.ts           fabric.canvas | 画布
├── config.ts                 配置文件
├── constants.ts              一些常量
├── intersection.class.ts     交点
├── pattern.class.ts
├── point.class.ts
├── shadow.class.ts
├── static_canvas.class.ts
└── typedefs.ts

```
