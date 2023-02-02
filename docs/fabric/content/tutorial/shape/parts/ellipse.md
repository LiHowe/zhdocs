## 椭圆 - Ellipse
<br/>

### 使用

<Image src="https://s2.loli.net/2022/11/30/DA5dI1hrQ3EvxVG.png" title="椭圆" />

```ts
// 无需设置宽高
const ellipse = new fabric.Ellipse({
  rx: 100,
  ry: 50,
})
console.log(ellipse.width) // -> 200
console.log(ellipse.height) // -> 100
```

### 图形属性及方法

| 属性  | 描述       | 默认值 |
|-----|----------|-----|
| rx  | 水平方向边框圆角 | `0` |
| ry  | 垂直方向边框圆角 | `0` |

与 矩形Rect 不同的是: `rx` 与 `ry` 必须全部设置.

:::danger 注意

椭圆的大小是通过 `rx`, `ry` 共同控制的, 设置 `width` 与 `height` 不会对椭圆造成影响.  
因为椭圆的宽高根据 `rx`, `ry` 自动计算:
+ `width = 2 * rx`
+ `height = 2 * ry`


:::

### 源码解析

源码解析请前往 [源码解析/椭圆](/source/ellipse/) 进行查看.
