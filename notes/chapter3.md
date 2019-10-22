## 3-1

1. 缓冲区是 WebGL 系统中的一块存储区，可以向缓冲区对象中保存想要绘制的所有顶点的数据
2. 使用缓冲区对象向顶点着色器传入多个顶点的数据，需要遵循以下五个步骤：
   - 创建缓冲区对象——`gl.createBuffer()`
   - 绑定缓冲区对象——`gl.bindBuffer()`
   - 将数据写入缓冲区对象——`gl.bufferData()`
   - 将缓冲区对象分配给一个 attribute 变量——`gl.vertexAttribPointer()`
   - 开启 attribute 变量——`gl.enableVertexAttribArray()`
3. 处理其他对象，如纹理对象和帧缓冲区对象时的步骤也比较类似
4. 不能直接向缓冲区写入数据，而只能向目标写入数据，所以要向缓冲区写数据，必须先绑定
5. 因为 JavaScript 中通用的数组 Array 是一种通用类型，并没有对`大量元素都是同一种类型`这种情况进行优化。
   - 为了解决这个问题，WebGL 引入了类型化数组，如`Float32Array`通常用来存储顶点的坐标或颜色数据。
   - WebGL 中的很多操作都要用到类型化数组
   - 与普通的 Array 数组相比，类型化数组不支持`push()`和`pop()`方法
6. 可以使用`gl.vertexAttribPointer()`方法将整个缓冲区对象分配给 attribute 变量
