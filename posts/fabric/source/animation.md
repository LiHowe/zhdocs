---
title: 动画 - animation
---

# {{ $frontmatter.title }}

因为调用动画的方法分为对象(`obj.animate`)与工具类(`fabric.util.animate`), 我们分别看一下它们的实现方式.

## 对象 - fabricObject

### 定义动画 - animate

源码位置: `src/mixins/object_animation.mixin.ts`

```ts
animate<T>(key: string, toValue: T, options?: TAnimationOptions): void;
animate<T>(animatable: Record<string, T>, options?: TAnimationOptions): void;
```

### 取消动画 - dispose

`obj.dispose()` 方法用来取消对象的全部动画, 本质上是调用了 `util.cancelByTarget` 方法来实现.

```ts
dispose() {
  // runningAnimations is always truthy
  if (runningAnimations) {
    runningAnimations.cancelByTarget(this);
  }
}
```

## 工具类 - util

源码位置: `src/util/animate.ts`

::: details 源码

```ts
export function animate(options = {}) {
  let cancel = false;
  // 获取用户动画配置, 未指定属性使用默认值
  // 即, 动画默认持续时间 500ms, 数值从0 变化到 100, 无延迟
  const {
    startValue = 0,
    duration = 500,
    easing = defaultEasing,
    onChange = noop,
    abort = noop,
    onComplete = noop,
    endValue = 100,
    delay = 0,
  } = options;

  const context = {
    ...options,
    currentValue: startValue,
    completionRate: 0,
    durationRate: 0,
  };

  const removeFromRegistry = () => {
    const index = runningAnimations.indexOf(context);
    return index > -1 && runningAnimations.splice(index, 1)[0];
  };

  context.cancel = function () {
    cancel = true;
    return removeFromRegistry();
  };
  runningAnimations.push(context);

  const runner = function (timestamp) {
    const start = timestamp || +new Date(),
      finish = start + duration,
      isMany = Array.isArray(startValue),
      byValue =
        options.byValue ||
        (isMany
          ? startValue.map((value, i) => endValue[i] - value)
          : endValue - startValue);

    options.onStart && options.onStart();

    (function tick(ticktime) {
      const time = ticktime || +new Date();
      const currentTime = time > finish ? duration : time - start,
        timePerc = currentTime / duration,
        current = isMany
          ? startValue.map((_value, i) =>
              easing(currentTime, _value, byValue[i], duration)
            )
          : easing(currentTime, startValue, byValue, duration),
        valuePerc = isMany
          ? Math.abs((current[0] - startValue[0]) / byValue[0])
          : Math.abs((current - startValue) / byValue);
      //  update context
      context.currentValue = isMany ? current.slice() : current;
      context.completionRate = valuePerc;
      context.durationRate = timePerc;

      if (cancel) {
        return;
      }
      if (abort(current, valuePerc, timePerc)) {
        removeFromRegistry();
        return;
      }
      if (time > finish) {
        //  update context
        context.currentValue = isMany ? endValue.slice() : endValue;
        context.completionRate = 1;
        context.durationRate = 1;
        //  execute callbacks
        onChange(isMany ? endValue.slice() : endValue, 1, 1);
        onComplete(endValue, 1, 1);
        removeFromRegistry();
        return;
      } else {
        onChange(current, valuePerc, timePerc);
        requestAnimFrame(tick);
      }
    })(start);
  };

  if (delay > 0) {
    setTimeout(() => requestAnimFrame(runner), delay);
  } else {
    requestAnimFrame(runner);
  }

  return context.cancel;
}
```

:::

1. 初始化取消标识(`cancel`)并使用用户配置初始化动画上下文对象(`context`)
2. 定义取消动画方法 `cancel`
3. 将动画上下文对象(`context`)放入正在运行动画数组(`runningAnimations`)中

### 取消动画方法 - cancel

该方法会将取消标识置为 `true`, 并将动画上下文对象移出 `runningAnimations`
