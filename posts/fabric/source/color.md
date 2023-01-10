---
title: 颜色 - Color
source: src/color/color.class.ts
---

# {{ $frontmatter.title }}

源码位置: `{{ $frontmatter.source }}`

## 源码结构

::: info 说明
伪ts代码, 只是为了方便了解整体结构
:::

```ts
type TColorSource = [number, number, number];
type TColorAlphaSource = [number, number, number, number];

export class Color {
  // RGBa
  private _source: TColorAlphaSource

  constructor(color?: string): void

  private _tryParsingColor(color?: string): void
  private _rgbToHsl(r: number, g: number, b: number): TColorSource

  static fromRgb(color: string): Color
  static fromRgba(color: string): Color
  static fromHsl(color: string): Color 
  static fromHsla(color: string): Color
  static fromHex(color: string): Color

  static sourceFromRgb(color: string): TColorAlphaSource | undefined
  static sourceFromHsl(color: string): TColorAlphaSource | undefined
  static sourceFromHex(color: string): TColorAlphaSource | undefined

  static fromSource(source: TColorSource | TColorAlphaSource): Color

  getSource(): TColorAlphaSource
  setSource(source: TColorAlphaSource): void

  getAlpha(): number
  setAlpha(alpha: number): Color

  // 颜色输出
  toRgb(): string
  toRgba(): string
  toHsl(): string
  toHsla(): string
  toHex(): string
  toHexa(): string

  // 颜色操作
  toGrayscale(): Color
  toBlackWhite(threshold: number): Color
  overlayWith(otherColor: string | Color): Color
}

```

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

尝试将用户传入的颜色字符串转换为颜色对象的 `source` 形式(RGBa数组), 如果传入的不是一个可转换颜色字符串, 则默认颜色为**黑色**(`source=[0,0,0,1]`)

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
// 匹配 RGB(a)
export const reRGBa =
  /^rgba?\(\s*(\d{1,3}(?:\.\d+)?%?)\s*,\s*(\d{1,3}(?:\.\d+)?%?)\s*,\s*(\d{1,3}(?:\.\d+)?%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/i;

// 匹配 HSL(a)
export const reHSLa =
  /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/i;

// 匹配 Hex
export const reHex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i;
```
