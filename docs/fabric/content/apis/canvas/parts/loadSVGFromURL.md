### loadSVGFromURL

`fabric.loadSVGFromURL(url, callback, reviver, options)`

**该方法受限于SOP-同源策略**

该方法接收4个参数:
+ `url`: 待请求的svg文件路径
+ `callback`: 请求完成方法, 包含4个参数
  + `results`: 请求结果
  + `options`: 请求配置
  + `elements`: 元素集合
  + `allElements`: 全部元素
+ `reviver`:
+ `options`:

#### 原理

该方法构建了一个 XMLHttpRequest 的 get 请求, 在请求结束后根据返回值结果进行不同处理

+ 请求**没有**返回值 或者 请求返回值没有 `documentElement`: 有callback就调用callback(null), 并返回`false`结束
+ 调用 `parseSVGDocument` 解析SVG文档
