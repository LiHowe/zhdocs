## API

### 属性

| 属性名  | 说明 | 默认值 |
|---|---|---|
| `offsetX`  | 横向偏移  | `0` |
| `offsetY`  | 横向偏移  | `0` |
| `gradientTransform`  | 渐变色变换矩阵  | `null` |
| `gradientUnits`  | 计算单位, 像素(`'pixels'`)或者百分比(`'percentage`')  | `'pixels'` |
| `type`  | 渐变的类型, 线性渐变(`'linear'`)与径向渐变(`'radial'`)  | `'linear'` |
| `coords`  | 渐变的定位(起点,终点,半径)  | `{ x1: 0, y1: 0, x2: 0, y2: 0 }`, 径向渐变还包含 `r1: 0, r2: 0` |
| `colorStops`  | 渐变的色块分布  | `[]` |
| `excludeFromExport`  | 是否在canvas序列化的时候忽略  | `false` |

### 方法

#### `addColorStop(colorStops: Record<string, string>)`

用于追加色块.

####
