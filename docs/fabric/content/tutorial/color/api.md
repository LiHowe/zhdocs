## API

### 静态属性 <Badge text="static" type="warning" />

| 属性名  | 说明 |
|---|---|
| `colorNameMap`  | 148个颜色名称与HEX代码对照, 如: red -> `#FF0000`  |
| `reHex`  | 匹配 `Hex` 的正则表达式  |
| `reHSLa`  | 匹配 `HSL` 及 `HSLA` 的正则表达式  |
| `reRGBa`  | 匹配 `RGB` 及 `RGBA` 的正则表达式  |

<Runnable>

```ts
console.log(fabric.Color.colorNameMap)
console.log(fabric.Color.reHex)
console.log(fabric.Color.reHSLa)
console.log(fabric.Color.reRGBa)
```

</Runnable>

:::details fabric.Color.colorNameMap

<ColorNameMap />

:::

### 静态方法 <Badge text="static" type="warning" />

| 方法名  | 说明 |
|---|---|
| `fromRgb(color)` | 返回以 RGB颜色字符串 为源创建颜色对象 |
| `fromRgba(color)` | 返回以 RGBa颜色字符串 为源创建颜色对象 |
| `sourceFromRgb(color)` | 返回 RGB(a) 颜色转换为 fabric Color 对象的数据源(source) |
| `fromHsl(color)` | 返回以 HSL颜色字符串 为源创建颜色对象 |
| `fromHsla(color)` | 返回以 HSLa颜色字符串 为源创建颜色对象 |
| `sourceFromHsl(color)` | 返回 HSL(a) 颜色转换为 fabric Color 对象的数据源(source) |
| `fromHex(color)` | 返回以 Hex颜色字符串 为源创建颜色对象 |
| `sourceFromHex(color)` | 返回 Hex(a) 颜色转换为 fabric Color 对象的数据源(source) |
| `fromSource(source)` | 返回使用颜色数据源(source)来创建颜色对象 |

:::tip 说明
`fromXXX(color)` 方法实质上为 `fromSource(sourceFromXXX(color))` 的语法糖
:::

### 基础方法

| 方法名  | 作用 | 返回值形式 |
|---|---|---|
| `getSource()`  | 获取当前颜色对象的数据源  | `[0, 0, 0, 1]` |
| `setSource()`  | 设置当前颜色对象的数据源  | 返回当前颜色对象供链式调用 |
| `getAlpha()`  | 返回当前颜色透明度  | `1` |
| `setAlpha()`  | 设置当前颜色透明度  | 返回当前颜色对象供链式调用 |

### 格式转换方法

| 方法名  | 作用 | 返回值形式 |
|---|---|---|
| `toRgb()`  | 返回当前颜色的 RGB 形式  | `rgb(0-255,0-255,0-255)` |
| `toRgba()`  | 返回当前颜色的 RGBa 形式  | `rgba(0-255,0-255,0-255,0-1)` |
| `toHsl()`  | 返回当前颜色的 HSL 形式  | `hsl(0-360,0%-100%,0%-100%)` |
| `toHsla()`  | 返回当前颜色的 HSLa 形式  | `hsla(0-360,0%-100%,0%-100%,0-1)` |
| `toHex()`  | 返回当前颜色的 Hex 形式  | `FF5555` |
| `toHexa()`  | 返回当前颜色的 Hexa 形式  | `FF5555CC` |

<Runnable>

```ts
const blue = new fabric.Color('blue')
console.log(blue.toRgb())
console.log(blue.toRgba())
console.log(blue.toHsl())
console.log(blue.toHsla())
console.log(blue.toHex())
console.log(blue.toHexa())
```

</Runnable>

### 颜色变换方法

| 方法名  | 作用 | 返回值形式 |
|---|---|---|
| `toGrayscale()`  | 将颜色转换为其灰度表示形式  | 返回当前颜色对象供链式调用 |
| `toBlackWhite()`  | 将当前颜色转换为黑白  | 返回当前颜色对象供链式调用 |
| `overlayWith(color)`  | 将传入颜色覆盖到当前颜色上  | 改变当前颜色并返回当前颜色对象供链式调用 |

<Runnable>

```ts
const blue = new fabric.Color('blue')
console.log(blue.toGrayscale().toRgba())
console.log(blue.toBlackWhite().toRgba())
console.log(blue.overlayWith(new fabric.Color('yellow')).toRgba())
console.log(blue.overlayWith('red').toRgba())
```

</Runnable>
