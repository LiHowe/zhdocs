| <div style="width: 170px">属性名</div> | <div style="width: 170px">类型</div> | <div style="width: 170px">描述</div> | <div style="width: 100px">默认值</div> |
| --- | --- | --- | --- |
| `dirty`           | `boolean`         | 脏（是否需要重新渲染）         | `false`                              |           |
| `__corner`        | `number`,`string` | 鼠标悬浮在元素上的最后一个角   | `0`                                  | 0为没有角 |
| `stateProperties` | `Array<string>`   | 决定对象状态是否变化的属性列表 | 参考官网(太多了)                     |           |
| `cacheProperties` | `Array<string>`   | 需要缓存的属性列表             | 同上...太多了                        |           |
| `colorProperties` | `Array<string>`   | 支持颜色动画的属性             | `fill`,`stroke`,`backgroundColor`    |           |
| `activeOn`        | `down`,`up`       | 对象触发时机                   | `down`, mousedown/touchstart时候激活 |           |
