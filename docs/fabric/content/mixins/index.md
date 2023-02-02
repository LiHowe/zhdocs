---
title: 混入 | mixin
---

# 混入

`fabric` 共定义了23个混入方法/对象

```text
.
├── animation.mixin.ts
├── canvas_dataurl_exporter.mixin.ts
├── canvas_events.mixin.ts
├── canvas_gestures.mixin.ts
├── canvas_grouping.mixin.ts
├── canvas_serialization.mixin.ts
├── collection.mixin.ts
├── eraser_brush.mixin.ts
├── itext.svg_export.ts
├── itext_behavior.mixin.ts
├── itext_click_behavior.mixin.ts
├── itext_key_behavior.mixin.ts
├── object.svg_export.ts
├── object_ancestry.mixin.ts
├── object_geometry.mixin.ts
├── object_interactivity.mixin.ts
├── object_origin.mixin.ts
├── object_stacking.mixin.ts
├── object_straightening.mixin.ts
├── observable.mixin.ts
├── shared_methods.mixin.ts
├── stateful.mixin.ts
└── text_style.mixin.ts
```

> 为了方便阅读, 下面文章中将源码中的类实现(`class`)改为了接口(`interface`)写法  
> 具体的类实现细节如未提到请查看对应源码

+ [集合 | Collection](./collection.md)
+ [事件观测 | Observable](./observable.md)
+ [公共方法 | CommonMethods](./shared_methods.md)
+ 
