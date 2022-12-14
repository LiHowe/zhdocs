| <div style="width: 170px">属性名</div> | <div style="width: 170px">类型</div> | <div style="width: 170px">描述</div> | <div style="width: 100px">默认值</div> |
| -------------------------------------- | ------------------------------------ | ------------------------------------ | -------------------------------------- |
| `dirty`                                | `boolean`                            | 脏（是否需要重新渲染）               | `false`                                |           |
| `__corner`                             | `number`,`string`                    | 鼠标悬浮在元素上的最后一个角         | `0`                                    | 0为没有角 |
| `stateProperties`                      | `Array<string>`                      | 决定对象状态是否变化的属性列表       | 参考官网(太多了)                       |           |
| `cacheProperties`                      | `Array<string>`                      | 需要缓存的属性列表                   | 同上...太多了                          |           |
| `colorProperties`                      | `Array<string>`                      | 支持颜色动画的属性                   | `fill`,`stroke`,`backgroundColor`      |           |
| `activeOn`                             | `down`,`up`                          | 对象触发时机                         | `down`, mousedown/touchstart时候激活   |           |
| `excludeFromExport`                    | `boolean`                            | 导出时排除(不导出)                   | `false`                                |           |
| `objectCaching`                        | `boolean`                            | 对象缓存                             | `true`, Node环境为`false`              |           |
| `statefullCache`                       | `boolean`                            | 有状态的缓存                         | `false`                                |           |
| `noScaleCache`                         | `boolean`                            | 缩放不更新缓存                       | `true`                                 |           |
| `paintFirst`                           | `stroke`,`fill`                      | 先绘制边还是先填充                   | `fill`                                 |           |
| `perPixelTargetFind`                   | `boolean`                            | 是否按照像素点查找元素（默认按边界框） | `false`                                |  |
| `includeDefaultValues`                 | `boolean`                            | 对象序列化的时候是否包含默认值         | `true`                                 |  |
