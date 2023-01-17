Gradient的构造函数并未做过多的处理, 只是对各个属性进行初始化赋值.

我们直接来看下源码

```ts
export class Gradient {
  constructor({
                type = 'linear' as T,
                gradientUnits = 'pixels',
                coords,
                colorStops = [],
                offsetX = 0,
                offsetY = 0,
                gradientTransform,
                id,
              }: GradientOptions<T>) {
    this.id = id ? `${id}_${uid()}` : uid();
    this.type = type;
    this.gradientUnits = gradientUnits;
    this.gradientTransform = gradientTransform || null;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    // 根据不同的渐变类型使用不同的默认坐标, radial 较 linear 多了 r1, r2 属性
    this.coords = {
      ...(this.type === 'radial' ? radialDefaultCoords : linearDefaultCoords),
      ...coords,
    } as GradientCoords<T>;
    // 复制一份数组
    this.colorStops = colorStops.slice();
  }
}
```
