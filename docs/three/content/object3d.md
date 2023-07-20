# 3D 物体 <Badge type="tip" text="核心" />

在一个场景中, 各种物体均可以称为3D物体, Three.js 使用 Object3D 类来描述这些三维空间中的物体.

Object3D 是 Three.js 中大部分物体的基类, 比如相机, 灯光等, Three.js 提供了一系列的属性和方法来对三维空间中的物体进行操纵.

下面列出了部分属性及方法

::: tip 提示

了解下都有什么即可, 具体使用的过程中再来查

:::

## 属性

| 属性               | 类型         | 说明                                     |
|------------------|------------|----------------------------------------|
| id               | String     | 只读值,用于与这个对象绑定的字符串型ID。默认为空字符串。          |
| uuid             | String     | 对象的uuid。默认值为一个随机生成的UUID。在对象的整个生命周期中不变。 |
| name             | String     | 对象的可选名称,默认为空字符串。                       |  
| type             | String     | 只读字符串,表示该对象的类名称。默认为'Object3D'。         |
| parent           | Object3D   | 对象的父对象。用于建立对象之间的关系。在添加对象到场景时会自动设置。     |
| children         | Array      | 该对象的子对象数组。可以向数组中添加对象来使其成为子对象。          |
| up               | Vector3    | 定义向上方向的向量。默认为(0,1,0)。                  |
| position         | Vector3    | 对象的局部空间中的位置向量。默认为(0,0,0)。              |
| rotation         | Euler      | 对象的局部空间中的旋转。默认为(0,0,0)。                |   
| quaternion       | Quaternion | 对象的局部空间中的旋转,以四元数的形式表示。                 |
| scale            | Vector3    | 对象的局部空间中的缩放值。默认为(1,1,1)。               |  
| matrix           | Matrix4    | 对象的局部空间中的矩阵。                           |
| matrixAutoUpdate | Boolean    | 是否自动更新对象的矩阵。默认为true。                   |
| matrixWorld      | Matrix4    | 对象的世界空间中的矩阵。                           |
| matrixAutoUpdate | Boolean    | 是否自动更新对象的世界矩阵。默认为true。                 |  
| layers           | Layers     | 对象所属的层。默认为Layers.Default。              | 
| visible          | Boolean    | 是否可见。默认为true。                          |
| castShadow       | Boolean    | 是否投射阴影。默认为false。                       |
| receiveShadow    | Boolean    | 是否接受阴影。默认为false。                       |
| frustumCulled    | Boolean    | 是否开启镜头截锥剔除。默认为true。                    |  
| renderOrder      | Number     | 渲染顺序。默认为0。                             |
| userData         | Object     | 自定义数据对象,用于存储用户自定义数据。                   |


## 方法

| 方法                    | 说明                             |
|-----------------------|--------------------------------|
| onBeforeRender()      | 被WebGLRenderer渲染前的回调函数。        |  
| onAfterRender()       | 被WebGLRenderer渲染后的回调函数。        |
| applyMatrix4()        | 使用矩阵转换对象的位置、旋转和缩放。             |
| translateOnAxis()     | 沿着轴平移对象的位置。                    |  
| rotateOnAxis()        | 在轴上旋转对象。                       | 
| rotateX()             | 在X轴上旋转对象。                      |
| rotateY()             | 在Y轴上旋转对象。                      |   
| rotateZ()             | 在Z轴上旋转对象。                      |
| translateX()          | 沿X轴平移对象。                       |   
| translateY()          | 沿Y轴平移对象。                       |
| translateZ()          | 沿Z轴平移对象。                       |  
| localToWorld()        | 把一个向量从局部空间转换到世界空间。             |
| worldToLocal()        | 把一个向量从世界空间转换到局部空间。             |
| lookAt()              | 让对象朝向一个位置。                     |  
| add()                 | 添加子对象。                         |
| remove()              | 移除子对象。                         |
| clear()               | 移除所有子对象。                       |
| attach()              | 添加一个对象作为子对象,而不影响对象的推断层级关系。     |  
| getObjectById()       | 通过id属性查找子孙对象。                  |
| getObjectByName()     | 通过name属性查找子孙对象。                |
| getObjectByProperty() | 通过属性查找子孙对象。                    |
| getWorldPosition()    | 获取对象在世界空间中的位置。                 |  
| getWorldQuaternion()  | 获取对象在世界空间中的旋转(四元数)。            |
| getWorldScale()       | 获取对象在世界空间中的缩放值。                |
| getWorldDirection()   | 获取对象在世界空间中的方向向量。               |    
| raycast()             | 在对象上执行射线检测。                    |
| traverse()            | 使用递归遍历对象及其子对象。                 |  
| traverseVisible()     | 仅遍历可见的对象及其子对象。                 |
| traverseAncestors()   | 遍历对象的祖先对象。                     |
| updateMatrix()        | 更新本地变换矩阵。                      |
| updateMatrixWorld()   | 更新全局变换矩阵。                      |  
| updateWorldMatrix()   | 更新Object3D的世界变换矩阵及其所有父对象的变换矩阵。 | 
| clone()               | 克隆一个Object3D对象。                |
| copy()                | 复制一个Object3D对象的属性到另一个对象。       |
| toJSON()              | 为JSON序列化创建一个对象表示。              |
