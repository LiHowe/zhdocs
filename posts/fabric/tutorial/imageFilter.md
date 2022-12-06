---
title: 图片滤镜
---

<script setup>
import Filter from './demos/Filter.vue'
</script>

# {{ $frontmatter.title }}

目前fabric 提供了以下几种图片滤镜:

## 滤镜一览

<Filter />


## 可配置滤镜

### 灰度调节 - Grayscale

#### 语法

```typescript
new fabric.Image.filters.Grayscale()
new fabric.Image.filters.Grayscale({
  mode: 'average'
})
```

#### 配置项

+ `mode`: 模式
  + `'average'`: (默认值) 平均值
  + `'lightness'`: 明度
  + `'luminosity'`: 亮度

:::tip lightness 与 luminosity 的区别可以前往下面网站进行查看

[Difference Between Luminosity and Brightness](http://www.differencebetween.net/science/difference-between-luminosity-and-brightness/)

:::

### 反转颜色 - Invert

#### 语法
```typescript
new fabric.Image.filters.Invert()
```

#### 配置项

+ `invert`: 是否反转, 默认为 `true`
+ `alpha`: 反转透明度, 默认为 `false`

### 混合颜色 - BlendColor

#### 语法

```typescript
new fabric.Image.filters.BlendColor({
  color: '#0055ff',
  mode: 'diff'
})
```

#### 配置项

+ `color`: 待混合颜色
+ `mode`: 混合模式
  + `'multiply'`
  + `'add'`
  + `'diff'`
  + `'difference'`
  + `'screen'`
  + `'subtract'`
  + `'darken'`
  + `'lighten'`
  + `'overlay'`
  + `'exclusion'`
  + `'tint'`
+ `alpha`: 是否使用透明通道


### 虚化 - Blur

#### 语法

```typescript
new Blur({ blur: 0.5 })
```

#### 配置项

+ `blur`: 虚化程度, 取值范围: [0, 1]


### 明度 - Brightness

#### 语法

```typescript
new Brightness({ brightness: 0.05 })
```

#### 配置项

+ `brightness`: 明度, 取值范围: [-1, 1]


### 混合图片 - BlendImage

#### 语法

```typescript
new BlendImage({
 image: fabricImageObject,
 mode: 'multiply',
 alpha: 0.5
})
```

#### 配置项

+ `image`: fabric图片对象
+ `mode`: 混合模式
  + `'multiply'`
  + `'mask'`
+ `alpha`: 透明度

## 预设滤镜(照片滤镜)

以下滤镜本质上都是使用 `GeneratedColorMatrix` 传入不同的矩阵调节数值来创建的,
因为矩阵值包含了20个浮点数字, 用户调整起来比较复杂, 所以预设了一些常用的照片滤镜供用户使用.

因为是预设滤镜, 所以不支持参数配置, 构造函数均为 `new fabric.Image.filters.XXX()`

+ `Sepia` - 发黄的旧照片
+ `BlackWhite` - 黑白照片
+ `Technicolor` - 鲜艳色彩
+ `Vintage` - 复古
+ `Brownie` - 勃朗尼相机
+ `Kodachrome` - 柯达胶片
+ `Polaroid` - 拍立得

