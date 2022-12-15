---
title: 文本 - Text
---

<script setup>
import TextPlayground from './demos/Text.vue'
import { fabric } from 'fabric'

const path = 'M1 37.5C89.5 24 -7.5 105 86 108C160.8 110.4 152.667 62 135 37.5C115.531 10.5 108.6 1 57 1'


</script>

# {{ $frontmatter.title }}

fabric 文本相较于原始 canvas 文本为我们提供了以下功能:

+ 多行支持
+ 文本对齐
+ 文本背景颜色
+ 文本修饰符: 下划线, 贯穿线, 删除线
+ 行高
+ 字符间距
+ 子区域: 可供我们控制单个字符的样式
+ 支持颜文字
+ 在画布上直接编辑文本

## 使用

### 创建文本对象

类似于创建图形, 创建文本对象的语法如下:

```ts
const text = new fabric.Text(text, options)
```

如果同时提供了text 与 options 中的 text, 则优先使用 text

```ts
const text = new fabric.Text('lihowe', {
  text: '666'
})

console.log(text.text)
```

### 配置

文本对象除了基本 fabric 对象支持的属性外, 还支持以下额外配置

| 配置项  | 属性名        | 类型                             | 默认值 |
| ---- | :---------- | ------------------------------ | --- |
| 字体大小 | fontSize   | `number`                       | `40` |
| 字体   | fontFamily | `string`                       | `'Times New Roman'` |
| 字体粗细 | fontWeight | `'bold'`, `'normal'`, `number` | `'normal'` |
| 内容 | text | `string` | |
| 下划线 | underline | `boolean` | `false` |
| 上划线 | overline | `boolean` | `false` |
| 删除线 | linethrough | `boolean` | `false` |
| 对齐方式 | textAlign | `'left'`, `'center'`, `'right'` | `'left'` |
| 文字样式 | fontStyle | `''`, `'normal'`, `'italic'`, `'oblique'` |
| 行高 | lineHeight | `number` | `1.16` |
| 文本背景颜色 | textBackgroundColor | `string` | `''` |
| 字符间距 | charSpacing | `string` | |
| 样式 | styles | | |
| 文字方向 | direction | `'ltr'` | `'ltr'` |

::: tip `italic` 与 `oblique` 的区别?

`italic` 会请求当前字体的斜体字体, 而 `oblique` 是直接将当前字体进行倾斜

在未提供倾斜字体的时候, 两者表现相同.

:::

文本还可以按照指定的路径进行绘制, 当按照路径绘制时, 可供配置的配置项如下

| 配置项  | 属性名        | 类型                             | 默认值 |
| ---- | ---------- | ------------------------------ | --- |
| 路径 | path | `fabric.Path` | - |
| 路径起始偏移 | pathStartOffset | `number` | `0` |
| 路径起始边 | pathSide | `'left'`, `'right'` | `'left'` |
| 路径对齐 | pathAlign | `'baseline'`, `'center'`, `'ascender'`, `'descender'` | `baseline` |

## Playground

<Demo>
<TextPlayground />
</Demo>
