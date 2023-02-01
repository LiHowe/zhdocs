---
title: 对象缓存 | Object Cache
docURL: http://fabricjs.com/fabric-object-caching
---

# {{ $frontmatter.title }}

## 工作原理

当 fabric 对象缓存激活的时候, 你在canvas上绘制的对象实际上是在**另一个**更小的**在屏幕之外的**canvas预先绘制的,在调用 `render` 方法的时候, 这个预先绘制的对象将会通过 `drawImage`(绘制图片) 的方式复制到主canvas上.

> 默认情况下fabric自动会为对象开启缓存

这意味着在进行 拖动, 旋转, 倾斜, 缩放 操作时, 对象不会在canvas上重新绘制, 只是在画布上绘制其复制的缓存图像.

也就是说 fabric 在渲染对象的时候会用到两个canvas, 一个canvas用来绘制并缓存, 另一个作为主canvas用于展示与交互.

## 如何调整该行为?

### 针对对象调整

对象提供了以下属性可以用来控制该行为

+ `objectCaching: boolean`: 是否启用对象缓存, 浏览器环境默认为 `true`, NodeJS环境默认为 `false`
+ `statefullCache: boolean`: 决定fabric是否**自动检查是否应该重绘对象的缓存副本**, 或者开发人员手动使其失效. 默认为 `false`
+ `noScaleCache: boolean`: 是否禁用缩放操作的缓存重绘, 默认为 `true`(缩放后重绘), 启用该属性可以避免在较大幅度的缩放时图形的失真.
+ `cacheProperties: string[]`: 每次调用对象 `set(key, value)` 方法进行赋值或者`statefullCache`为`true`并自动触发时, 都会在该数组中查找变更的key, 如果找到则将对象标记为 `dirty`(需要重新渲染).
+ `dirty: boolean`: 标识是否强制在下一次渲染方法时重新渲染缓存, 在重新生成缓存后该标识自动置为 `false`

### 针对全局配置调整

+ `fabric.perfLimitSizeTotal: number`: 生成的缓存画布(canvas)的最大尺寸(像素), 默认为 `2097152`
+ `fabric.maxCacheSideLimit: number`: 缓存画布的最大像素限制.(超过5000会导致IE崩溃🐶), 默认为`4096`
+ `fabric.minCacheSideLimit: number`: 缓存画布的最小像素限制, 默认为 `256`. (官网说明: 小于256可以禁用GPU合成, 有待验证)

> 对应配置源码位于 `config.ts`

## 缓存自动更新的情况

Fabric 在 缩放(scale), 打字中(typing text) 全局缩放(global zoom) 的情况下会默认更新全部缓存.
