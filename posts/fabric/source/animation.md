---
title: 动画 - animation
---

# {{ $frontmatter.title }}

调用动画的方法分为对象方式(`obj.animate`)与工具方式(`fabric.util.animate`), 我们分别看一下它们的实现方式.

## 总结

1. fabric 通过 `requestAnimationFrame` 来触发动画, 如果运行环境不存在 `requestAnimationFrame` 则使用 `setTimeout` 来模拟60帧
2. `fabric.util.animate` 较 `obj.animate` 多提供了 `onStart` 方法, 供动画开始前调用
3. `util.animate` 与 `obj.animate` 均可通过返回值来取消动画
4. `obj.animate` 本质上是解析参数并调用 `util.animate`

## 对象方式调用 - fabricObject.animate

### 定义动画 - animate

源码位置: `src/mixins/object_animation.mixin.ts`

```ts
animate<T>(key: string, toValue: T, options?: TAnimationOptions): void;
animate<T>(animatable: Record<string, T>, options?: TAnimationOptions): void;
animate<T, S extends string | Record<string, T>>(
  arg0: S,
  arg1: S extends string ? T : TAnimationOptions,
  arg2?: S extends string ? TAnimationOptions : never
) {
  // 解析属性值
  const animatable = (
    // 如果提供的是字符串, 则为 animate(key, value, opts) 调用方式, 将 key, value 改写为键值对形式.
    typeof arg0 === 'string' ? { [arg0]: arg1 } : arg0
  ) as Record<string, T>;
  // 获取所有动画属性
  const keys = Object.keys(animatable);
  // 根据不同调用方式获取 options, 键值对的 options 位于入参的第二位(arg1), key-value 字符串方式的 option 位于第三位(arg2)
  const options = (
    typeof arg0 === 'string' ? arg2 : arg1
  ) as TAnimationOptions;
  // 遍历属性调用私有动画方法
  keys.map((key, index) =>
  // 调用私有
    this._animate(
      key, // 属性名
      animatable[key], // 属性的目标值
      // 只有最后一个属性才会调用 onChange 和 onComplete
      index === keys.length - 1
        ? options
        : { ...options, onChange: undefined, onComplete: undefined }
    )
  );
}

// 私有方法
_animate<T>(key: string, to: T, options: TAnimationOptions = {}) {
  const path = key.split('.');
  // 是否是颜色属性
  const propIsColor = this.colorProperties.includes(path[path.length - 1]);
  // 属性当前值
  const currentValue = path.reduce((deep: any, key) => deep[key], this);
  // 将属性目标值转为字符串, 为了解析相对值('+=2')
  to = to.toString();
  // 如果属性不是颜色
  if (!propIsColor) {
    if (~to.indexOf('=')) {
      // 值为相对值, 比如 '+=2', '-=2', 不支持 '*', '/' // [!code hl]
      to = currentValue + parseFloat(to.replace('=', '')); // [!code hl]
    } else {
      // 值为普通值
      to = parseFloat(to);
    }
  }

  // 根据上面解析的值重新定义动画配置, 作为后续调用 util.animate 的入参
  const animationOptions = {
    target: this, // 动画目标位当前对象
    startValue: options.from ?? currentValue, // 动画起始值, 未提供 `from` 则使用对象的当前属性值
    endValue: to,
    byValue: options.by,
    easing: options.easing,
    duration: options.duration,
    abort:
      options.abort &&
      ((value, valueProgress, timeProgress) => {
        return options.abort.call(this, value, valueProgress, timeProgress);
      }),
    onChange: (value, valueProgress, timeProgress) => {
      path.reduce((deep: any, key, index) => {
        if (index === path.length - 1) {
          deep[key] = value;
        }
        return deep[key];
      }, this);
      options.onChange &&
        options.onChange(value, valueProgress, timeProgress);
    },
    onComplete: (value, valueProgress, timeProgress) => {
      // 重设元素角的位置
      this.setCoords();
      options.onComplete &&
        options.onComplete(value, valueProgress, timeProgress);
    },
  };
  // 如果为颜色动画
  if (propIsColor) {
    // 调用单独的颜色动画方法
    return animateColor(
      animationOptions.startValue,
      animationOptions.endValue,
      animationOptions.duration,
      animationOptions
    );
  } else {
    return animate(animationOptions);
  }
}

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

## 工具方式调用 - util.animate

源码位置: `src/util/animate.ts`

### 源码注释

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

  // [取消动画方法] - 开始
  const removeFromRegistry = () => {
    const index = runningAnimations.indexOf(context);
    return index > -1 && runningAnimations.splice(index, 1)[0];
  };

  context.cancel = function () {
    cancel = true;
    return removeFromRegistry();
  };
  // [取消动画方法] - 结束

  // 将当前动画上下文对象放入正在执行动画队列中
  runningAnimations.push(context);

  const runner = function (timestamp) {
    // 动画开始时间戳
    const start = timestamp || +new Date(),
      // 动画预期结束时间
      finish = start + duration,
      // 是否提供了多个起始值(startValue)
      isMany = Array.isArray(startValue),
      // 数值变动步长
      byValue =
        options.byValue ||
        (isMany
          ? startValue.map((value, i) => endValue[i] - value)
          : endValue - startValue);
    // 如果提供了 onStart 方法, 那么在动画开始前调用该方法 
    options.onStart && options.onStart(); // [!code hl]

    // 自执行方法
    (function tick(ticktime) {
      // 触发时间
      const time = ticktime || +new Date();

      // 定义当前时间, 如果触发时间晚于结束时间, 则使用持续时间 duration, 否则使用触发时间 - 开始时间
      const currentTime = time > finish ? duration : time - start,
        // 时间百分比: 当前时间 / 持续时间
        timePerc = currentTime / duration,
        // 当前动画
        current = isMany
          // 如果提供了多个起始值, 分别调用 缓动动画(默认为defaultEasing) 方法求出当前值
          ? startValue.map((_value, i) =>
              easing(currentTime, _value, byValue[i], duration)
            )
          // 单个起始值则直接调用 缓动动画 方法计算当前值
          : easing(currentTime, startValue, byValue, duration),
        // 当前值变化的进度百分比
        valuePerc = isMany
          ? Math.abs((current[0] - startValue[0]) / byValue[0])
          : Math.abs((current - startValue) / byValue);
      // 更新上下文对象的 当前值, 值变化完成率 和 动画时间进度
      context.currentValue = isMany ? current.slice() : current;
      context.completionRate = valuePerc;
      context.durationRate = timePerc;
      // 如果取消了动画, 则中断方法
      if (cancel) {
        return;
      }
      // 如果 abort 方法返回 真值, 则取消动画
      if (abort(current, valuePerc, timePerc)) {
        removeFromRegistry();
        return;
      }

      // 如果触发动画的时间戳 大于 预计完成动画的时间戳, 即动画完成
      if (time > finish) {
        // 更新动画上下文对象
        context.currentValue = isMany ? endValue.slice() : endValue;
        // 设置进度为1
        context.completionRate = 1;
        context.durationRate = 1;
        // 执行回调函数: onChange, onComplete
        onChange(isMany ? endValue.slice() : endValue, 1, 1);
        onComplete(endValue, 1, 1);
        // 移除动画
        removeFromRegistry();
        return;
      } else {
        // 动画仍处于执行过程中, 调用onChange
        onChange(current, valuePerc, timePerc);
        // 调用 rAF 来调用执行动画方法
        requestAnimFrame(tick);
      }
    })(start);
  };

  if (delay > 0) {
    // 如果设置了延迟执行, 使用settimeout
    setTimeout(() => requestAnimFrame(runner), delay);
  } else {
    // 否则直接调用
    requestAnimFrame(runner);
  }

  return context.cancel;
}
```

::: tip 说明
1. [`requestAnimationFrame`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)调用方法默认会传入 `performance.now()` 来调用回调方法
2. util方式调用动画方法比对象调用的方式多提供了动画开始回调函数 `onStart` .
3. `animate` 方法中的 `requestAnimFrame` 为调用 `window.requestAnimationFrame`, 如果环境没有 `requestAnimationFrame` 则使用 `setTimeout` 来模拟 60 帧.
:::

### 步骤概括

1. 初始化取消标识(`cancel`)并使用用户配置初始化动画上下文对象(`context`)
2. 定义取消动画方法 `cancel`
3. 将动画上下文对象(`context`)放入正在运行动画数组(`runningAnimations`)中
4. 定义动画运行方法
5. 执行动画(如果有 `delay` 则使用 `setTimeout` 延迟执行)
6. 返回 `cancel` 方法用于取消动画

### 取消动画 - cancel

该方法会将取消标识置为 `true`, 并将动画上下文对象移出 `runningAnimations`
