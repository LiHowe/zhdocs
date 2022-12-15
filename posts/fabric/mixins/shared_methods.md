---
title: 公共方法 | CommonMethods
source: shared_methods.mixin.ts
extends: Observable
---

# {{ $frontmatter.title }}

定义了各个类的公共方法, 主要用于设置对象属性

## 概览

```ts
// Observable 为事件处理器
export class CommonMethods extends Observable {
  _setOptions(options: any): void
  _setObject(obj: Record<string, any>): void
  _set(key: string, value: any): void
  set(key: string | Record<string, any>, value?: any): this
  toggle(property: string): this
  get(property: string): any
}

```

## 方法解释

```ts
// A已经继承了CommonMethods
const a = new A()
// a._set('name', 'lihowe')
a.set('name', 'lihowe')
// { name: 'lihowe' }

// a._setObject({
//   name: 'howeli',
//   handsome: false,
// })
a.set({
  name: 'howeli',
  handsome: false,
})
// {
//   name: 'howeli',
//   handsome: false,
// }

a.get('name')
// howeli

a.toggle('handsome')
// {
//   name: 'howeli',
//   handsome: true,
// }

```

<script lang="ts" setup>
import { fabric } from 'fabric'

// class A extends fabric.CommonMethods {
//   constructor() {}
// }

// const a = new A()

// a.set('name', 'lihowe')
console.log(fabric.CommonMethods)
</script>

### set / get

分别为对象的赋值与取值方法, 其中 `set` 方法为 `_setObject` 与 `_set` 的整合方法, 支持对
单一属性赋值, 也可对多个属性利用键值对进行同时赋值

+ `set(obj: Record<string, any>)`, 相当于 `_setObject(obj: Record<string, any>)`
+ `set(key: string, value: any)`, 相当于 `_set(key: string, value: any)`


### toggle

开关方法, 用于将指定键的布尔类型值进行颠倒(true -> false, false -> true).

对应属性值必须为boolean类型

```ts {3-5}
toggle(property: string) {
  const value = this.get(property);
  if (typeof value === 'boolean') {
    this.set(property, !value);
  }
  return this;
}
```
