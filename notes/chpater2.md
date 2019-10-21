## 2-1

1. 通过`canvas DOM元素`的`getContext()`可以通过参数获取对应的绘图上下文，如传入`webgl`可获取`webgl 1.0`的绘图上下文。
2. WebGL 是基于`OpenGL ES`的，因此 WebGL 中的函数名可以与 OpenGL ES 中的函数名对应起来，如`getContext('webgl').clearColor()`对应`OpenGL ES2.0或OpenGL中的glclearColor()`。
3. WebGL 遵循传统的 OpenGL 颜色分量的取值范围，即从 0.0 到 1.0。`RGB`的值越高，颜色就越`亮`；第四分量`α`的值越高，颜色就越`不透明`。
4. 一旦指定了背景色之后，背景色就会驻存在 WebGL 系统中，下次调用对应方法（如`clearColor`）前不会改变。
5. 所有 WebGL 相关的方法都有`错误`项，错误不能由函数返回值表示。在默认情况下，错误不会显示出来。
6. WebGL 的`gl.clear()`继承自 OpenGL，基于`多基本缓冲区模型`。
   - 清空绘图区域，实际上是在清空`颜色缓冲区`(color buffer)，传递参数`gl.COLOR_BUFFER_BIT`就是告诉 WebGL 清空颜色缓冲区。
   - 除了颜色缓冲区，还有`深度缓冲区(depth)`、`模板缓冲区(stencil)`等类型的缓冲区。
   - 清空颜色缓冲区将导致 WebGL 清空页面上的`<canvas>`区域。

## 2-2

1. WebGL 依赖于一种称为`着色器`的绘图机制，它提供了灵活且强大的绘制二维或三维图形的方法。但它相比 canvas 的 2d 上下文更复杂，仅仅通过一条简单的绘图命令是不能操作它的。
   - WebGL 需要 2 种着色器：顶点着色器（Vertex shader）和片元着色器（Fragment shader）。
   - 顶点是指二维或三维空间中的一个点（端点或交点）
   - 片元可以理解为像素
2. 着色器程序必须预先处理成单个字符串的形式。
   - 在初始化着色器之前，顶点着色器和片元着色器都是空白的
   - 需要将字符串形式的着色器代码从 JavaScript 传给 WebGL 系统，并建立着色器
   - WebGL 程序包括运行在浏览器中的 JavaScript 和运行在 WebGL 系统中的着色器程序两个部分
3. 大部分 WebGL 程序都遵循以下流程：
   1. 获取`<canvas>`元素
   2. 获取 WebGL 绘图上下文
   3. 初始化着色器
   4. 设置`<canvas>`背景色
   5. 清除`<canvas>`
   6. 绘图
4. WebGL 默认使用`右手坐标系`，WebGL 与`<canvas>`坐标的对应关系：
   - `<canvas>`的中心点：`(0.0, 0.0, 0.0)`。
   - `<canvas>`的上边缘和下边缘：`(0.0, 1.0, 0.0)`和`(0.0, -1.0, 0.0)`。
   - `<canvas>`的左边缘和右边缘：`(-1.0, 0.0, 0.0)`和`(1.0, 0.0, 0.0)`。

## 2-3

1. WebGL 程序中，attribute 被称为`存储限定符(storage qualifier)`。
   - 它表示接下来的变量是一个 attribute 变量。
   - attribute 变量必须声明成全局变量，数据从着色器外部传给该变量。
   - 可以通过`gl.getAttribLocation()`从程序对象(program object)中读取 attribute 变量（的引用）。
   - 可以通过`gl.vertexAttrib1f`等同族函数设置WebGL程序中的attribute变量的值。
