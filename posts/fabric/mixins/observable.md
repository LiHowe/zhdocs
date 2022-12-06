---
title: Observable
source: observable.mixin.ts
docURL: http://fabricjs.com/docs/fabric.Observable.html
---

# {{ $frontmatter.title }}

用于为继承该类的子类提供**事件管理(事件绑定)**.  
可通过 `fabric.Observable` 调用

## 概览

```typescript
interface Observable {
  // 事件监听mapping
  private __eventListeners: Record<Function[]>
  
  // 监听事件
  on(eventName: string, handler: Function): Function
  on(handlers: EventRegistryObject): Function
  on(arg0: string | EventRegistryObject, handler?: Function): Function

  once(eventName: string, handler: Function): Function
  once(handlers: EventRegistryObject): Function
  once(arg0: string | EventRegistryObject, handler?: Function): Function

  off(eventName: string, handler: Function): void
  off(handlers: EventRegistryObject): void
  off(arg0?: string | EventRegistryObject, handler?: Function)

  fire(eventName: string, options?: object)

  private _removeEventListener(eventName: string, handler?: Function)
}
```

## 方法解释

### on/off

用于事件的绑定与解绑, 提供了两种入参形式

+ 传入事件名称及处理方法

```typescript
const handler = () => {}
on('eventA', handler)
off('eventA', handler)
```

+ 传入一个对象(用于一次绑定多个事件)

```typescript
const evtMap = {
  eventA: () => {},
  eventB: () => {},
  'after:render': () => {}
}
on(evtMap)
off(evtMap)
// 解绑全部
off()
```

### fire

> 🔫 开火 (bushi)

`fire(eventName, options?)`

用于触发指定事件, `options` 为触发事件的入参
