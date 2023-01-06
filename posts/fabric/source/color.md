---
title: 颜色 - Color
---

# {{ $frontmatter.title }}

源码位置: `src/doclor/color.class.ts`

## 构造函数

1. 如果传入空参数, 如 `new fabric.Color()`, 则设置默认颜色值 `[0, 0, 0, 1]`
2. 有非空入参, 调用私有方法 `_tryParsingColor` 尝试解析入参

```ts
constructor(color?: string) {
  if (!color) {
    // 如果传入空参数: new fabric.Color()
    this.setSource([0, 0, 0, 1]);
  } else {
    // 有非空入参, 尝试解析入参
    this._tryParsingColor(color);
  }
}
```

### _tryParsingColor <Badge text="private" type="info" />

```ts
if (color in ColorNameMap) {
  color = ColorNameMap[color];
}

const source =
  color === 'transparent'
    ? [255, 255, 255, 0]
    : Color.sourceFromHex(color) ||
      Color.sourceFromRgb(color) ||
      Color.sourceFromHsl(color) || [0, 0, 0, 1]; // color is not recognize let's default to black as canvas does

if (source) {
  this.setSource(source);
}
```


## 静态属性

```ts
export const reRGBa =
  /^rgba?\(\s*(\d{1,3}(?:\.\d+)?%?)\s*,\s*(\d{1,3}(?:\.\d+)?%?)\s*,\s*(\d{1,3}(?:\.\d+)?%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/i;

export const reHSLa =
  /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/i;

export const reHex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
```
