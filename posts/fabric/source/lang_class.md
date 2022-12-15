---
title: createClass
source: util/lang_class.ts
---

# {{ $frontmatter.title }}

下面我们来简单的看一下 `createClass` 方法的定义
> 文件位于 `util/lang_class.ts`

```ts
// 我们将Canvas的定义参数带入进行阅读
// 实质上就是组合继承
export function createClass(...args) {
  // 初始化 父类 和 属性
  var parent = null,
    properties = [...args];

  // 如果第一个参数为function 类型, 则将第一个参数视为父类
  if (typeof args[0] === 'function') {
    parent = properties.shift();
  }
  function klass(...klassArgs) {
    this.initialize.call(this, ...klassArgs);
  }

  klass.superclass = parent;

  // 如果有父类, 设置原型
  if (parent) {
    Subclass.prototype = parent.prototype; // 承接父类原型
    klass.prototype = new Subclass(); // 设置自身原型为父实例
  }
  for (var i = 0, length = properties.length; i < length; i++) {
    addMethods(klass, properties[i], parent);
  }
  if (!klass.prototype.initialize) {
    klass.prototype.initialize = noop;
  }
  klass.prototype.constructor = klass;
  klass.prototype.callSuper = callSuper;
  return klass;
}

function Subclass() {}

/**
 * 继承父类方法
 * @param klass 新创建的类
 * @param source 新类原型
 * @param parent  父类
 */
function addMethods(klass, source, parent) {
  for (var property in source) {
    if (
      property in klass.prototype &&
      typeof klass.prototype[property] === 'function' &&
      (source[property] + '').indexOf('callSuper') > -1
    ) {
      klass.prototype[property] = (function (property) {
        return function (...args) {
          var superclass = this.constructor.superclass;
          this.constructor.superclass = parent;
          var returnValue = source[property].call(this, ...args);
          this.constructor.superclass = superclass;

          if (property !== 'initialize') {
            return returnValue;
          }
        };
      })(property);
    } else {
      klass.prototype[property] = source[property];
    }
  }
}

function callSuper(methodName, ...args) {
  var parentMethod = null,
    _this = this;

  // climb prototype chain to find method not equal to callee's method
  while (_this.constructor.superclass) {
    var superClassMethod = _this.constructor.superclass.prototype[methodName];
    if (_this[methodName] !== superClassMethod) {
      parentMethod = superClassMethod;
      break;
    }
    // eslint-disable-next-line
    _this = _this.constructor.superclass.prototype;
  }

  if (!parentMethod) {
    return console.log(
      'tried to callSuper ' +
        methodName +
        ', method not found in prototype chain',
      this
    );
  }

  return parentMethod.call(this, ...args);
}
```
