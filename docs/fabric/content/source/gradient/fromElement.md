首先, 我们来回忆一下SVG渐变色的写法

```html
<svg
  viewBox="0 0 10 10"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <!-- 线性渐变 --> 
    <linearGradient id="linearGradient" gradientTransform="rotate(90)">
      <stop offset="5%" stop-color="gold" />
      <stop offset="95%" stop-color="red" />
    </linearGradient>
    <!-- 径向渐变 -->
    <radialGradient id="radialGradient">
      <stop offset="10%" stop-color="gold" />
      <stop offset="95%" stop-color="red" />
    </radialGradient>
  </defs>

  <!-- 使用 linear gradient -->
  <circle cx="5" cy="5" r="4" fill="url('#linearGradient')" />
</svg>
```

`fromElement` 为静态方法, 用于使用SVG的渐变色标签来创建Fabric渐变色对象.

### 总结

1. SVG渐变标签没有指定单位的情况下, 转换为Fabric Gradient对象的默认计算单位为百分比(`percentage`)
2. `instance` 与 `svgOptions` 为非必须, 即, 在不考虑效果的情况下可以直接使用 `fabric.Gradient.fromElement(el)` 来进行标签转换

### 方法定义

```ts
export class Gradient {
  static fromElement(
    el: SVGGradientElement,
    instance: FabricObject,
    svgOptions: SVGOptions
  ): Gradient<GradientType> {
    // 设置Gradient对象的单位, 如果源标签没有该属性, 则默认使用 'percentage'
    const gradientUnits = parseGradientUnits(el);
    // 新建Gradient对象并返回
    return new this({
      id: el.getAttribute('id') || undefined,
      // 根据标签名来判断是linear还是radial
      type: parseType(el),
      // 坐标转换
      coords: parseCoords(el, {
        width: svgOptions.viewBoxWidth || svgOptions.width,
        height: svgOptions.viewBoxHeight || svgOptions.height,
      }),
      // 色块转换
      colorStops: parseColorStops(el, svgOptions.opacity),
      gradientUnits,
      // 变换转换
      gradientTransform: parseTransformAttribute(
        el.getAttribute('gradientTransform') || ''
      ),
      ...(gradientUnits === 'pixels'
        ? {
          offsetX: -instance.left,
          offsetY: -instance.top,
        }
        : {
          offsetX: 0,
          offsetY: 0,
        }),
    });
  }
}
```

### 方法参数

+ `el`: 目标SVG元素
+ `instance`: 将要应用该渐变的Fabric对象, 会影响渐变对象转换的 `offsetX` 与 `offsetY`
+ `svgOptions`: SVG标签的配置, `viewBoxWidth`, `viewBoxHeight`, `width`, `height` 将会影响坐标的计算,
  如果 `svgOptions` 未配置, 则默认线性渐变为从左到右, 径向渐变为从内到外的中心渐变


### 步骤

1. 首先, fabric会先调用 `parseGradientUnits` 来根据传入的元素来决定渐变色对象的计算单位.
2. 将标签的各个属性对应转换为Gradient对象的属性

::: tip 补充说明
SVG [`<linearGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient) 和
[`<radialGradient>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient) 标签的
[`gradientUnits`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/gradientUnits) 属性为渐变色的坐标单位
:::
